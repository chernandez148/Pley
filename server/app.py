#!/usr/bin/env python3

# Standard library imports
import os

from flask import Flask, jsonify, make_response
from flask_migrate import Migrate
from flask_restful import Api, Resource

# Local imports
from config import app, db, api  # import app, db, and api from config.py
from models import User

# Users go here!
class Users(Resource):
    
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
api.add_resource(Users, '/users')

if __name__ == '__main__':
    app.run(port=5555, debug=True)
