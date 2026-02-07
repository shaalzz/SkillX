#!/usr/bin/env python
"""Run SkillX Flask server"""
import os
import sys
import time

# Ensure the parent directory is in the path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

if __name__ == '__main__':
    print("="*60)
    print("SkillX Server Starting...")
    print("="*60)
    
    try:
        from backend.app import app
        print("Backend app loaded OK")
        
        from waitress import serve
        print("Waitress loaded OK")
        
        print("URL: http://127.0.0.1:5000")
        print("="*60)
        print("")
        
        serve(app, host='0.0.0.0', port=5000, threads=4, _quiet=False)
    except KeyboardInterrupt:
        print("\nServer stopped.")
        sys.exit(0)
    except ImportError as e:
        print(f"Import error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    except Exception as e:
        print(f"Server error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
