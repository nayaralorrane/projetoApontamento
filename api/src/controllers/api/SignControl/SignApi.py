import jwt, datetime
from src import db
from flask import Blueprint, request, jsonify, current_app
from src.model.User import User
from src.model.UserRole import UserRole
from src.model.Role import Role
from src.controllers.utils.Authenticate import jwt_required
from .SignForm import SignInForm, SignUpForm

bp = Blueprint('api', __name__, url_prefix='/api')

@bp.route('/sign-in', methods=['POST'])
def singIn():
    validator = SignInForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        email = request.json['email']
        password = request.json['password']

        user = User.query.filter_by(email=email).first()
        if user:
            if not user.verify_password(password):
                return jsonify({ "error": "password is wrong" }), 403

            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=15)
            }
            token = jwt.encode(payload, current_app.config['SECRET_KEY'])
            token = token.decode('utf-8')

            return jsonify({
                "id_user": user.id,
                "email": user.email,
                "token": token
            }), 200

        else:
            return jsonify({ "error": "user not found" }), 404

    except Exception as error:
        erro = {'error': str(error)}
        return jsonify(erro), 500


@bp.route('/sign-up', methods=['POST'])
def signUp():
    validator = SignUpForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        user = User(
            name=request.json['name'],
            id_token_google=None,
            email=request.json['email'],
            password=request.json['password']
        )
        db.session.add(user)
        db.session.commit()

        role_id = Role.query.filter_by(skill_name='colaborator').first()

        user_role = UserRole(
            user_id=user.id,
            role_id=role_id.id
        )
        db.session.add(user_role)
        db.session.commit()


        payload = {
            "id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=15)
        }
        token = jwt.encode(payload, current_app.config['SECRET_KEY'])
        token = token.decode('utf-8')

        return jsonify({ "id_user": user.id, "token": token })

    except Exception as error:
        erro = {'error': str(error)}
        print(erro)
        return jsonify(erro), 500


@bp.route('/valid-token', methods=['GET'])
@jwt_required
def validToken(current_user):
    return jsonify({ 'status': 'valid token' }), 200