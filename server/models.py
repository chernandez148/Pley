from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy import Enum
from sqlalchemy.ext.hybrid import hybrid_property
from bcrypt import hashpw, gensalt
from flask_bcrypt import Bcrypt
from config import app


bcrypt = Bcrypt(app)
db = SQLAlchemy()

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    type = db.Column(db.String, default=False)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String(128), nullable=False)
    completed_business_form = db.Column(db.Boolean, default=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    @hybrid_property
    def password(self):
        return self._password_hash 

    @password.setter
    def password(self, password):
        salt = gensalt()
        self._password_hash = hashpw(password.encode('utf-8'), salt).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

    reviews = db.relationship('Review', backref='user')
    businesses = db.relationship('Business', backref='user')

    serialize_rules = ('-created_at', '-updated_at', '-reviews', '-businesses')



class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String)
    rating = db.Column(db.Integer)

    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-created_at', '-updated_at', '-business_id', '-user_id')

    def __repr__(self):
        return f'Review: {self.review} | Rating: {self.rating} | business_id: {self.business_id} | user_id: {self.user_id}'

    @validates('rating')
    def validate_rating(self, key, rating):
        if int(rating) < 1 or int(rating) > 5:
            raise ValueError({'error': 'Rating must be between 1 and 5'})
        return int(rating)


class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    business_name = db.Column(db.String)
    business_number = db.Column(db.String)
    business_image = db.Column(db.String, default="https://d2jhcfgvzjqsa8.cloudfront.net/storage/2022/04/download.png")
    business_address = db.Column(db.String)
    business_city = db.Column(db.String)
    business_state = db.Column(db.String)
    business_zipcode = db.Column(db.Integer)
    business_category = db.Column(Enum(
    'Food & Dining', 'Automotive', 'Retailer', 'Computers & Electronics', 'Entertainment', 'Health & Medicine', 'Education', 'Home & Garden', 'Legal & Financial', 'Manufacturing, Wholesale, Distribution', 'Personal Care & Services', 'Real Estate', 'Travel & Transportation', 'Other'
    ), nullable=False)
    business_description = db.Column(db.String)
    business_owner = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    reviews = db.relationship('Review', backref='business')
    users = association_proxy('reviews', 'user')

    serialize_rules = ('-created_at', '-updated_at', '-user_id', '-reviews', '-users')

    def __repr__(self):
        return f'Name: {self.business_name} | owner: {self.business_owner}'



