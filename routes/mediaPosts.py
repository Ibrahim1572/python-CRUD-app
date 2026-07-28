from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from flask_jwt_extended import jwt_required, get_jwt
from datetime import datetime, timedelta

routes = Blueprint('routes', __name__)
mongo = dbConfig()

# view all posts route
@routes.route('/viewAll', methods=['GET'])
@jwt_required()
def viewAll():
    isDeleted = request.args.get('isDeleted', False)
    posts = list(mongo.posts.find({'isDeleted':isDeleted}))
    return jsonify({'posts':posts}), 200


# view one post route
@routes.route('/viewOne', methods=['GET'])
@jwt_required()
def viewOne():
    data = request.get_json()
    posts = list(mongo.posts.find({'isDeleted':False, 'postTitle':data['postTitle']}))
    if(posts):
        posts = posts[0]
        return jsonify({'post':posts}), 200
    else:
        return jsonify({'message':'post not found'})
    
   
# add post route 
@routes.route('/addPost', methods=['POST'])
@jwt_required()
def addPost():
    token = get_jwt()
    
    data = request.get_json()
    userData = data['userData']
    
    newPost = {
        'postTitle': userData['postTitle'],
        'postBody': userData['postBody'],
        'postedBy': token['sub'],
        'createdAt': datetime.now(),
        'updatedLog':[],
        'isDeleted': False,
        'deleteDate': datetime.now()
    }    
    
     
    