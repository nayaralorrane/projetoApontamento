from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Settings
app = Flask(__name__)

app.config['SECRET_KEY'] = 'fatec.proj.apontomento'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///UserDatabase.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)