import sqlite3
from typing import Optional, Dict, List
import datetime


def connect_db():
    conn = sqlite3.connect("skillx.db")
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = connect_db()
    cur = conn.cursor()
    # users
    cur.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    ''')

    # profiles (one-to-one with users) - expanded with category, skills, gender, DOB, education/profession
    cur.execute('''
        CREATE TABLE IF NOT EXISTS profiles (
            user_id INTEGER PRIMARY KEY,
            full_name TEXT,
            phone TEXT,
            college TEXT,
            department TEXT,
            year TEXT,
            user_category TEXT,
            profession TEXT,
            gender TEXT,
            date_of_birth TEXT,
            skills_have TEXT,
            skills_learn TEXT,
            onboarding_complete INTEGER DEFAULT 0,
            credit_balance INTEGER DEFAULT 50,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')

    # skills and user_skills (teach/learn)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    ''')
    cur.execute('''
        CREATE TABLE IF NOT EXISTS user_skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            skill_id INTEGER NOT NULL,
            type TEXT NOT NULL CHECK(type IN ('teach','learn')),
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(skill_id) REFERENCES skills(id)
        )
    ''')

    # videos
    cur.execute('''
        CREATE TABLE IF NOT EXISTS videos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            skills TEXT,
            url TEXT,
            is_premium INTEGER DEFAULT 0,
            cost INTEGER DEFAULT 0,
            approved INTEGER DEFAULT 0,
            uploader_id INTEGER,
            popularity INTEGER DEFAULT 0,
            avg_rating REAL DEFAULT 0,
            created_at TEXT,
            FOREIGN KEY(uploader_id) REFERENCES users(id)
        )
    ''')

    # transactions (credits)
    cur.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount INTEGER NOT NULL,
            reason TEXT,
            created_at TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')

    # feedback
    cur.execute('''
        CREATE TABLE IF NOT EXISTS feedback (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            video_id INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            rating INTEGER NOT NULL,
            comment TEXT,
            created_at TEXT,
            FOREIGN KEY(video_id) REFERENCES videos(id),
            FOREIGN KEY(user_id) REFERENCES users(id)
        )
    ''')

    # courses
    cur.execute('''
        CREATE TABLE IF NOT EXISTS courses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            skill_category TEXT,
            type TEXT NOT NULL CHECK(type IN ('FREE','CREDIT')),
            credit_cost INTEGER DEFAULT 0,
            level TEXT,
            description TEXT,
            url TEXT,
            created_at TEXT
        )
    ''')

    # user_course_history
    cur.execute('''
        CREATE TABLE IF NOT EXISTS user_course_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            course_id INTEGER NOT NULL,
            credits_spent INTEGER DEFAULT 0,
            completion_status TEXT DEFAULT 'in_progress',
            accessed_at TEXT,
            FOREIGN KEY(user_id) REFERENCES users(id),
            FOREIGN KEY(course_id) REFERENCES courses(id)
        )
    ''')

    conn.commit()
    conn.close()


def create_user(username: str, email: str, password_hash: str) -> Optional[int]:
    conn = connect_db()
    cur = conn.cursor()
    try:
        cur.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                    (username, email, password_hash))
        conn.commit()
        user_id = cur.lastrowid
    except sqlite3.IntegrityError:
        user_id = None
    finally:
        conn.close()
    return user_id


