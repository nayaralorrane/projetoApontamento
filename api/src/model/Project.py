from src import db
import json

class Project(db.Model):
    __tablename__ = 'project'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    owner = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __init__(self, name=None, owner=None):
        self.name = name
        self.owner = owner

    def __repr__(self):
        return json.dumps({
            "id": self.id,
            "name": self.name,
            "owner": self.owner
        })