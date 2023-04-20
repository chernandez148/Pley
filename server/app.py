#!/usr/bin/env python3

# Standard library imports

# Remote library imports
import os

from flask import Flask, jsonify, make_response, request, session, abort
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.exceptions import NotFound, Unauthorized
import ipdb


# Local imports
from models import db, User, Business

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# Methods go here!

class Users(Resource):
    pass

class Businesses(Resource):
    
    def get(self):
        business = [b.to_dict() for b in Business.query.all()]
        return make_response(jsonify(business), 200)
    
    def post(self):
        form_json = request.get_json()
        try:
            new_business = Business(
                business_name=form_json['business_name'],
                business_address=form_json['business_address'],
                business_city=form_json['business_city'],
                business_state=form_json['business_state'],
                business_zipcode=form_json['business_zipcode'],
                business_category=form_json['business_category'],
                business_description=form_json['business_description']
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

class BusinessByNames(Resource):
    
    def get(self, name):
        business = Business.query.filter(Business.business_name == name).first()
        if not business:
            raise NotFound
        business_dict = business.to_dict()
        response = make_response(
            business_dict,
            200
        )
        return response


api.add_resource(BusinessByNames, '/businesses/<string:name>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
