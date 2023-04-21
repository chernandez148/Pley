#!/usr/bin/env python3

# Standard library imports
import os

# Remote library imports
from flask import Flask, jsonify, make_response, request, session, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound, Unauthorized

# Local imports
from models import db, User, Business, Review

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

app.secret_key = 'yjekwsjrfy826592grhkljsdghfkuseygioebfoliwecvrg33p948576cnloutqovn'
migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Users(Resource):
    def get(self):
        user = [u.to_dict() for u in User.query.all()]
        return make_response(jsonify(user), 200)

api.add_resource(Users, '/users')


class Businesses(Resource):
    
    def get(self):
        business = [b.to_dict() for b in Business.query.all()]
        return make_response(jsonify(business), 200)
    
    def post(self):
        if 'user_id' not in session:
            abort(401, "Unauthorized")
        
        user = User.query.filter_by(id=session['user_id']).first()
        if user.type != 'Business':
            abort(403, "Forbidden")

        form_json = request.get_json()
        try:
            new_business = Business(
                business_name=form_json['business_name'],
                business_number=form_json['business_number'],
                business_address=form_json['business_address'],
                business_city=form_json['business_city'],
                business_state=form_json['business_state'],
                business_zipcode=form_json['business_zipcode'],
                business_category=form_json['business_category'],
                business_description=form_json['business_description'],
                business_owner=session['user_id']
            )
        except ValueError as e:
            abort(422, e.args[0])

        db.session.add(new_business)
        db.session.commit()

        response_dict = new_business.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
api.add_resource(Businesses, '/businesses')

class BusinessById(Resource):
    
    def get(self, id):
        business = Business.query.filter_by(id=id).first()
        if not business:
            raise NotFound
        business_dict = business.to_dict(rules=('reviews', '-reviews.business', '-reviews.user'))
        response = make_response(
            business_dict,
            200
        )
        return response
    
    def patch(self, id):
        business = Business.query.filter_by(id=id).first()
        if not business:
            raise NotFound

        for attr in request.form:
            setattr(business, attr, request.form[attr])

        business.ongoing = bool(request.form['ongoing'])
        business.budget = int(request.form['budget'])

        db.session.add(business)
        db.session.commit()

        production_dict = business.to_dict()
        
        response = make_response(
            production_dict,
            200
        )
        return response


api.add_resource(BusinessById, '/businesses/<int:id>')

class Reviews(Resource):

    def get(self):
        reviews = [r.to_dict(rules=('-business', 'business_id')) for r in Review.query.all()]
        return make_response(jsonify(reviews), 200)
    
    def post(self):
        data = request.get_json()
        new_review = Review(user_id=session['user_id'], business_id=data['business_id'], rating=data['rating'], review=data['review'])
        db.session.add(new_review)
        db.session.commit()
        return make_response({'message': 'Review added successfully!'}, 201)

api.add_resource(Reviews, '/reviews')


class ReviewsById(Resource):
    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound
        review_dict = review.to_dict()
        response = make_response(
            review_dict, 200)
        return response
    
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound
        elif session['user_id'] != review.user_id:
            abort(401, "Unauthorized")
        data = request.get_json()
        review.rating = data['rating']
        review.comment = data['comment']
        db.session.commit()
        return make_response({'message': 'Review updated successfully!'}, 200)
    
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            raise NotFound
        elif session['user_id'] != Review.user_id:
            abort(401, "Unauthorized")
        db.session.delete(review)
        db.session.commit()

        response = make_response('Review deleted', 204)      
        return response  
api.add_resource(ReviewsById, '/reviews/<int:id>')

class SignUp(Resource):
    def post(self):
        form_json = request.get_json()
        try:
            new_user = User(
                fname=form_json['fname'],
                lname=form_json['lname'],
                type=form_json['type'],
                email=form_json['email'],
                password=form_json['password']
            )
        except ValueError as e:
            abort(422, e.args[0])

        db.session.add(new_user)
        db.session.commit()

        session['user_id'] = new_user.id

        response_dict = new_user.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
api.add_resource(SignUp, '/signup')

class Login(Resource):

    def post(self):
        check_user = User.query.filter(User.email == request.get_json()['email']).first()

        if check_user and check_user.authenticate(request.get_json()['password']):
            session['user_id'] = check_user.id
            return make_response(check_user.to_dict(), 200)
        return {'error': 'Unauthorized'}, 401

api.add_resource(Login, '/login')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            response = make_response(
                user.to_dict(),
                200
            )
            return response
        except:
            abort(401, "Unauthorized")

api.add_resource(AuthorizedSession, '/authorized')

class Logout(Resource):
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
api.add_resource(Logout, '/logout')

@app.errorhandler(NotFound)
def handle_not_found(e):
    response = make_response(
        "Not Found: Sorry the resource you are looking for does not exist",
        404
    )

    return response

if __name__ == '__main__':
    app.run(port=5555, debug=True)
