class Config(object):
    """Base config, uses staging database server."""
    DEBUG = False
    APP_PORT = 5050
    TESTING = False
    DB_USER = 'user'
    DB_PASSWORD = '123456'
    HOST = 'localhost'
    PORT = '3306'
    DB_NAME = 'brev'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    @staticmethod
    def SQLALCHEMY_DATABASE_URI():
        return f'mysql+pymysql://{Config.DB_USER}:{Config.DB_PASSWORD}@{Config.HOST}:{Config.PORT}/{Config.DB_NAME}'


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
