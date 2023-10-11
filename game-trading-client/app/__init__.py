from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

# 1. Instantiate the Flask app
app = Flask(__name__)

# 2. Configure the app
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'

# 3. Instantiate SQLAlchemy with the app
db = SQLAlchemy(app)

# 4. Instantiate LoginManager with the app
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# 5. Instantiate Migrate with the app and SQLAlchemy
migrate = Migrate(app, db)

from app import routes
