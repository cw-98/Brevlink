from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from .config import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
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
    
