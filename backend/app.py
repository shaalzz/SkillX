from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from .ml import recommend_peer, recommend_videos
from .db import (
    init_db, create_user, get_user_by_username_or_email,
    create_profile, get_profile, add_user_skill, list_user_skills,
    create_video, list_videos, get_video, add_transaction, get_balance,
    list_transactions, add_feedback, get_pending_videos, approve_video,
    create_course, list_courses, get_course, add_course_access, get_user_credit_balance, deduct_credits
)
from werkzeug.security import generate_password_hash, check_password_hash
import os

# Frontend static directory
# Serve from the 'dist' folder which contains React build
static_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Frontend', 'dist'))

app = Flask(__name__, static_folder=static_dir, static_url_path='')
CORS(app)

# Ensure DB exists (call at import time instead of using before_first_request for
# compatibility with Flask versions that may not expose that decorator)
init_db()


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def home(path):
    if path.startswith('api/') or path.startswith('courses/'):
        return "Not Found", 404
    
    if path != "" and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
        
    if os.path.exists(os.path.join(static_dir, 'index.html')):
        return send_from_directory(static_dir, 'index.html')
    return "React build not found", 404


@app.route('/courses/<path:filename>')
def serve_course_video(filename):
    courses_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'courses'))
    return send_from_directory(courses_dir, filename)


@app.route('/recommend')
def recommend():
    # backward compatible simple endpoint
    return jsonify(recommend_peer())


@app.route('/api/recommend_videos')
def recommend_videos_route():
    user_id = request.args.get('user_id')
    skill = request.args.get('skill')
    try:
        uid = int(user_id) if user_id else None
    except Exception:
        uid = None
    vids = recommend_videos(user_id=uid, skill=skill)
    return jsonify({'videos': vids})


@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    fullname = data.get('fullname', '').strip()

    if not username or not email or not password or not fullname:
        return jsonify({'success': False, 'error': 'username, email, password and fullname required'}), 400

    # Basic validation
    if len(password) < 6:
        return jsonify({'success': False, 'error': 'password must be at least 6 characters'}), 400

    existing = get_user_by_username_or_email(username) or get_user_by_username_or_email(email)
    if existing:
        return jsonify({'success': False, 'error': 'username or email already exists'}), 409

    password_hash = generate_password_hash(password)
    user_id = create_user(username, email, password_hash)
    if not user_id:
        return jsonify({'success': False, 'error': 'could not create user'}), 500

    # Automatically create profile with fullname and 50 initial credits
    create_profile(user_id, fullname, '', '', '', '', '', '')

    return jsonify({'success': True, 'user_id': user_id})


@app.route('/api/login', methods=['POST'])
def login_api():
    data = request.get_json() or {}
    identifier = data.get('identifier', '').strip()
    password = data.get('password', '')

    if not identifier or not password:
        return jsonify({'success': False, 'error': 'identifier and password required'}), 400

    user = get_user_by_username_or_email(identifier)
    if not user:
        return jsonify({'success': False, 'error': 'invalid credentials'}), 401

    if not check_password_hash(user['password'], password):
        return jsonify({'success': False, 'error': 'invalid credentials'}), 401

    # Check whether profile exists
    profile = get_profile(user['id'])
    has_profile = bool(profile)
    credits = get_user_credit_balance(user['id']) if has_profile else 0

    # In a real app you'd return a session token / JWT. We'll return minimal user info and profile flag.
    return jsonify({'success': True, 'user': {'id': user['id'], 'username': user['username'], 'email': user['email']}, 'has_profile': has_profile, 'credits': credits})


