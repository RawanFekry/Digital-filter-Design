from flask import Flask , flash, request, redirect, url_for, render_template
import json
import urllib.request
from werkzeug.utils import secure_filename


app = Flask(__name__) 
app.secret_key = "secret key"


@app.route('/', methods= ['GET','POST'])
def home():
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True, port=8000)