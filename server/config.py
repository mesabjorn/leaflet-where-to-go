
import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    DEBUG = False
    DEVELOPMENT = False
    CSRF_ENABLED = True
    SECRET_KEY = os.getenv("SECRET_KEY", "this-is-the-default-key")
    MONGO_URL = os.environ['MONGO_DB']
    BJORN_PW = os.environ['BJORN_PW']
    THIJS_PW = os.environ['THIJS_PW']
    MICHA_PW = os.environ['MICHA_PW']




class ProductionConfig(Config):
    pass


class StagingConfig(Config):
    DEBUG = True


class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT = True


class TestingConfig(Config):
    TESTING = True
