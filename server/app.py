import jwt
import datetime
import os

# from playground_crud import delete_course, get_course_by_id, add_course_to_database, update_course, get_courses
from flask import Flask,  abort, request, send_from_directory
from flask_cors import CORS, cross_origin

from happenings import get_happenings, get_happening


app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)

env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
app.config.from_object(env_config)


@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')



@ app.route('/v1/api/happenings', methods=['GET'])
@ cross_origin()
def route_get_happenings():
    return get_happenings()


@ app.route('/v1/api/happening/<_id>', methods=['GET'])
def route_get_happening(_id):
    return get_happening(_id)


