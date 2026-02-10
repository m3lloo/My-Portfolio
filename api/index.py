from flask import Flask, render_template
import os

# Get the path of the current file (api/index.py)
current_dir = os.path.dirname(os.path.abspath(__file__))

# Point to the folders in the root directory (one level up)
template_dir = os.path.join(current_dir, '..', 'templates')
static_dir = os.path.join(current_dir, '..', 'static')

# Initialize Flask with the explicit paths
app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

@app.route('/')
def home():
    return render_template('index.html')

# Vercel requires the variable name 'app' to be exposed.
# The 'if __name__' block is only for local testing.
if __name__ == '__main__':
    app.run(debug=True)