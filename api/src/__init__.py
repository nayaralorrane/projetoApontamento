from flask import Flask
from flask_sqlalchemy import SQLAlchemy


# Settings
app = Flask(__name__)

app.config['SECRET_KEY'] = 'apontamento.app.api'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)