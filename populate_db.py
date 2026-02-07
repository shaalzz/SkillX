#!/usr/bin/env python
"""Populate SkillX database with sample data for testing."""
import sys
sys.path.insert(0, '.')

from backend.db import (
    connect_db, create_user, create_profile, add_user_skill,
    create_video, approve_video, add_transaction, create_course
)
from werkzeug.security import generate_password_hash

# Clear DB
conn = connect_db()
cur = conn.cursor()
for table in ['user_course_history', 'courses', 'feedback', 'transactions', 'videos', 'user_skills', 'skills', 'profiles', 'users']:
    try:
        cur.execute(f'DROP TABLE {table}')
    except:
        pass
conn.commit()
conn.close()

# Reinit DB
from backend.db import init_db
init_db()

# Create sample users
users = [
    ('alice', 'alice@example.com', 'password1', 'Alice Johnson', '9876543210', 'MIT', '2nd Year', 'Undergraduate'),
    ('bob', 'bob@example.com', 'password1', 'Bob Smith', '9876543211', 'Stanford', '3rd Year', 'Undergraduate'),
    ('charlie', 'charlie@example.com', 'password1', 'Charlie Brown', '9876543212', 'Harvard', '4th Year', 'Postgraduate'),
]

user_map = {}
for uname, email, pwd, fname, phone, college, year, category in users:
    uid = create_user(uname, email, generate_password_hash(pwd))
    user_map[uname] = uid
    create_profile(uid, fname, phone, college, year, category)
    # Give them initial credits (50 already default in profile creation)
    print(f"[OK] User: {uname} (id={uid}, category={category}, credits=50)")

# Add skills to users
skills_teach = [
    ('alice', ['Python', 'Web Development']),
    ('bob', ['JavaScript', 'Machine Learning']),
    ('charlie', ['Data Science', 'Statistics']),
]
for uname, skills in skills_teach:
    for skill in skills:
        add_user_skill(user_map[uname], skill, 'teach')

skills_learn = [
    ('alice', ['Machine Learning', 'Statistics']),
    ('bob', ['Data Science', 'Python']),
    ('charlie', ['Web Development', 'JavaScript']),
]
for uname, skills in skills_learn:
    for skill in skills:
        add_user_skill(user_map[uname], skill, 'learn')

# Create sample COURSES (free and paid)
courses = [
    ('Python Fundamentals', 'Python', 'FREE', 0, 'Beginner', 'Learn Python basics'),
    ('Advanced Python Patterns', 'Python', 'CREDIT', 15, 'Advanced', 'Master advanced patterns'),
    ('Web Development 101', 'Web Development', 'FREE', 0, 'Beginner', 'HTML, CSS, JS basics'),
    ('React Masterclass', 'Web Development', 'CREDIT', 25, 'Intermediate', 'Advanced React concepts'),
    ('Machine Learning Foundations', 'Machine Learning', 'CREDIT', 20, 'Beginner', 'ML with scikit-learn'),
    ('Deep Learning Certification', 'Machine Learning', 'CREDIT', 50, 'Advanced', 'Advanced neural networks'),
    ('Data Science 101', 'Data Science', 'FREE', 0, 'Beginner', 'Intro to data analysis'),
    ('Statistics for ML', 'Statistics', 'CREDIT', 12, 'Intermediate', 'Stats fundamentals'),
    ('JavaScript ES6+', 'JavaScript', 'FREE', 0, 'Beginner', 'Modern JS syntax'),
    ('Communication Skills', 'Communication', 'FREE', 0, 'Beginner', 'Professional communication'),
]

for name, skill, type, cost, level, desc in courses:
    cid = create_course(name, skill, type, cost, level, desc)
    print(f"[OK] Course: {name} (id={cid}, type={type}, cost={cost})")

print("\n[SUCCESS] Database populated!")
print(f"Users: alice, bob, charlie (password: password1)")
print(f"All users get 50 free credits on account creation")
print(f"Courses: 10 courses (5 FREE, 5 CREDIT-based)")

