import logging
from flask import jsonify, request
from app import app, db, bcrypt
from .models import Game, User, Comment, Favorite, Platform
from flask_login import login_user, current_user, logout_user
from app import login_manager
from sqlalchemy.exc import IntegrityError

# Enable debug
logging.basicConfig(level=logging.DEBUG)

# CRUD for Game
@app.route('/games', methods=['POST'])
def create_game():
    title = request.json['title']
    image_url = request.json.get('image_url', None)
    description = request.json.get('description', None)
    console_name = request.json.get('console', None)
    platform = Platform.query.filter_by(name=console_name).first()
    if not platform:
        return jsonify(error="Invalid platform name."), 400

    game = Game(title=title, image_url=image_url, description=description, console_id=platform.id)
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

# CRUD for Comments
@app.route('/games/<int:game_id>/comments', methods=['POST'])
def create_comment(game_id):
    content = request.json['content']
    author_id = current_user.id

    comment = Comment(content=content, game_id=game_id, author_id=author_id)
    db.session.add(comment)
    db.session.commit()

    return jsonify(comment.id), 201

@app.route('/games/<int:game_id>/comments', methods=['GET'])
def get_comments(game_id):
    comments = Comment.query.filter_by(game_id=game_id).all()
    return jsonify([{'id': comment.id, 'content': comment.content, 'author_id': comment.author_id} for comment in comments])

@app.route('/games/<int:game_id>/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(game_id, comment_id):
    comment = Comment.query.get_or_404(comment_id)
    if comment.game_id != game_id:
        return jsonify(error="Comment does not belong to this game."), 400

    db.session.delete(comment)
    db.session.commit()
    return '', 204

# Favorites
@app.route('/games/<int:game_id>/favorite', methods=['POST'])
def add_favorite(game_id):
    if not current_user.is_authenticated:
        return jsonify(success=False, message="User not authenticated."), 401

    favorite = Favorite.query.filter_by(game_id=game_id, user_id=current_user.id).first()
    if not favorite:
        favorite = Favorite(game_id=game_id, user_id=current_user.id)
        db.session.add(favorite)
        db.session.commit()

    return jsonify(success=True)

@app.route('/games/<int:game_id>/favorite', methods=['DELETE'])
def remove_favorite(game_id):
    if not current_user.is_authenticated:
        return jsonify(success=False, message="User not authenticated."), 401

    favorite = Favorite.query.filter_by(game_id=game_id, user_id=current_user.id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()

    return jsonify(success=True)

# For User Registration & Login
@app.route('/register', methods=['POST'])
def register():
    username = request.json['username']
    password = request.json['password']
    password_confirmation = request.json.get('password_confirmation')
    
    if not username or not password:
        return jsonify(message="Username and password required."), 400
    if password != password_confirmation:
        return jsonify(message="Passwords do not match."), 400

    user = User.query.filter_by(username=username).first()

    if user:
        return jsonify(message="Username already exists."), 400

    new_user = User(username=username)
    new_user.password = bcrypt.generate_password_hash(password).decode('utf-8')

    db.session.add(new_user)
    
    try:
        db.session.commit()
        return jsonify(message="User created successfully."), 201
    except IntegrityError as e:
        db.session.rollback()  
        return jsonify(message="Username already exists."), 400
    except Exception as e:
        return jsonify(message="Registration failed. Try again."), 500

@app.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return jsonify(success=True)

    username = request.json['username']
    password = request.json['password']

    user = User.query.filter_by(username=username).first()

    if user and user.verify_password(password): 
        login_user(user)
        return jsonify(success=True)

    return jsonify(success=False, message="Invalid username or password."), 401

@app.route('/logout')
def logout():
    logout_user()
    return jsonify(success=True)

@app.errorhandler(404)
def not_found(e):
    return jsonify(error=str(e)), 404

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# seed function
def seed_default_user():
    default_user = User.query.filter_by(username="testuser").first()

    if not default_user:
        user = User(username="testuser")
        user.password = bcrypt.generate_password_hash("testpassword").decode('utf-8')
        db.session.add(user)
        db.session.commit()
        print("Default user added.")
    else:
        print("Default user already exists.")

