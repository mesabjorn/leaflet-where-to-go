from jsonschema import validate
from jsonschema.exceptions import ValidationError

schema = {
    "type": "object",
    "required": ["name","description","geometry"],
    "properties": {
        "name": {"type": "string", "pattern": "[a-zA-Z0-9!?#]{3,25}"},
        "description": {"type": "string", "pattern": "[a-zA-Z0-9!?#.,]{5,255}"},
        "geometry": {
            "type": "object",
            "properties": {
                "type":{"type":"string"},
                "position":{
                    "type":"object",
                    "properties": {
                        "lat":{"type":"number"},
                        "lng":{"type":"number"}
                    }
                }
            }
            }        
    },
}


def validate_happening(happening):    
    try:
        validate(instance=happening, schema=schema)
        return True
    except ValidationError as e:
        print(e)
        return False
