import os

class Config(object):
    """Base config, uses staging database server."""
    DEBUG = False
    TESTING = False
    APP_PORT = os.getenv('APP_PORT', 5050)
    DB_USER = os.getenv('DB_USER', 'user')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '123456')
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = os.getenv('DB_PORT', '3306')
    DB_NAME = os.getenv('DB_NAME', 'brev')
    FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'http://localhost:5000')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    @staticmethod
    def SQLALCHEMY_DATABASE_URI():
        return f'mysql+pymysql://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.DB_HOST}:{Config.DB_PORT}/{Config.DB_NAME}'


class ProductionConfig(Config):
    """Uses production database server."""
    SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/prod_dbname'


class DevelopmentConfig(Config):
    """Uses development database server."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/dev_dbname'


class TestingConfig(Config):
    """Uses testing database server."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'mysql://username:password@localhost/test_dbname'
