from flask import Flask, render_template
import os

# Get the directory where index.py is located (the 'api' folder)
api_dir = os.path.dirname(os.path.abspath(__file__))

# Move up one level to the project root
project_root = os.path.abspath(os.path.join(api_dir, ".."))

app = Flask(__name__, 
            # This tells Flask exactly where to find your folders relative to index.py
            template_folder=os.path.join(project_root, 'templates'),
            static_folder=os.path.join(project_root, 'static'),
            static_url_path='/static')

@app.route('/')
def home():
    return render_template('index.html')

# Essential for Vercel
app.debug = True 

if __name__ == '__main__':
    app.run()