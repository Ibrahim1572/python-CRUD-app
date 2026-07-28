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
    postData = data['postData']
    dbPost = list(mongo.posts.find_one({'postTitle':postData['postTitle']}))
    if(not dbPost):
        return jsonify({'message':'post title already taken'})
    
    newPost = {
        'postTitle': postData['postTitle'],
        'postBody': postData['postBody'],
        'postedBy': token['sub'],
        'createdAt': datetime.now(),
        'updatedLog':[],
        'isDeleted': False
    }   
    
    postedPost = mongo.posts.insert_one({newPost}) 
    
    return jsonify({'message':'post added', 'post': newPost}), 200
    
    
     
# update post route
@routes.route('/updatePost', methods=['PATCH'])
@jwt_required()
def updatePost():
    token = get_jwt()
    data = request.get_json()
    postData = data['postData']
    
    dbPost = list(mongo.posts.find_one({'postTitle':postData['postTitle']}))
    if(not dbPost):
        return jsonify({'message':'post not found'})
    
    if(dbPost[0]['email']!=token['sub']):
        return jsonify({'message':'user is unauthorized to perform this action (you can only update your own post)'})
    
    #rest of the update post logic
    
    
# delete and restore post route
@routes.route('/deleteRestorePost', methods=["PATCH"])
@jwt_required()
def deleteRestorePost():
    token = get_jwt()
    data = request.get_json()
    postData = data['postData']
    isDeleted = request.args.get('isDeleted', False)
    
    dbPost = list(mongo.posts.find_one({'postTitle':postData['postTitle'], 'isDeleted':isDeleted}))
    
    if(not dbPost):
        return jsonify({'message':'post not found'})
    
    if(not isDeleted):
        if(dbPost[0]['email']!=token['sub']):
            return jsonify({'message':'user is unauthorized to perform this action (you can only update your own post)'})
    
    post = list(mongo.posts.update_one({'postTitle':postData['postTitle'], 'isDeleted':isDeleted}, {'$set':{'isDeleted':not isDeleted}}))
    
    return jsonify({'message': f"post {('restored'if isDeleted else'deleted')}", 'post': post}), 200
    
    