import os
import pymongo
from flask import jsonify
from bson.objectid import ObjectId

from models.Happening import validate_happening as validate

collection = 'playground'
DATABASE_URL = os.environ['MONGO_DB']  # get connection url from environment
# establish connection with database
client = pymongo.MongoClient(DATABASE_URL)
mongo_db = client[collection]  # assign database to mongo_db


def get_happening(_id):
    result = mongo_db.happenings.find_one({'_id': ObjectId(_id)})
    print(result)
    if(result):
        result['_id'] = str(result['_id'])
        return result
    else:
        return f"No course found with id: '{_id}'."


def get_happenings():
    result = []
    for r in mongo_db.happenings.find():
        r['_id'] = str(r['_id'])
        result.append(r)
    return jsonify(result)


def add_happening(happening):    
    validate(happening)        
    result = mongo_db.happenings.insert_one(happening)        
    return jsonify(str(result.inserted_id))

def update_happening(_id,happening):    
    validate(happening)
    result = mongo_db.happenings.find_one_and_update({
        '_id': ObjectId(_id)},
        {'$set': happening}
        )    
    return jsonify(str(result['_id']))
 
        
