from wtforms import Form
from wtforms.fields import StringField, PasswordField
from wtforms.validators import DataRequired, Email

class UserForm(Form):
    email = StringField('email', validators=[DataRequired(), Email()])
    name = StringField('name', validators=[DataRequired()])

class ChangePasswordForm(Form):
    password = PasswordField('password', validators=[DataRequired()])
