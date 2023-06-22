from flask import Blueprint, request, jsonify

from src import db
from src.model.Project import Project
from src.controllers.utils.Authenticate import jwt_required

from .ProjectForm import ProjectForm
from src.controllers.serializers.ProjectSerializer import ProjectSerializer

bp = Blueprint('project', __name__, url_prefix='/project')
serializer_project = ProjectSerializer()

@bp.route('/create', methods=['POST'])
@jwt_required
def createProject(current_user):
    validator = ProjectForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        project = Project(
            name=request.json['name'],
            owner=current_user.id
        )
        db.session.add(project)
        db.session.commit()

        data = serializer_project.projectSerial(project.id)
        return jsonify(data), 200

    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/get', methods=['GET'])
@jwt_required
def getProject(current_user):
    project_id = request.args.get("id")
    try:
        if (project_id):
            data = serializer_project.projectSerial(project_id)
            return jsonify(data), 200

        else:
            data = serializer_project.listAllProject()
            return jsonify(data), 200

    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/edit/<id>', methods=['PUT'])
@jwt_required
def editProject(id, current_user):
    validator = ProjectForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        project = Project.query.filter_by(id=id).first()
        if project:
            project.name = request.json['name']
            db.session.commit()

            data = serializer_project.projectSerial(project.id)
            return jsonify(data), 200

        else:
            return jsonify({ "error": "project not found" }), 404


    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/delete/<id>', methods=["DELETE"])
@jwt_required
def deleteProject(id, current_user):
    try:
        if id:
            project = Project.query.filter_by(id=id).first()
            db.session.delete(project)
            db.session.commit()

            return jsonify({ 'status': 'delete was success' })

        else:
            return jsonify({'error': 'id not found' }), 400

    except Exception as error:
        return jsonify({ "error": error }), 500