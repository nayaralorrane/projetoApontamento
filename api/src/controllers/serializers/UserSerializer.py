from src.model.AvatarUser import AvatarUser
from src.model.User import User
from symbol import return_stmt

class UserSerializer:
    def userSerial(self, user_id):
        user = User.query.filter_by(id=user_id).first()

        data = {
            "id": user.id,
            "id_token_google": user.id_token_google,
            "email": user.email,
            "name": user.name,
        }
        return data
    
    def userFullSerial(self, user_id):
        user = User.query.filter_by(id=user_id).first()
        avatarUser = AvatarUser.query.filter_by(user_id=user_id).first()

        data = {
            "id": user.id,
            "id_token_google": user.id_token_google,
            "email": user.email,
            "name": user.name,
        }
        if avatarUser: data["avatar"] = avatarUser.attachment
        return data