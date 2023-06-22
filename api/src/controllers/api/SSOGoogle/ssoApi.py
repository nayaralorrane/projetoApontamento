from flask import Blueprint, request, jsonify, current_app, redirect, url_for
import datetime, jwt

from src import db
from src.model.User import User
from src.model.UserRole import UserRole
from .tokenGoogleValidate import ValidateGoogle
from .SSOFormValidator import SignForm

bp = Blueprint('sso', __name__, url_prefix='/sso')
validateGoogle = ValidateGoogle()

@bp.route('/sign-up', methods=['POST'])
def ssoGoogleSingUp():
    validator = SignForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    response = validateGoogle.validToken(request.json['access_token'])
    if response.status_code == 200:
        google_token = response.json()['sub']

        # Login com token google
        user = User.query.filter_by(id_token_google=google_token).first()
        if user:
            return redirect(url_for('sso.ssoGoogleSignIn'), code=307)

        #Cadatro de usuario com google
        else:
            try:
                user = User(
                    name=response.json()['name'],
                    email=response.json()['email'],
                    id_token_google=google_token
                )
                db.session.add(user)
                db.session.commit()

                user_role = UserRole(
                    user_id=user.id,
                    role_id=1
                )
                db.session.add(user_role)
                db.session.commit()

                payload = {
                    "id": user.id,
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(days=15)
                }
                token = jwt.encode(payload, current_app.config['SECRET_KEY'])
                token = token.decode('utf-8')

                return jsonify({
                    "idUser": user.id,
                    "email": user.email,
                    "token": token
                }), 200

            except Exception as error:
                print(str(error))
                return jsonify({ 'error': str(error) }), 500
    else:
        return jsonify({ 'error':'token nao e valido' }), 403


@bp.route('/sign-in', methods=['POST'])
def ssoGoogleSignIn():
    validator = SignForm.from_json(request.json)
    if not validator.validate():
        return jsonify({ "error": "bad request" }), 400

    try:
        response = validateGoogle.validToken(request.json['access_token'])
        user = User.query.filter_by(email=response.json()['email']).first()
        if response.status_code == 200 and user:
            payload = {
                "id": user.id,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(days=15)
            }
            token = jwt.encode(payload, current_app.config['SECRET_KEY'])
            token = token.decode('utf-8')

            return jsonify({
                "idUser": user.id,
                "email": user.email,
                "token": token
                })

        else:
            return jsonify({"erro": "usuario nao encontrado"}), 404

    except Exception as error:
        erro = {'error': str(error)}
        return jsonify(erro), 500