def get_user_by_username_or_email(identifier: str) -> Optional[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM users WHERE username = ? OR email = ?', (identifier, identifier))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


# Profiles
def create_profile(user_id: int, full_name: str, phone: str = '', college: str = '', department: str = '', year: str = '', user_category: str = '', profession: str = '', gender: str = '', date_of_birth: str = '', skills_have: str = '', skills_learn: str = '', onboarding_complete: int = 0, initial_credits: int = 50) -> bool:
    conn = connect_db()
    cur = conn.cursor()
    try:
        cur.execute('INSERT OR REPLACE INTO profiles (user_id, full_name, phone, college, department, year, user_category, profession, gender, date_of_birth, skills_have, skills_learn, onboarding_complete, credit_balance) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                    (user_id, full_name, phone, college, department, year, user_category, profession, gender, date_of_birth, skills_have, skills_learn, onboarding_complete, initial_credits))
        conn.commit()
        # Also add an initial transaction record if this is a new profile
        cur.execute('SELECT COUNT(*) as count FROM transactions WHERE user_id = ? AND reason = ?', (user_id, 'Initial signup bonus'))
        if cur.fetchone()['count'] == 0:
            now = datetime.datetime.utcnow().isoformat()
            cur.execute('INSERT INTO transactions (user_id, amount, reason, created_at) VALUES (?,?,?,?)', (user_id, initial_credits, 'Initial signup bonus', now))
            conn.commit()
        return True
    finally:
        conn.close()


def get_profile(user_id: int) -> Optional[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM profiles WHERE user_id = ?', (user_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


# Skills
def get_or_create_skill(name: str) -> int:
    name = name.strip()
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT id FROM skills WHERE name = ?', (name,))
    row = cur.fetchone()
    if row:
        skill_id = row['id']
    else:
        cur.execute('INSERT INTO skills (name) VALUES (?)', (name,))
        conn.commit()
        skill_id = cur.lastrowid
    conn.close()
    return skill_id


def add_user_skill(user_id: int, skill_name: str, type: str) -> bool:
    skill_id = get_or_create_skill(skill_name)
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('INSERT INTO user_skills (user_id, skill_id, type) VALUES (?,?,?)', (user_id, skill_id, type))
    conn.commit()
    conn.close()
    return True


def list_user_skills(user_id: int) -> List[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('''SELECT s.name, us.type FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = ?''', (user_id,))
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


# Videos
def create_video(title: str, description: str, skills: str, url: str, is_premium: int, cost: int, uploader_id: int) -> int:
    conn = connect_db()
    cur = conn.cursor()
    now = datetime.datetime.utcnow().isoformat()
    cur.execute('''INSERT INTO videos (title, description, skills, url, is_premium, cost, approved, uploader_id, created_at)
                   VALUES (?,?,?,?,?,?,?,?,?)''', (title, description, skills, url, is_premium, cost, 0, uploader_id, now))
    conn.commit()
    vid = cur.lastrowid
    conn.close()
    return vid


def approve_video(video_id: int) -> bool:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('UPDATE videos SET approved = 1 WHERE id = ?', (video_id,))
    conn.commit()
    conn.close()
    return True


def list_videos(skill: Optional[str] = None, approved_only: bool = True) -> List[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    q = 'SELECT * FROM videos'
    params = []
    clauses = []
    if approved_only:
        clauses.append('approved = 1')
    if skill:
        clauses.append('skills LIKE ?')
        params.append(f'%{skill}%')
    if clauses:
        q += ' WHERE ' + ' AND '.join(clauses)
    q += ' ORDER BY popularity DESC, avg_rating DESC'
    cur.execute(q, params)
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_video(video_id: int) -> Optional[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM videos WHERE id = ?', (video_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


# Transactions / Credits
def add_transaction(user_id: int, amount: int, reason: str) -> int:
    conn = connect_db()
    cur = conn.cursor()
    now = datetime.datetime.utcnow().isoformat()
    cur.execute('INSERT INTO transactions (user_id, amount, reason, created_at) VALUES (?,?,?,?)', (user_id, amount, reason, now))
    conn.commit()
    tid = cur.lastrowid
    conn.close()
    return tid


def get_balance(user_id: int) -> int:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT COALESCE(SUM(amount),0) as bal FROM transactions WHERE user_id = ?', (user_id,))
    row = cur.fetchone()
    conn.close()
    return int(row['bal'] or 0)


def list_transactions(user_id: int):
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


# Feedback
def add_feedback(video_id: int, user_id: int, rating: int, comment: str) -> int:
    conn = connect_db()
    cur = conn.cursor()
    now = datetime.datetime.utcnow().isoformat()
    cur.execute('INSERT INTO feedback (video_id, user_id, rating, comment, created_at) VALUES (?,?,?,?,?)', (video_id, user_id, rating, comment, now))
    conn.commit()
    fid = cur.lastrowid
    # update avg rating on video
    cur.execute('SELECT AVG(rating) as avg FROM feedback WHERE video_id = ?', (video_id,))
    row = cur.fetchone()
    avg = row['avg'] or 0
    cur.execute('UPDATE videos SET avg_rating = ? WHERE id = ?', (avg, video_id))
    conn.commit()
    conn.close()
    return fid


def get_pending_videos():
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM videos WHERE approved = 0 ORDER BY created_at DESC')
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


# Courses
def create_course(name: str, skill_category: str, type: str, credit_cost: int, level: str = None, description: str = None, url: str = None) -> int:
    conn = connect_db()
    cur = conn.cursor()
    now = datetime.datetime.utcnow().isoformat()
    cur.execute('''INSERT INTO courses (name, skill_category, type, credit_cost, level, description, url, created_at)
                   VALUES (?,?,?,?,?,?,?,?)''', (name, skill_category, type, credit_cost, level, description, url, now))
    conn.commit()
    cid = cur.lastrowid
    conn.close()
    return cid


def list_courses(skill: Optional[str] = None, type: Optional[str] = None) -> List[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    q = 'SELECT * FROM courses'
    params = []
    clauses = []
    if skill:
        clauses.append('skill_category LIKE ?')
        params.append(f'%{skill}%')
    if type:
        clauses.append('type = ?')
        params.append(type)
    if clauses:
        q += ' WHERE ' + ' AND '.join(clauses)
    q += ' ORDER BY id DESC'
    cur.execute(q, params)
    rows = cur.fetchall()
    conn.close()
    return [dict(r) for r in rows]


def get_course(course_id: int) -> Optional[Dict]:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT * FROM courses WHERE id = ?', (course_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return None
    return dict(row)


def add_course_access(user_id: int, course_id: int, credits_spent: int = 0) -> int:
    conn = connect_db()
    cur = conn.cursor()
    now = datetime.datetime.utcnow().isoformat()
    cur.execute('INSERT INTO user_course_history (user_id, course_id, credits_spent, accessed_at) VALUES (?,?,?,?)',
                (user_id, course_id, credits_spent, now))
    conn.commit()
    hid = cur.lastrowid
    conn.close()
    return hid


def get_user_credit_balance(user_id: int) -> int:
    conn = connect_db()
    cur = conn.cursor()
    cur.execute('SELECT credit_balance FROM profiles WHERE user_id = ?', (user_id,))
    row = cur.fetchone()
    conn.close()
    if not row:
        return 0
    return int(row['credit_balance'] or 0)


def deduct_credits(user_id: int, amount: int, reason: str = 'Credit deduction') -> bool:
    """Deduct credits from user's balance and add transaction record."""
    if amount <= 0:
        return True
    conn = connect_db()
    cur = conn.cursor()
    try:
        cur.execute('SELECT credit_balance FROM profiles WHERE user_id = ?', (user_id,))
        row = cur.fetchone()
        if not row or row['credit_balance'] < amount:
            return False
        
        # Perform both updates in a single transaction
        cur.execute('UPDATE profiles SET credit_balance = credit_balance - ? WHERE user_id = ?', (amount, user_id))
        now = datetime.datetime.utcnow().isoformat()
        cur.execute('INSERT INTO transactions (user_id, amount, reason, created_at) VALUES (?,?,?,?)', (user_id, -amount, reason, now))
        conn.commit()
        return True
    except Exception:
        conn.rollback()
        return False
    finally:
        conn.close()
