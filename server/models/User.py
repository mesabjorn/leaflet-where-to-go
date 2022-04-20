from jsonschema import validate
from jsonschema.exceptions import ValidationError
import bcrypt


schema = {
    "type": "object",
    "required": ["name","password"],
    "properties": {
        "name": {"type": "string", "pattern": "[a-zA-Z0-9!?#]","minLength":3,"maxLength":24},
        "password": {"type": "string", "pattern": "[a-zA-Z0-9!$*@?#.,]","minLength":6,"maxLength":255},
    }
}

def hash_new_password(password: str)->bytes:
    return bcrypt.hashpw(bytes(password,encoding='utf-8'),bcrypt.gensalt())

def is_correct_password(hashed:str, password: str) -> bool:
    return bcrypt.checkpw(bytes(password,"utf-8"), hashed)

def validate_user(user):
    try:
        return validate(instance=user, schema=schema)
    except ValidationError as e:
        raise(e)




      