@app.route('/api/onboarding/complete', methods=['POST'])
def complete_onboarding():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    user_category = data.get('user_category', '').strip()
    college = data.get('college', '').strip()
    department = data.get('department', '').strip()
    year = data.get('year', '').strip()
    profession = data.get('profession', '').strip()
    # skills may be submitted as a list or a comma/string; normalize to comma-separated string
    skills_have = data.get('skills_have', '')
    skills_learn = data.get('skills_learn', '')
    if isinstance(skills_have, list):
        skills_have = ','.join([str(s).strip() for s in skills_have])
    else:
        skills_have = str(skills_have or '').strip()
    if isinstance(skills_learn, list):
        skills_learn = ','.join([str(s).strip() for s in skills_learn])
    else:
        skills_learn = str(skills_learn or '').strip()

    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400

    try:
        # Get existing profile to preserve full_name
        profile = get_profile(user_id)
        full_name = profile.get('full_name', '') if profile else ''
        
        # Update profile with onboarding data
        create_profile(
            user_id,
            full_name,
            profile.get('phone', '') if profile else '',
            college,
            department,
            year,
            user_category,
            profession,
            profile.get('gender', '') if profile else '',
            profile.get('date_of_birth', '') if profile else '',
            skills_have,
            skills_learn,
            1  # onboarding_complete
        )
        
        return jsonify({'success': True})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/profile', methods=['POST'])
def create_profile_api():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    full_name = data.get('full_name','').strip()
    phone = data.get('phone','').strip()
    college = data.get('college','').strip()
    year = data.get('year','').strip()
    user_category = data.get('user_category','').strip()
    gender = data.get('gender','').strip()
    date_of_birth = data.get('date_of_birth','').strip()
    if not user_id or not full_name:
        return jsonify({'success': False, 'error': 'user_id and full_name required'}), 400
    create_profile(user_id, full_name, phone, college, year, user_category, gender, date_of_birth)
    return jsonify({'success': True, 'credits': 50, 'gender': gender})


@app.route('/api/profile', methods=['GET'])
def get_profile_api():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    p = get_profile(int(user_id))
    return jsonify({'profile': p})


@app.route('/api/skills', methods=['POST'])
def add_skill_api():
    data = request.get_json() or {}
    user_id = data.get('user_id')
    skill = data.get('skill')
    type = data.get('type')
    if not user_id or not skill or type not in ('teach','learn'):
        return jsonify({'success': False, 'error': 'user_id, skill and valid type required'}), 400
    add_user_skill(int(user_id), skill, type)
    return jsonify({'success': True})


@app.route('/api/skills', methods=['GET'])
def list_skills_api():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    skills = list_user_skills(int(user_id))
    return jsonify({'skills': skills})


@app.route('/api/videos', methods=['POST'])
def upload_video_api():
    data = request.get_json() or {}
    title = data.get('title')
    description = data.get('description','')
    skills = data.get('skills','')
    url = data.get('url','')
    is_premium = 1 if data.get('is_premium') else 0
    cost = int(data.get('cost') or 0)
    uploader_id = data.get('uploader_id')
    if not title or not uploader_id:
        return jsonify({'success': False, 'error': 'title and uploader_id required'}), 400
    vid = create_video(title, description, skills, url, is_premium, cost, int(uploader_id))
    return jsonify({'success': True, 'video_id': vid})


@app.route('/api/videos', methods=['GET'])
def list_videos_api():
    skill = request.args.get('skill')
    vids = list_videos(skill=skill, approved_only=True)
    return jsonify({'videos': vids})


@app.route('/api/video/<int:video_id>/watch', methods=['POST'])
def watch_video_api(video_id):
    data = request.get_json() or {}
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    v = get_video(video_id)
    if not v or not v.get('approved'):
        return jsonify({'success': False, 'error': 'video not available'}), 404
    # if premium, charge credits
    if v.get('is_premium'):
        cost = int(v.get('cost') or 0)
        if not deduct_credits(int(user_id), cost, f'Watch video {video_id}'):
            balance = get_user_credit_balance(int(user_id))
            return jsonify({'success': False, 'error': 'insufficient credits', 'balance': balance}), 402
    # increment popularity
    # lightweight update
    try:
        conn = None
        from .db import connect_db
        conn = connect_db()
        cur = conn.cursor()
        cur.execute('UPDATE videos SET popularity = COALESCE(popularity,0) + 1 WHERE id = ?', (video_id,))
        conn.commit()
    finally:
        if conn:
            conn.close()
    return jsonify({'success': True, 'url': v.get('url')})


@app.route('/api/credits', methods=['GET'])
def credits_api():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    bal = get_balance(int(user_id))
    tx = list_transactions(int(user_id))
    return jsonify({'balance': bal, 'transactions': tx})


