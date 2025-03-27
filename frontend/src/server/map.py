from flask import Flask
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    # Run the Python script whenever the home route is accessed
    subprocess.run(['python3', '../components/Home/Map/test.py'])
    return "Home Page - Python script executed!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)