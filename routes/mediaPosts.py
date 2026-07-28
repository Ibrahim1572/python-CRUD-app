from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from flask_jwt_extended import jwt_required, get_jwt

routes = Blueprint('routes', __name__)
mongo = dbConfig()

# view all posts route
@routes.route('/viewAll', methods=['GET'])
@jwt_required()
def viewAll():
    token = get_jwt()
    posts = list(mongo.posts.find({'isDeleted':False}))
    return jsonify({'posts':posts}), 200


# view one post route
@routes.route('/viewOne', methods=['GET'])
@jwt_required()
def viewOne():
    data = request.get_json()
    token = get_jwt()
    posts = list(mongo.posts.find({'isDeleted':False, 'postTitle':data['postTitle']}))
    if(posts):
        posts = posts[0]
        return jsonify({'post':posts}), 200
    else:
        return jsonify({'message':'post not found'})
        
        
    