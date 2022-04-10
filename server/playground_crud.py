import os
import pymongo
from flask import jsonify
from bson.objectid import ObjectId


collection = 'playground'


DATABASE_URL = os.environ['MONGO_DB']  # get connection url from environment

# establish connection with database
client = pymongo.MongoClient(DATABASE_URL)
mongo_db = client[collection]  # assign database to mongo_db


def get_course_by_id(_id):
    result = mongo_db.courses.find_one({'_id': ObjectId(_id)})
    print(result)
    if(result):
        result['_id'] = str(result['_id'])
        return jsonify(result)
    else:
        return f"No course found with id: '{_id}'."


def get_courses():
    result = []
    for r in mongo_db.courses.find():
        r['_id'] = str(r['_id'])
        result.append(r)
    return jsonify(result)

    # return jsonify(result)


def add_course_to_database(coursedata):
    result = mongo_db.courses.insert_one(coursedata)
    print(result)
    return result.inserted_id


def update_course(_id, coursedata):
    result = mongo_db.courses.find_one_and_update({'_id': ObjectId(_id)}, update={
                                                  '$set': coursedata}, projection=coursedata.keys(), return_document=True)
    if(result):
        result['_id'] = str(result['_id'])
        return jsonify(result)
    else:
        return f"No course found with id: '{_id}'."


def delete_course(_id):
    result = mongo_db.courses.delete_one({'_id': ObjectId(_id)})

    if(result.deleted_count):
        return jsonify({'_id': _id, "deleted": True})
    else:
        return f"No course found with id: '{_id}'."
