from app import db, bcrypt
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

class Game(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    console_id = db.Column(db.Integer, db.ForeignKey('platform.id'), nullable=True)  # Updated Field
    trade_details = db.relationship('TradeDetail', backref='game', lazy=True)
    comments = db.relationship('Comment', backref='game', lazy=True)

    @validates('title')
    def validate_title(self, key, title):
        if not title:
            raise AssertionError('No game title provided')
        if len(title) < 3 or len(title) > 50:
            raise AssertionError('Game title must be between 3 and 50 characters')
        return title

class User(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    _password = db.Column(db.String(120), nullable=False)
    trade_details = db.relationship('TradeDetail', backref='trader', lazy=True)
    comments = db.relationship('Comment', backref='author', lazy=True)
    favorites = db.relationship('Favorite', backref='user', lazy=True)

    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute.')

    @password.setter
    def password(self, password):
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.check_password_hash(self._password, password)

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise AssertionError('No username provided')
        if len(username) < 4 or len(username) > 50:
            raise AssertionError('Username must be between 4 and 50 characters')
        return username

class TradeDetail(db.Model, SerializerMixin):
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'), primary_key=True)
    user = db.relationship(User, back_populates="trade_details")
    game = db.relationship(Game, back_populates="trade_details")

class Comment(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Favorite(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.Integer, db.ForeignKey('game.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Platform(db.Model, SerializerMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    games = db.relationship('Game', backref='console', lazy=True)  
    
    @validates('name')
    def validate_name(self, key, name):
        if not name:
            raise AssertionError('No platform name provided')
        if len(name) < 2 or len(name) > 50:
            raise AssertionError('Platform name must be between 2 and 50 characters')
        return name
