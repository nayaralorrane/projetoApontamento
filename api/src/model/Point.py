from time import timezone
from src import db
from sqlalchemy.sql import func
import json

class Point(db.Model):
    __tablename__ = 'point'
    id = db.Column(db.Integer, primary_key=True)
    task_description = db.Column(db.String(300), nullable=False)
    date = db.Column(db.String(100), nullable=False)
    start_time = db.Column(db.String(100), nullable=False)
    end_time = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), onupdate=func.now())

    def __init__(
        self,
        task_description=None,
        date=None,
        start_time=None,
        end_time=None,
        user_id=None,
        project_id=None
    ):
        self.task_description = task_description
        self.date = date
        self.user_id = user_id
        self.project_id = project_id
        self.start_time = start_time
        self.end_time = end_time

    def __repr__(self):
       return json.dumps({
            "id": self.id,
            "description": self.task_description,
            "date": self.date,
            "start_time": self.start_time,
            "end_time": self.end_time,
            "user_id": self.user_id,
            "project_id": self.project_id
        })