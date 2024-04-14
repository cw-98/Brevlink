from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI()
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your-jwt-secret-key'

    db.init_app(app)  # Initialize it with the Flask app
    jwt = JWTManager(app)
    
    with app.app_context():
        from . import routes
        db.create_all()  # Optionally create tables
        return app

    # Your route imports should come after the db initialization
    
