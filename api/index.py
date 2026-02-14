from flask import Flask, render_template

# Initialize Flask with explicit folder paths relative to the 'api' directory
# We use '../' to go up one level to the root where 'templates' and 'static' are
app = Flask(__name__, 
            template_folder='../templates', 
            static_folder='../static')

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)