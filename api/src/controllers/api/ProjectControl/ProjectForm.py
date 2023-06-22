from wtforms import Form
from wtforms.fields import StringField, IntegerField
from wtforms.validators import DataRequired

class ProjectForm(Form):
    name = StringField('name', validators=[DataRequired()])