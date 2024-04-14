from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from .. import db

class User(db.Model):
    __tablename__ = 'user'  # Explicitly specify the table name if it's not the class name

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    _password = db.Column("password", db.String(255), nullable=False)  # Store the hashed password
    first_name = db.Column(db.String(255), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    create_date = db.Column(db.DateTime, default=datetime.now())
    urls = db.relationship('Url', backref='user', lazy=True)

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self._password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self._password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name
        }