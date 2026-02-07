#!/usr/bin/env python3
"""Simple HTTP server to test the frontend"""
from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

os.chdir(os.path.join(os.path.dirname(__file__), 'Frontend'))

class MyHTTPRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

if __name__ == '__main__':
    server = HTTPServer(('127.0.0.1', 8000), MyHTTPRequestHandler)
    print("Server running on http://127.0.0.1:8000")
    print("Press Ctrl+C to stop")
    server.serve_forever()
