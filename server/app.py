import jwt
import datetime
import os

from flask import Flask,  abort, request, send_from_directory
from flask_cors import CORS, cross_origin

from happenings import get_happenings, get_happening, add_happening


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


@ app.route('/v1/api/happening', methods=['POST'])
def route_add_happening(*args, **kwargs):
    # print(dir(request))
    print("Received post request for happening!")
    # print(request.headers)
    print(request.json)
    try:
        happening = {'name': '', 'description': '',
                     'options': 0, "geometry": [], "maxAttendees": 0}

        for k in happening.keys():
            happening[k] = request.json[k]

        happening["attendees"] = 0
        happening["maxAttendees"] = int(happening["maxAttendees"])
        happening['timestamp'] = datetime.datetime.now()

        _id = add_happening(happening)
        return f"Happening added with id: {_id}"
    except Exception as e:
        print(e)
        return "Invalid request", 400
