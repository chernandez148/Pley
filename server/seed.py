#!/usr/bin/env python3
from app import app
from models import db, User, Review, Business
from faker import Faker
fake = Faker()

with app.app_context():

    print('Deleting existing data...')
    User.query.delete()
    Review.query.delete()
    Business.query.delete()

    # Generate fake users
    for i in range(10):
        user = User(
            fname=fake.first_name(),
            lname=fake.last_name(),
            type='User' if i % 2 == 0 else 'Business',
            email=fake.email(),
            password=fake.password()
        )
        db.session.add(user)

    # Generate fake businesses
    for i in range(5):
        business = Business(
            business_name=fake.company(),
            business_number=fake.phone_number(),
            business_address=fake.address(),
            business_city=fake.city(),
            business_state=fake.state(),
            business_zipcode=fake.zipcode(),
            business_category=fake.random_element(elements=('Food & Dining', 'Automotive', 'Retailer', 'Computers & Electronics', 'Entertainment', 'Health & Medicine', 'Education', 'Home & Garden', 'Legal & Financial', 'Manufacturing, Wholesale, Distribution', 'Personal Care & Services', 'Real Estate', 'Travel & Transportation', 'Other')),
            business_description=fake.text(),
            business_owner=fake.random_int(min=1, max=10)
        )
        db.session.add(business)

    # Generate fake reviews
    for i in range(20):
        review = Review(
            review=fake.text(),
            rating=fake.random_int(min=1, max=5),
            business_id=fake.random_int(min=1, max=5),
            user_id=fake.random_int(min=1, max=10)
        )
        db.session.add(review)

# Commit the changes to the database
    db.session.commit()

print('Done!')
