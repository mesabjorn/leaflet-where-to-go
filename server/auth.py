from functools import wraps
from flask import abort, current_app, request,Blueprint
from flask_cors import cross_origin
import jwt

auth = Blueprint('auth', __name__,url_prefix="/api/v1/user")

class UserRoles:
    ADMIN = 0
    AUTHOR = 1
    USER = 2

ROLES = UserRoles()

users = {
    "bjorn":
    {
        "role": ROLES.ADMIN
    },
    "thijs":
    {
        "role":ROLES.USER
    },
    "micha":
    {
        "role":ROLES.USER
    }
}



class AuthError(Exception):
    def __init__(self, level, required,
                 message="Required clearance level not met."):
        self.required = required
        self.level = level
        self.message = message

        super().__init__(self.message)


def check_auth(level=ROLES.ADMIN):
    def dec_repeat(func):
        @wraps(func)
        def inner(*args, **kwargs):
            try:
                token = request.headers['x-auth-token'] if 'x-auth-token' in request.headers else None
                if token:
                    userdata = jwt.decode(token, current_app.config.get(
                        "SECRET_KEY"), algorithms="HS256")
                    if(int(userdata["role"]) > level):
                        raise AuthError(userdata['role'], level)
                else:
                    raise jwt.InvalidSignatureError
            except jwt.InvalidSignatureError:
                print("Error decoding jwt.")
                abort(401)
            except AuthError:
                print("Auth error for user.")
                abort(403)
            return func(userdata)
        return inner
    return dec_repeat



@auth.route('/login', methods=['POST'])
@cross_origin()
def route_user_login():
    user = request.json['username']
    password = request.json['password']

    if user in users.keys():
        if password == current_app.config.get(f"{user.upper()}_PW"):
            return jwt.encode({"user": user, "role": users[user]["role"]}, current_app.config.get("SECRET_KEY"), algorithm="HS256")
        else:
            return "Invalid password", 401

    return "User not found", 404

def router_user_register():
    pass
