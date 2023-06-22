from src import db
import json

class AvatarUser(db.Model):
    __tablename__= 'avatar_user'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    attachment = db.Column(db.String, nullable=False)

    def __init__(self, user_id=None, attachment=None):
        self.user_id = user_id
        self.attachment = attachment

    def __repr__(self):
        return json.dumps({
            "id": self.id,
            "user_id": self.user_id,
            "attachment": self.attachment
        }) 