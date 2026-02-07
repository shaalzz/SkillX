#!/usr/bin/env python
"""Run SkillX Flask server with Waitress"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == '__main__':
    from backend.app import app
    from waitress import serve
    
    print("Starting SkillX server on http://127.0.0.1:5000")
    print("Server is ready to accept connections...")
    serve(app, host='0.0.0.0', port=5000, threads=4)
