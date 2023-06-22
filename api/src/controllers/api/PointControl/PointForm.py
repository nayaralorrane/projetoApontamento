from wtforms import Form
from wtforms.fields import StringField, DateField, IntegerField
from wtforms.validators import DataRequired

class PointForm(Form):
    id = IntegerField('id')
    task_description = StringField('task_description', validators=[DataRequired()])
    date = StringField('date', validators=[DataRequired()])
    start_time = StringField('start_time', validators=[DataRequired()])
    end_time = StringField('end_time', validators=[DataRequired()])
    project_id = IntegerField('project_id', validators=[DataRequired()])