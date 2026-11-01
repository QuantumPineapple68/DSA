#!/usr/bin/env python3
"""
Lightweight Local HTTP Server for DSA Revision Website
Serves files with correct MIME types, UTF-8 charset, and CORS headers.
"""

import os
import sys
import socket
from http.server import HTTPServer, SimpleHTTPRequestHandler

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

PORT = 5500
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class DSAHTTPRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers for fast local iteration
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.js'):
            return 'application/javascript; charset=utf-8'
        elif path.endswith('.css'):
            return 'text/css; charset=utf-8'
        elif path.endswith('.md'):
            return 'text/markdown; charset=utf-8'
        elif path.endswith('.html'):
            return 'text/html; charset=utf-8'
        return mimetype

def find_available_port(start_port=5500, max_attempts=10):
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex(('localhost', port)) != 0:
                return port
    return start_port

def run_server():
    port = find_available_port(PORT)
    server_address = ('', port)
    httpd = HTTPServer(server_address, DSAHTTPRequestHandler)
    print("================================================================")
    print(f">> DSA Interview Playbook Website running locally at:")
    print(f">> http://localhost:{port}")
    print(f">> http://127.0.0.1:{port}")
    print("================================================================")
    sys.stdout.flush()
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    run_server()
