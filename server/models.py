from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum

db = SQLAlchemy()

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    owner = db.Column(db.Boolean, default=False)
    email = db.Column(db.String)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship('Review', backref='user')
    businesses = db.relationship('Business', backref='user')

    serialize_rules = ('-created_at', '-updated_at', '-reviews', '-businesses')



class Review(db.Model, SerializerMixin):
    tablename = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    rating = db.Column(db.Integer)

    business_id = db.Column(db.Integer, db.ForeignKey('business.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-created_at', '-updated_at', '-business_id', '-user_id')

    def __repr__(self):
        return f'Review: {self.review} | Rating: {self.rating} | business_id: {self.business_id} | user_id: {self.user_id}'

    @validates('rating')
    def validate_rating(self, key, rating):
        if rating < 1 or rating > 5:
            raise ValueError({'error': 'Rating must be between 1 and 5'})
        return rating


class Business(db.Model, SerializerMixin):
    __tablename__ = 'business'

    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String)
    buisness_nember = db.Column(db.String)
    business_image = db.Column(db.String, default="https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png")
    business_address = db.Column(db.String)
    business_city = db.Column(db.String)
    business_state = db.Column(db.String)
    business_zipcode = db.Column(db.Integer)
    business_category = db.Column(Enum(
    'Food & Dining', 'Automotive', 'Retailer', 'Computers & Electronics', 'Entertainment', 'Health & Medicine', 'Education', 'Home & Garden', 'Legal & Financial', 'Manufacturing, Wholesale, Distribution', 'Personal Care & Services', 'Real Estate', 'Travel & Transportation', 'Other'
    ), nullable=False)
    business_description = db.Column(db.String)
    business_owner = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship('Review', backref='business')
    users = association_proxy('reviews', 'user')

    serialize_rules = ('-created_at', '-updated_at', '-user_id', '-reviews', '-users')

    def __repr__(self):
        return f'Name: {self.business_name} | owner: {self.business_owner}'


