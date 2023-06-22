from wtforms import Form
from wtforms.fields import StringField, IntegerField
from wtforms.validators import DataRequired

class RoleForm(Form):
    skill_name = StringField('skill_name', validators=[DataRequired()])
    nivel = IntegerField('nivel', validators=[DataRequired()])