from src.model.Project import Project
from .UserSerializer import UserSerializer

serializer_user = UserSerializer()

class ProjectSerializer:
    def projectSerial(self, project_id):

        project = Project.query.filter_by(id=project_id).first()

        data = {
            "id": project.id,
            "name": project.name,
            "owner": serializer_user.userSerial(project.owner)
        }

        return data

    def listAllProject(self):
        listProject = Project.query.all()

        data = {
            "data": []
        }
        for project in listProject:
            data['data'].append(self.projectSerial(project.id))

        data["count"] = len(data["data"])
        return data