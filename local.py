import http.server
import socketserver

class RequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        print("Received GET request from", self.client_address[0])
        super().do_GET()

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode('utf-8')
        print("Received POST request from", self.client_address[0])
        print("Body:", body)
        super().do_POST()

    def do_PUT(self):
        content_length = int(self.headers['Content-Length'])
        body = self.rfile.read(content_length).decode('utf-8')
        print("Received PUT request from", self.client_address[0])
        print("Body:", body)
        super().do_PUT()

PORT = 8001

with socketserver.TCPServer(("", PORT), RequestHandler) as httpd:
    print("Server running on port", PORT)
    httpd.serve_forever()