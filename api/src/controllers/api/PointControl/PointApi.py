from flask import Blueprint, request, jsonify
from formatter import DumbWriter

from src import db
from src.model.Point import Point
from src.controllers.utils.Authenticate import jwt_required
from src.controllers.serializers.PointSerializer import PointSerializer
from .PointForm import PointForm

serializer_point = PointSerializer()
bp = Blueprint('point', __name__, url_prefix='/point')

@bp.route('/create', methods=['POST'])
@jwt_required
def createPoint(current_user):
    validator = PointForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        point = Point(
            user_id=current_user.id,
            task_description=request.json['task_description'],
            date=request.json['date'],
            start_time=request.json['start_time'],
            end_time=request.json['end_time'],
            project_id=request.json['project_id']
        )
        db.session.add(point)
        db.session.commit()

        data = serializer_point.serial(point.id)
        return jsonify(data), 200

    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/get', methods=['GET'])
@jwt_required
def getPoint(current_user):
    id = request.args.get('id')
    page = request.args.get('page')
    per_page = request.args.get('per_page')
    projeto_id = request.args.get('projeto_id')

    try:
        if (id):
            data = serializer_point.serial(id)
            return jsonify(data), 200

        else:
            data = serializer_point.getPoints(current_user.id, page, per_page, projeto_id)
            return jsonify(data), 200

    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/edit/<id>', methods=['PUT'])
@jwt_required
def editPoint(id, current_user):
    validator = PointForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        point = Point.query.filter_by(id=id).first()
        if point:
            point.task_description = request.json['task_description']
            point.date = request.json['date']
            point.start_time = request.json['start_time']
            point.end_time = request.json['end_time']
            point.project_id = request.json['project_id']
            db.session.commit()

            data = serializer_point.serial(point.id)
            return jsonify(data), 200

        else:
            return jsonify({ "error": "project not found" }), 404


    except Exception as error:
        return jsonify({ "error": error }), 500

@bp.route('/delete/<id>', methods=["DELETE"])
@jwt_required
def deletePoint(id, current_user):
    try:
        if id:
            point = Point.query.filter_by(id=id).first()
            db.session.delete(point)
            db.session.commit()

            return jsonify({ 'status': 'delete was success' })

        else:
            return jsonify({'error': 'id not found' }), 400

    except Exception as error:
        return jsonify({ "error": error }), 500