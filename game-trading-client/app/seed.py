#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Game 

def create_users(fake):
    """Helper function to seed user data."""
    users = []
    for _ in range(10):  
        fake_username = fake.user_name()
        fake_password = fake.password()
        
        user = User(username=fake_username, password=fake_password)  
        users.append(user)
        db.session.add(user)
    
    return users

def create_games(fake):
    """Helper function to seed game data."""
    consoles = ["PlayStation", "Xbox", "Switch", "PC"]
    for _ in range(20):  
        title = fake.company()
        description = fake.catch_phrase()
        console = rc(consoles)
        
        game = Game(title=title, description=description, console=console)
        db.session.add(game)


if __name__ == '__main__':
    fake = Faker()
    
    with app.app_context():
        print("Starting seed...")
        
        db.drop_all()   
        db.create_all() 

        create_users(fake)
        create_games(fake)

        db.session.commit()
        
        print("Seed completed!")
        