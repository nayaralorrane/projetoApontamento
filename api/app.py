from src import app, db

from flask_migrate import Migrate
from werkzeug.middleware.proxy_fix import ProxyFix

from src.controllers.api.SignControl import SignApi
from src.controllers.api.ProjectControl import ProjectApi
from src.controllers.api.PointControl import  PointApi
from src.controllers.api.UserControl import UserApi
from src.controllers.api.SSOGoogle import ssoApi
from src.controllers.api.RoleControl import RoleApi
from src.model import User, Project, Point, Role, UserRole, AvatarUser
import wtforms_json

wtforms_json.init()
Migrate(app, db)

app.wsgi_app = ProxyFix(app.wsgi_app)
app.register_blueprint(SignApi.bp)
app.register_blueprint(ProjectApi.bp)
app.register_blueprint(PointApi.bp)
app.register_blueprint(UserApi.bp)
app.register_blueprint(ssoApi.bp)
app.register_blueprint(RoleApi.bp)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)