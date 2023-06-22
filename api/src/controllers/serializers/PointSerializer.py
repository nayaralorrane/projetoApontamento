from src.model.Point import Point
from sqlalchemy import and_
class PointSerializer:

    def serial(self, pointId):
        point = Point.query.filter_by(id=pointId).first()
        if point:
            return {
                "id": point.id,
                "task_description": point.task_description,
                "date": point.date,
                "start_time": point.start_time,
                "end_time": point.end_time,
                "user_id": point.user_id,
                "project_id": point.project_id,
                "created_at": point.created_at,
                "updated_at": point.updated_at
            }

        else: return {}

    def getPoints(self, id_user, page, per_page, project_id):
        if not page: page = 1
        if not per_page: per_page: 5

        dataPoint = {
            "page": page,
            "per_page": per_page,
            "data": []
        }
        
        if project_id:
            arrayPoint = Point.query.filter(and_(Point.user_id==id_user, Point.project_id==project_id)).paginate(page=int(page), per_page=int(per_page))

        else: 
            arrayPoint = Point.query.filter_by(user_id=id_user).paginate(page=int(page), per_page=int(per_page))
            

        for point in arrayPoint.items:
            dataPoint["data"].append(self.serial(point.id))

        return dataPoint