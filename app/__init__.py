from flask import Flask

from flask.ext.mongoengine import MongoEngine
from flask.ext.login import LoginManager

app = Flask(__name__)

## Uncomment to allow for CORS
# from flask.ext.cors import CORS
# CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'db': 'missioncontrol',
    'host': '0.0.0.0',
    'port': 27017
}
app.config['WTF_CSRF_ENABLED'] = True
app.config['SECRET_KEY'] = 'you-will-never-guess'
db = MongoEngine(app)
lm = LoginManager(app)
lm.login_view = 'index'

from app import views, models
