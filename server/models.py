from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy

db = SQLAlchemy()

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    tablename = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    reviews = db.relationship('Review', backref='user')
    restaurants = association_proxy('reviews', 'restaurant')

    def repr(self):
        return f'Name: {self.fname} {self.lname} | Email: {self.email}'


class Review(db.Model, SerializerMixin):
    tablename = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    rating = db.Column(db.Integer)

    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    def __repr__(self):
        return f'Review: {self.review} | Rating: {self.rating} | restaurant_id: {self.restaurant_id} | user_id: {self.user_id}'

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating < 1 or rating > 5:
            raise ValueError({'error': 'Rating must be between 1 and 5'})
        return rating


class Restaurant(db.Model, SerializerMixin):
    tablename = 'restaurants'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)

    owner_id = db.Column(db.Integer, db.ForeignKey('owner.id'))

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    reviews = db.relationship('Review', backref='restaurant')
    users = association_proxy('reviews', 'user')

    def __repr__(self):
        return f'Name: {self.name} | owner_id: {self.owner_id}'


class Owner(db.Model, SerializerMixin):
    tablename = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    email = db.Column(db.String)

    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    restaurants = db.relationship('Restaurant', backref='owner')

    def __repr__(self):
        return f'Name: {self.fname} {self.lname} | Email: {self.email}'

