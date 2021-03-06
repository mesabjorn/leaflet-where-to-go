import os
import pymongo

from models.User import validate_user as validate
from models.User import hash_new_password

collection = 'playground'
DATABASE_URL = os.environ['MONGO_DB']  # get connection url from environment
# establish connection with database
client = pymongo.MongoClient(DATABASE_URL)
mongo_db = client[collection]  # assign database to mongo_db


class UserExistsError(Exception):
    def __init__(self,message="A user with this name already exists"):
        self.message=message
        super().__init__(self.message)

def add_user(user):    
    validate(user)
    existing_user = get_user_by_name(user['name'])    
    if existing_user!=None:
        raise(UserExistsError())

    
    user['password'] = hash_new_password(user["password"])
    user['role']='user'
    user['_id'] = mongo_db.users.insert_one(user)
    return user

def get_user_by_name(name):
    user = mongo_db.users.find_one({"name":name})
    # print(user)
    if(user):
        return user
               
