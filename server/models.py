from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String)

    def __repr__(self):
        return
