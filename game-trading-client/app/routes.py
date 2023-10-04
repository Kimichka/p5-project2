from flask import jsonify, request
from app import app, db
from .models import Game, User

# CRUD for Game Model
@app.route('/games', methods=['POST'])
def create_game():
    game = Game(title=request.json['title'])
    db.session.add(game)
    db.session.commit()
    return jsonify(game.id), 201

@app.route('/games', methods=['GET'])
def get_games():
    games = Game.query.all()
    return jsonify([game.title for game in games])

@app.route('/games/<int:id>', methods=['GET'])
def get_game(id):
    game = Game.query.get_or_404(id)
    return jsonify(game.title)

@app.route('/games/<int:id>', methods=['PUT'])
def update_game(id):
    game = Game.query.get_or_404(id)
    game.title = request.json['title']
    db.session.commit()
    return jsonify(game.title)

@app.route('/games/<int:id>', methods=['DELETE'])
def delete_game(id):
    game = Game.query.get_or_404(id)
    db.session.delete(game)
    db.session.commit()
    return '', 204

# User Registration & Login
@app.route('/register', methods=['POST'])
def register():
    user = User(username=request.json['username'])
    user.set_password(request.json['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(user.id), 201

@app.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(username=request.json['username']).first()
    if user and user.check_password(request.json['password']):
        return jsonify(success=True)
    return jsonify(success=False), 401

# Error Handling 
@app.errorhandler(404)
def not_found(e):
    return jsonify(error=str(e)), 404
