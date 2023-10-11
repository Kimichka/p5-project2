#!/usr/bin/env python3

# Standard library imports
from werkzeug.security import generate_password_hash, check_password_hash

# Remote library imports
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# Configure Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy and Migrate
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

# Define the Game model
class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(500), nullable=True)

# Initializing the API
api = Api(app)

# Configure CORS
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "allow_headers": ["Content-Type", "Authorization"]}})

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        # Check if the user already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return jsonify({'message': 'Username already exists.'}), 400
        # Hash the password and save to the database
        hashed_password = generate_password_hash(password, method='sha256')
        new_user = User(username=username, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'Registration successful'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            return jsonify({'authenticated': True})
        else:
            return jsonify({'authenticated': False, 'message': 'Invalid credentials'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/games', methods=['GET', 'POST', 'OPTIONS'])
def games():
    if request.method == 'OPTIONS':  
        resp = app.make_default_options_response()
        headers = None
        headers = resp.headers
        headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        headers['Access-Control-Max-Age'] = '3600'
        return resp
    if request.method == 'GET':
        games = Game.query.all()
        output = []
        for game in games:
            game_data = {'id': game.id, 'title': game.title, 'description': game.description}
            output.append(game_data)
        return jsonify({'games': output})

    if request.method == 'POST':
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        if not title:
            return jsonify({'error': 'Title is required'}), 400
        new_game = Game(title=title, description=description)
        db.session.add(new_game)
        db.session.commit()
        return jsonify({'message': 'Game added', 'game': {'id': new_game.id, 'title': new_game.title, 'description': new_game.description}})

@app.route('/games/<int:game_id>', methods=['DELETE'])
def delete_game(game_id):
    game = Game.query.get_or_404(game_id)
    db.session.delete(game)
    db.session.commit()
    return jsonify({'message': 'Game deleted successfully'}), 204

if __name__ == '__main__':
    app.run(port=5555, debug=True)
