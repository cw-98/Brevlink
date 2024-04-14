from flask import request, jsonify, abort, url_for, redirect
from flask import current_app as app
from .models.user import User
from . import db
from .models.url import URL
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import create_access_token
from datetime import timedelta
import random
import string

@app.route('/api/user', methods=['POST'])
def create_user():
    # Extract user data from the request
    data = request.json
    email, password = data.get('email'), data.get('password')
    first_name, last_name = data.get('first_name'), data.get('last_name')
    
    # Validate the data
    if not all([email, password, first_name, last_name]):
        abort(400, description="All fields [email, password, first_name, last_name] are required.")

    # Check if the email already exists
    if User.query.filter_by(email=email).first() is not None:
        abort(400, description="A user with that email already exists.")

    # Create new User instance
    new_user = User(email=email, first_name=first_name, last_name=last_name)
    new_user.password = password
    
    try:
        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        
        # Return success response
        return jsonify({'message': 'User created successfully.', 'user': new_user.to_dict()}), 201
    except IntegrityError:
        # If there is an issue with the database transaction, roll back
        db.session.rollback()
        abort(500, description="An error occurred while creating the user.")

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    
    email, password = data.get('email'), data.get('password')
    if not email or not password:
        return jsonify({"error": "Missing email or password"}), 400

    # Query the user by email
    user = User.query.filter_by(email=email).first()

    # Check if user exists and the password is correct
    if user and user.check_password(password):
        # Login success
        additional_claims = {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
        access_token = create_access_token(identity=email, 
                                           additional_claims = additional_claims, 
                                           expires_delta = timedelta(days=1))
        return jsonify({"message": "Login successful", 
                        "user": user.to_dict(), 
                        "access_token": access_token}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid email or password"}), 401
    
def generate_shortened_id(length=6):
    """Generate a random string of fixed length."""
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

@app.route('/api/shorten', methods=['POST'])
def shorten_url():
    data = request.json
    original_url = data.get('original_url')
    if not original_url:
        return jsonify({"error": "Missing original_url"}), 400

    # Generate unique shortened URL path
    while True:
        shortened_path = generate_shortened_id()
        if not URL.query.filter_by(shortened_id=shortened_path).first():
            break
    
    new_url = URL(original_url=original_url, shortened_id= shortened_path)
    db.session.add(new_url)
    db.session.commit()

    full_shortened_url = request.host_url + shortened_path

    return jsonify({"shortened_id": full_shortened_url}), 201


@app.route('/<shortened_path>')  # Dynamic route to handle shortened URLs
def redirect_shortened_url(shortened_path):
    # Query the database for the original URL using the shortened_path
    url_entry = URL.query.filter_by(shortened_id=shortened_path).first()
    
    if url_entry is not None:
        # Redirect to the original URL
        return redirect(url_entry.original_url)
    else:
        # If the shortened_path does not exist, return a 404 error
        abort(404)