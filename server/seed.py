#!/usr/bin/env python3
from app import app
from models import db, User

with app.app_context():

    print('Deleting existing birds...')
    User.query.delete()

    print('Creating bird objects...')
    user1 = User(fname='Black-Capped Chickadee', lname='Poecile Atricapillus', email='email@email.com')
    user2 = User(fname='Grackle', lname='Quiscalus Quiscula', email='email@email.com')
    user3 = User(fname='Common Starling', lname='Sturnus Vulgaris', email='email@email.com')
    user4 = User(fname='Mourning Dove', lname='Zenaida Macroura', email='email@email.com')

    print('Adding bird objects to transaction...')
    db.session.add_all([user1, user2, user3, user4])

    print('Committing transaction...')
    db.session.commit()

    print('Complete.')