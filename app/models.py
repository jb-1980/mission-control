from flask.ext.login import UserMixin
from app import db


class User(UserMixin,db.Document):
    kaid = db.StringField(required=True, unique=True)
    username = db.StringField(required=True, unique=True)
    nickname = db.StringField(required=True)
    access_token = db.StringField(required=True)
    access_token_secret = db.StringField(required=True)
    timestamp = db.DateTimeField(rquired=True)
    missions = db.ListField(db.ReferenceField('Mission'))
    colors = db.StringField(default="blue")

class Task(db.EmbeddedDocument):
    kaid = db.StringField(required=True)
    title = db.StringField(required=True)
    name  = db.StringField(required=True)

class Topics(db.EmbeddedDocument):
    title = db.StringField(required=True)
    tasks = db.EmbeddedDocumentListField("Task")

class Mission(db.Document):
    title = db.StringField(required=True)
    code = db.StringField(required=True, unique=True)
    owner = db.ReferenceField(User,dbref=False)
    topics = db.ListField(db.EmbeddedDocumentField("Topics"))

class TaskList(db.Document):
    kaid = db.StringField(required=True)
    name = db.StringField(required=True)
    title = db.StringField(required=True)
