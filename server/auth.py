import jwt
from functools import wraps
from flask import abort, current_app, request,Blueprint
from flask_cors import cross_origin

from users import get_user_by_name
from models.User import is_correct_password

auth = Blueprint('auth', __name__,url_prefix="/api/v1/user")

class AuthError(Exception):
    def __init__(self, level, required,
                 message="Required clearance level not met."):
        self.required = required
        self.level = level
        self.message = message

        super().__init__(self.message)


def check_auth(level=["admin","author"]):
    def dec_repeat(func):
        @wraps(func)
        def inner(*args, **kwargs):
            try:
                token = request.headers['x-auth-token'] if 'x-auth-token' in request.headers else None
                if token:
                    userdata = jwt.decode(token, current_app.config.get(
                        "SECRET_KEY"), algorithms="HS256")
                    print({"level":level,"role":userdata['role'],"passes":userdata['role']in level})
                    if(userdata["role"] not in level):
                        raise AuthError(userdata['role'], level)
                    kwargs['userdata']=userdata
                else:
                    raise jwt.InvalidSignatureError
            except jwt.InvalidSignatureError:
                print("Error decoding jwt.")
                abort(401)
            except AuthError:
                print("Auth error for user.")
                abort(403)
            return func(*args,**kwargs)
        return inner
    return dec_repeat




@auth.route('/login', methods=['POST'])
@cross_origin()
def route_user_login():
    username = request.json['username']
    password = request.json['password']

    user = get_user_by_name(username)
    if not user:
        return "User not found", 404    
    if is_correct_password(user['password'], password):
        return jwt.encode({"user":user['name'],"_id":str(user["_id"]),"role":user['role']}, current_app.config.get("SECRET_KEY"), algorithm="HS256")
    else:
        return "Invalid password", 401


def router_user_register():
    pass
