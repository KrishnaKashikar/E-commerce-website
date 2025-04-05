from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Change to the directory containing your HTML files
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Create an HTTP server with the default handler
server_address = ('', 8000)
httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)

print('Server running at http://localhost:8000/')
print('Press Ctrl+C to stop the server')

# Start the server
httpd.serve_forever()
