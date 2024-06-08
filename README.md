# Brevklink - URL Shortener

Brevklink is a URL shortener service built with modern web technologies. It provides an efficient way to shorten long URLs, manage them through a user-friendly interface.

## Features

- **URL Shortening:** Quickly convert long URLs into manageable short links.
- **User Management:** Secure user registration, login, and management.
- **Security:** Enhanced security measures such as JWT authentication.
- **High Performance:** Optimized for high volume requests with minimal latency.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Flask
- **Database:** MySQL
- **Authentication:** JWT with cookies

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:

- Node.js
- Python 3.x
- Docker

### Installing

A step-by-step series of examples that tell you how to get a development environment running.

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/brevklink.git
   ```
2. **Set up the environment**
    ```
    # Access to docker folder
    cd brevlink/docker
    # Activate the virtual environment
    docker-compose up -d
    ```
    This will set up and run the MySQL database, backend server, and frontend. Wait a few seconds for the server to launch.
3. **Access the Application**

    Open your browser and visit http://localhost:5000 to view the   web application.

## API Endpoints
**URL Endpoints**
- `POST /api/shorten`: Shorten a URL.
- `GET /api/urls`: Retrieve all shortened URLs.
- `DELETE /api/urls/:id`: Delete a specific shortened URL.

**User Endpoints**
- `POST /api/user`: Register a new user.
- `POST /api/login`: Authenticate a user.
