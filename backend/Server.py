# Mapping imports
from FindRoute import get_path
import osmnx as ox
# HTTP Server imports
import http.server
import socketserver
import io
import json
from urllib.parse import urlparse, unquote

# Preload graph to have it in memory
graph = ox.load_graphml("boston-elevation-graph")

##############################################################################
#
# Example of using Python and XlsxWriter to create an Excel XLSX file in an in
# memory string suitable for serving via SimpleHTTPRequestHandler or Django or
# with the Google App Engine.
#
# Copyright 2013-2020, John McNamara, jmcnamara@cpan.org
#

# Note: This is a Python 3 example. For Python 2 see http_server_py2.py.



class Handler(http.server.SimpleHTTPRequestHandler):

    def do_GET(self):
        
        # Construct a server response.
        self.send_response(200)
        self.send_header('Content-type','text/json')
        self.end_headers()
        print(self.path)
        # Parse out query
        try:
            query = urlparse(self.path).query
            query_components = dict(qc.split("=") for qc in query.split("&"))
            start = unquote(query_components['start'], encoding='utf-8', errors='replace')
            end = unquote(query_components['end'], encoding='utf-8', errors='replace')
            
            output = end.replace('+', ' ')
            # Get path
            output = get_path(start.replace('+', ' '), end.replace('+', ' '), 50, graph)
        except:
            output = "Could not parse request, try again."
        self.wfile.write(str(output).encode('utf-8'))
        return



# Start server
with socketserver.TCPServer(('', 8000), Handler) as httpd:
    try:
        print('Server listening on port 8000...')
        httpd.serve_forever()
    except:
        pass