#!/usr/bin/env python3
from app import app
from models import db, User, Review, Restaurant, Owner

with app.app_context():

    print('Deleting existing data...')
    User.query.delete()
    Review.query.delete()
    Restaurant.query.delete()
    Owner.query.delete()

    print('Creating user objects...')
    user1 = User(fname='Black-Capped Chickadee', lname='Poecile Atricapillus', email='email@email.com')
    user2 = User(fname='Grackle', lname='Quiscalus Quiscula', email='email@email.com')
    user3 = User(fname='Common Starling', lname='Sturnus Vulgaris', email='email@email.com')
    user4 = User(fname='Mourning Dove', lname='Zenaida Macroura', email='email@email.com')

    print('Creating review objects...')
    review1 = Review(rating=4, review='Great food and service!', user_id=3, restaurant_id=10)
    review2 = Review(rating=3, review='Decent food, but service was lacking.', user_id=4, restaurant_id=5)
    review3 = Review(rating=2, review='Disappointing experience.', user_id=1, restaurant_id=6)
    review4 = Review(id=4, rating=2, review='Disappointing experience.', user_id=1, restaurant_id=6)
    review5 = Review(rating=4, review='Great ambiance and menu, but service was a bit slow.', user_id=8, restaurant_id=9)

    print('Creating restaurant objects...')
    restaurant1 = Restaurant(name='Pizza Palace', address='123 Main St', owner_id=1)
    restaurant2 = Restaurant(name='Taco Town', address='456 Oak Ave', owner_id=2)
    restaurant3 = Restaurant(name='Burger Barn', address='789 Elm St', owner_id=3)
    restaurant4 = Restaurant(name='Sushi Spot', address='456 Pine St', owner_id=2)
    restaurant5 = Restaurant(name='Pasta Place', address='234 Maple Ave', owner_id=4)

    print('Creating ownser objects...')
    owner1 = Owner(fname='John', lname='Doe', email='john.doe@example.com')
    owner2 = Owner(fname='Jane', lname='Doe', email='jane.doe@example.com')
    owner3 = Owner(fname='Bob', lname='Smith', email='bob.smith@example.com')
    owner4 = Owner(fname='Alice', lname='Johnson', email='alice.johnson@example.com')
    owner5 = Owner(fname='Michael', lname='Lee', email='michael.lee@example.com')



    print('Adding data objects to transaction...')
    db.session.add_all([owner1, owner2, owner3, owner4, owner5])
    db.session.add_all([restaurant1, restaurant2, restaurant3, restaurant4, restaurant5])
    db.session.add_all([review1, review2, review3, review4, review5])
    db.session.add_all([user1, user2, user3, user4])


    print('Committing transaction...')
    db.session.commit()

    print('Complete.')