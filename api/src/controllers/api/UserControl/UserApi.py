from flask import Blueprint, request, jsonify

from src import db
from src.model.User import User
from src.model.AvatarUser import AvatarUser
from src.controllers.utils.Authenticate import jwt_required
from werkzeug.security import generate_password_hash

from .UserForm import UserForm, ChangePasswordForm
from src.controllers.serializers.UserSerializer import UserSerializer
bp = Blueprint('user', __name__, url_prefix='/user')
serializer_user = UserSerializer()

@bp.route('/get', methods=['GET'])
@jwt_required
def getUser(current_user):
    try:
        data = serializer_user.userFullSerial(current_user.id)
        return jsonify(data), 200


    except Exception as error:
        return jsonify({ "error": error }), 500


@bp.route('/edit', methods=['PUT'])
@jwt_required
def editUser(current_user):
    validator = UserForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400
    
    try:
        user = User.query.filter_by(id=current_user.id).first()
        user.name = request.json['name']
        user.email = request.json['email']
        db.session.commit()

        avatarUser = AvatarUser.query.filter_by(user_id=current_user.id).first()
        if avatarUser and request.json['attachment']:
            avatarUser.attachment = request.json['attachment']
            db.session.commit()

        elif request.json['attachment']:
            avatarUser = AvatarUser(
                user_id=current_user.id,
                attachment=request.json['attachment']
            )
            db.session.add(avatarUser)
            db.session.commit()
    
        
        data = serializer_user.userFullSerial(user.id)
        return jsonify(data), 200

    except Exception as error:
        return jsonify({ "error": error }), 500

@bp.route('/change-password')
@jwt_required
def changePassword(current_user):
    validator = ChangePasswordForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        id = current_user.id
        password = generate_password_hash(request.json['password'])
        user = User.query.filter_by(id=id).first()
        user.password = password
        db.session.commit()

        return jsonify({ "Status": "Senha alterada com sucesso" })

    except Exception as error:
        erro = {'error': str(error)}
        return jsonify(erro), 500
