from app import app
from models import db, User

with app.app_context():

    print('Deleting existing birds...')
    User.query.delete()

    print('Creating bird objects...')
    user1 = User(fname='Chickadee', lname='Poecile', email='email@email.com')
    user2 = User(fname='Grackle', lname='Quiscula', email="email1@email.com")
    user3 = User(fname='Common', lname='Vulgaris', email="email2@email.com")
    user4 = User(fname='Dove', lname='Zenaida', email="email3@email.com")

    print('Adding bird objects to transaction...')
    db.session.add_all([user1, user2, user3, user4])

    print('Committing transaction...')
    db.session.commit()

    print('Complete.')
