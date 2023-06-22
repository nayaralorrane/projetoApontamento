from flask import Blueprint, request, jsonify

from src import db
from src.model.Role import Role
from .RoleForm import RoleForm

bp = Blueprint('role', __name__, url_prefix='/role')

@bp.route('/create', methods=['POST'])
def createRole():
    validator = RoleForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        role = Role(
            skill_name=request.json['skill_name'],
            nivel=request.json['nivel']
        )
        db.session.add(role)
        db.session.commit()

        return jsonify({ 'status': 'create success' }), 200

    except Exception as error:
        print(str(error))
        return jsonify({ "error": error }), 500


@bp.route('/delete/<id>', methods=["DELETE"])
def deleteRole(id):
    try:
        if id:
            role = Role.query.filter_by(id=id).first()
            db.session.delete(role)
            db.session.commit()

            return jsonify({ 'status': 'delete was success' })

        else:
            return jsonify({'error': 'id not found' }), 400

    except Exception as error:
        return jsonify({ "error": error }), 500