@app.route('/api/feedback', methods=['POST'])
def feedback_api():
    data = request.get_json() or {}
    video_id = int(data.get('video_id',0))
    user_id = int(data.get('user_id',0))
    rating = int(data.get('rating',0))
    comment = data.get('comment','')
    if not video_id or not user_id or rating <= 0:
        return jsonify({'success': False, 'error': 'video_id, user_id and rating required'}), 400
    fid = add_feedback(video_id, user_id, rating, comment)
    return jsonify({'success': True, 'feedback_id': fid})


@app.route('/api/admin/videos/pending', methods=['GET'])
def admin_pending_videos():
    pending = get_pending_videos()
    return jsonify({'videos': pending})


@app.route('/api/admin/videos/approve', methods=['POST'])
def admin_approve_video():
    data = request.get_json() or {}
    video_id = int(data.get('video_id',0))
    if not video_id:
        return jsonify({'success': False, 'error': 'video_id required'}), 400
    approve_video(video_id)
    return jsonify({'success': True})


@app.route('/api/courses', methods=['GET'])
def list_courses_api():
    skill = request.args.get('skill')
    type = request.args.get('type')  # FREE or CREDIT
    courses = list_courses(skill=skill, type=type)
    return jsonify({'courses': courses})


@app.route('/api/courses', methods=['POST'])
def create_course_api():
    data = request.get_json() or {}
    name = data.get('name')
    skill_category = data.get('skill_category','')
    type = data.get('type','FREE')
    credit_cost = int(data.get('credit_cost') or 0)
    level = data.get('level')
    description = data.get('description','')
    url = data.get('url','')
    if not name:
        return jsonify({'success': False, 'error': 'name required'}), 400
    cid = create_course(name, skill_category, type, credit_cost, level, description, url)
    return jsonify({'success': True, 'course_id': cid})


@app.route('/api/credit-balance', methods=['GET'])
def credit_balance_api():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    balance = get_user_credit_balance(int(user_id))
    return jsonify({'balance': balance})


@app.route('/api/course/<int:course_id>/access', methods=['POST'])
def access_course_api(course_id):
    data = request.get_json() or {}
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'success': False, 'error': 'user_id required'}), 400
    
    course = get_course(course_id)
    if not course:
        return jsonify({'success': False, 'error': 'course not found'}), 404
    
    # if CREDIT type, check and deduct credits
    if course.get('type') == 'CREDIT':
        cost = int(course.get('credit_cost') or 0)
        balance = get_user_credit_balance(int(user_id))
        if balance < cost:
            return jsonify({'success': False, 'error': 'insufficient credits', 'balance': balance}), 402
        if not deduct_credits(int(user_id), cost, f'Access course {course_id}'):
            return jsonify({'success': False, 'error': 'credit deduction failed'}), 500
    
    # record access
    add_course_access(int(user_id), course_id, int(course.get('credit_cost') or 0) if course.get('type') == 'CREDIT' else 0)
    
    return jsonify({'success': True, 'url': course.get('url'), 'message': f"Course unlocked. {int(course.get('credit_cost') or 0)} credits spent."})


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """Chatbot endpoint for handling user questions."""
    try:
        data = request.get_json()
        message = (data or {}).get('message', '').strip()
        
        if not message:
            return jsonify({'reply': 'Please ask me something!'}), 400
        
        # Safety check (simple keyword filtering)
        unsafe_words = {'hate', 'kill', 'bomb', 'violence', 'sex', 'porn', 'drug', 'abuse'}
        message_lower = message.lower()
        if any(word in message_lower for word in unsafe_words):
            return jsonify({'reply': "I'm here to help with learning and platform-related questions. Let's keep the conversation respectful 😊"}), 200
        
        # Default fallback response
        reply = "I'm still learning. Please try asking in a different way. 🤔"
        
        # Return default reply (frontend will handle FAQ matching first)
        return jsonify({'reply': reply}), 200
    
    except Exception as e:
        return jsonify({'error': str(e), 'reply': 'An error occurred. Please try again.'}), 500





if __name__ == '__main__':
    # bind to all interfaces to avoid local loopback issues and show startup info
    print(f"Starting SkillX Flask app (pid={os.getpid()})")
    app.run(host='0.0.0.0', port=5000, debug=False, use_reloader=False)
