#!/usr/bin/env python3
from app import app
from models import db, User, Review, Business

with app.app_context():

    print('Deleting existing data...')
    User.query.delete()
    Review.query.delete()
    Business.query.delete()

    print('Creating user objects...')
    user1 = User(fname='Black-Capped Chickadee', lname='Poecile Atricapillus', owner=False, email='email@email.com')
    user2 = User(fname='Grackle', lname='Quiscalus Quiscula', owner=True, email='email@email.com')
    user3 = User(fname='Common Starling', lname='Sturnus Vulgaris', owner=True, email='email@email.com')
    user4 = User(fname='Mourning Dove', lname='Zenaida Macroura', owner=False, email='email@email.com')

    print('Creating review objects...')
    review1 = Review(rating=4, review='Great food and service!', user_id=3, business_id=10)
    review2 = Review(rating=3, review='Decent food, but service was lacking.', user_id=4, business_id=5)
    review3 = Review(rating=2, review='Disappointing experience.', user_id=1, business_id=6)
    review4 = Review(id=4, rating=2, review='Disappointing experience.', user_id=1, business_id=6)
    review5 = Review(rating=4, review='Great ambiance and menu, but service was a bit slow.', user_id=8, business_id=9)

    print('Creating restaurant objects...')
    business1 = Business(business_name='Pizza Palace', business_address='123 Main St', business_owner=2, business_category='Food & Dining')
    business1.reviews.append(review1)
    business2 = Business(business_name='Taco Town', business_address='456 Oak Ave', business_owner=2, business_category='Food & Dining')
    business2.reviews.append(review4)
    business3 = Business(business_name='Burger Barn', business_address='789 Elm St', business_owner=3, business_category='Food & Dining')
    business3.reviews.append(review5)
    business4 = Business(business_name='Sushi Spot', business_address='456 Pine St', business_owner=2, business_category='Food & Dining')
    business4.reviews.append(review2)
    business5 = Business(business_name='Pasta Place', business_address='234 Maple Ave', business_owner=3, business_category='Food & Dining')
    business5.reviews.append(review3)

    print('Adding data objects to transaction...')
    db.session.add_all([user1, user2, user3, user4, review1, review2, review3, review4, review5, business1, business2, business3, business4, business5])

    print('Committing changes to database...')
    db.session.commit()

    print('Done!')
