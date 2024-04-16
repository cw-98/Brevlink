from flask import request, jsonify, abort, redirect
from flask import current_app as app
from flask_jwt_extended import create_access_token, get_jwt, jwt_required
from sqlalchemy.exc import IntegrityError

import random
import string
from datetime import timedelta, datetime

from . import db
from .models.url import Url
from .models.user import User

@app.route('/api/user', methods=['POST'])
def create_user():
    # Extract user data from the request
    data = request.json
    email, password = data.get('email'), data.get('password')
    first_name, last_name = data.get('first_name'), data.get('last_name')
    
    if not all([email, password, first_name, last_name]):
        abort(400, description="All fields [email, password, first_name, last_name] are required.")

    # Check if the email already exists
    if User.query.filter_by(email=email).first() is not None:
        abort(400, description="A user with that email already exists.")

    # Create new User instance
    new_user: User = User(email=email, first_name=first_name, last_name=last_name)
    new_user.password = password
    
    try:
        # Add the new user to the database
        db.session.add(new_user)
        db.session.commit()
        access_token = generate_token(email, new_user)
        # Return success response
        return jsonify({'message': 'User created successfully.', 
                        'user': new_user.to_dict(),
                        'access_token': access_token}), 201
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
    user: User = User.query.filter_by(email=email).first()

    # Check if user exists and the password is correct
    if user and user.check_password(password):
        access_token = generate_token(email, user)
        return jsonify({"message": "Login successful", 
                        "user": user.to_dict(), 
                        "access_token": access_token}), 200
    else:
        # Invalid credentials
        return jsonify({"error": "Invalid email or password"}), 401
    
def generate_token(email, user: User):
    additional_claims = {
        "id": user.id,
        "first_name": user.first_name,
        "last_name": user.last_name
    }
    access_token = create_access_token(identity=email, 
                                           additional_claims = additional_claims, 
                                           expires_delta = timedelta(days=1))
    return access_token
    
def generate_shortened_id(length=6):
    """Generate a random string of fixed length."""
    return ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(length))

@app.route('/api/shorten', methods=['POST'])
@jwt_required(optional=True)
def shorten_url():
    original_url = request.json.get('original_url')
    if not original_url: return jsonify({"error": "Missing original_url"}), 400

    while True:
        shortened_path = generate_shortened_id()
        if not Url.query.filter_by(shortened_id=shortened_path).first():
            break
    
    user_id = None
    jwt_payload = get_jwt()
    user_id = jwt_payload.get('id') if jwt_payload else None
    print(user_id)
    
    new_url = Url(original_url=original_url,
                  shortened_id= shortened_path,
                  user_id = user_id,
                  create_date = datetime.now())
    db.session.add(new_url)
    db.session.commit()

    full_shortened_url = request.host_url + shortened_path

    return jsonify({"shortened_id": full_shortened_url}), 201


@app.route('/<shortened_path>')
def redirect_shortened_url(shortened_path):
    url_entry = Url.query.filter_by(shortened_id=shortened_path).first()
    
    if url_entry is not None: return redirect(url_entry.original_url)
    else: abort(404)


@app.route('/api/urls', methods=['GET'])
@jwt_required()
def get_urls():
    # Get the user_id from the JWT claims
    user_id = get_jwt().get('id')
    
    # Query the database for URLs associated with the user_id
    urls = Url.query.filter_by(user_id=user_id).all()
    response_data = [
            {
                "id": url.id,
                "original_url": url.original_url,
                "shortened_id": url.shortened_id,
                "create_date": url.create_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            for url in urls
        ]
    
    return jsonify(response_data), 200

@app.route('/api/urls/<int:url_id>', methods=['DELETE'])
@jwt_required()
def delete_url(url_id):
    current_user_id = get_jwt().get('id')

    url_to_delete = Url.query.filter_by(id=url_id, user_id=current_user_id).first()

    if url_to_delete:
        db.session.delete(url_to_delete)
        db.session.commit()
        return jsonify({'message': 'URL deleted successfully'}), 200
    else:
        return jsonify({'message': 'URL not found or not authorized to delete'}), 404