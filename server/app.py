import datetime
import os

from flask import Flask,  request, send_from_directory
from flask_cors import CORS, cross_origin

from happenings import get_happenings, get_happening, add_happening
from auth import auth,check_auth

from users import add_user,UserExistsError

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)

env_config = os.getenv("APP_SETTINGS", "config.DevelopmentConfig")
app.config.from_object(env_config)

app.register_blueprint(auth)

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

from jsonschema.exceptions import ValidationError


@ app.route('/v1/api/happening', methods=['POST'])
@check_auth()
def route_add_happening(userdata):    
    try:        
        happening = request.json
        happening['creator']=userdata['user']
        happening["maxAttendees"] = int(happening["maxAttendees"]) if len(happening["maxAttendees"]) else 0
        happening['timestamp'] = datetime.datetime.now()

        _id = add_happening(happening)
        return f"Happening added with id: {_id}"
    except ValidationError as e:
        return f"'{e.path[0]}' was invalid: {e.message}", 400
    except Exception as e:        
        return "Invalid request", 400



@ app.route('/v1/api/user', methods=['POST'])
def route_add_user():    
    """ Registers a new user """
    try:
        print(request.json)
        user={"name":request.json["name"],"password":request.json["password"]}
        _id = add_user(user)
        return f"User added with id: {_id}"
    except ValidationError as e:
        print(e)
        return f"'{e.path[0]}' was invalid: {e.message}", 400
    except UserExistsError as e:
        print(e)
        return e.message,400
    except Exception as e:
        print(e)
        return "Invalid request", 400