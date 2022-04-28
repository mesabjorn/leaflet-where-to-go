import datetime
import os

from flask import Flask, request, send_from_directory
from flask_cors import CORS, cross_origin
from jsonschema.exceptions import ValidationError

from happenings import get_happenings, get_happening, add_happening,update_happening,delete_happening
from auth import auth, check_auth

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

@ app.route('/v1/api/happening', methods=['POST'])
@check_auth()
def route_add_happening(*args,**kwargs):
    userdata = kwargs['userdata']
    try:        
        happening = request.json
        happening['creator'] = userdata['_id']
        happening["maxAttendees"] = int(happening['maxAttendees'])#int(happening["maxAttendees"]) if len(happening["maxAttendees"]) else 0
        happening['timestamp'] = datetime.datetime.now()

        return add_happening(happening)
        
    except ValidationError as e:
        return f"'{e.path[0]}' was invalid: {e.message}", 400
    except Exception as e:
        print(e)
        return "Invalid request", 400

@ app.route('/v1/api/happening/<_id>', methods=['PUT'])
@check_auth()
def route_update_happening(*args,**kwargs):
    userdata = kwargs['userdata']    
    try:
        _id = kwargs['_id']
        existing_happening = get_happening(_id)        
        if(existing_happening['creator']!=userdata['_id']):
            return "Unauthorized, only creators can update the event",403
        
        happening = request.json
        
        happening["maxAttendees"] = int(happening["maxAttendees"]) if len(happening["maxAttendees"]) else 0
        _id = update_happening(_id,happening)
        return _id
    except ValidationError as e:
        return f"'{e.path[0]}' was invalid: {e.message}", 400
    except Exception as e:
        print(e)    
        return "Invalid request", 400

@ app.route('/v1/api/happening/<_id>', methods=['DELETE'])
@check_auth()
def route_delete_happening(*args,**kwargs):
    userdata = kwargs['userdata']    
    try:
        _id = kwargs['_id']
        existing_happening = get_happening(_id)

        if not existing_happening:
            return "Happening not found",404
        
        if(existing_happening['creator']!=userdata['_id']):
            return "Unauthorized, only creators can update the event",403
        
        deleted = delete_happening(_id)
        if deleted:
            return existing_happening['_id']
        return "Something went wrong",403
    except ValidationError as e:
        print(e)
        if len(e.path):
            return f"'{e.path[0]}' was invalid: {e.message}", 400
        else:
            return f"{e.message}", 400

    except Exception as e:
        print(e)    
        return "Invalid request", 400

# @ app.route('/v1/api/user', methods=['POST'])
# def route_add_user():    
    