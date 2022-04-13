from jsonschema import validate
from jsonschema.exceptions import ValidationError

schema = {
    "type": "object",
    "required": ["name","description","lat","lng"],
    "properties": {
        "name": {"type": "string", "pattern": "[a-zA-Z0-9!?#]","minLength":3,"maxLength":25},
        "description": {"type": "string", "pattern": "[a-zA-Z0-9!?#.,]","minLength":5,"maxLength":255},
        "geomtype": {"type":"string","description":"type of marker (point,polygon etc)"},
        "lat": {"type": "number","minimum":-90,"maximum":90},
        "lng": {"type": "number","minimum":-180,"maximum":180},
        "options": {"type": "array","maxItems":3},
        "maxAttendees": {"type": "number","minimum":0}
    }
}


def validate_happening(happening):    
    try:
        return validate(instance=happening, schema=schema)
        # return True
    except ValidationError as e:
        raise(e)        
