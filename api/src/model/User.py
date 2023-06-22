from src import db
from werkzeug.security import generate_password_hash, check_password_hash
import json

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    id_token_google = db.Column(db.String(100), unique=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(500))

    def __init__(self, name=None, email=None, id_token_google=None, password=None):
        self.name = name
        self.id_token_google = id_token_google
        self.email = email
        if password:
            self.password = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password, password)

    def __repr__(self):
       return json.dumps({
            "id": self.id,
            "id_token_google": self.id_token_google,
            "name":  self.name,
            "email": self.email,
            "password": self.password
        })