from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        return super().end_headers()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    server_address = ('', port)
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print(f'Сервер запущен на порту {port}')
    httpd.serve_forever() 