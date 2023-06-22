from src import db
from werkzeug.security import generate_password_hash, check_password_hash
import json

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    skill_name = db.Column(db.String(50), unique=True, nullable=False)
    nivel = db.Column(db.Integer, nullable=False)

    def __init__(self, skill_name=None, nivel=None):
        self.skill_name = skill_name
        self.nivel = nivel

    def __repr__(self):
       return json.dumps({
            "id": self.id,
            "skill_name": self.skill_name,
            "nivel": self.nivel
        })