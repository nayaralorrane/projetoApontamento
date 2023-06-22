from wtforms import Form
from wtforms.fields import StringField, PasswordField
from wtforms.validators import DataRequired, Email

class SignForm(Form):
    access_token = StringField('access_token', validators=[DataRequired()])