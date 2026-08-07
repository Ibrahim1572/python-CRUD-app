from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from flask_jwt_extended import jwt_required, get_jwt
from datetime import datetime, timedelta
from pymongo import ReturnDocument
import asyncio
import pymongo.asynchronous


routes = Blueprint('mediaposts', __name__)
mongo = dbConfig()

# view all/archived posts route
@routes.route('/viewAll', methods=['GET'])
@jwt_required()
def viewAll():
    isDeleted = request.args.get('isDeleted', 'false').lower()
    isDeleted = True if isDeleted == 'true' else False
    
    posts = list(mongo.posts.find({'isDeleted':isDeleted}).limit(20).sort('createdAt', -1))
    
    for post in posts:
        post['_id'] = str(post['_id'])
        
    return jsonify({'posts':posts}), 200


# view one post route
@routes.route('/viewOne', methods=['POST'])
@jwt_required()
def viewOne():
    data = request.get_json()
    posts = list(mongo.posts.find({'isDeleted':False, 'postTitle':data['postTitle']}))
    if(posts):
        for post in posts:
            post['_id'] = str(post['_id'])
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
    dbPost = mongo.posts.find_one({'postTitle':postData['postTitle']})
    if(dbPost):
        return jsonify({'message':'post title already taken'})
    
    newPost = {
        'postTitle': postData['postTitle'],
        'postBody': postData['postBody'],
        'postedBy': token['sub'],
        'createdAt': datetime.now(),
        'updatedLog':[],
        'isDeleted': False,
        'userName': token['userName']
    }   
    
    postedPost = mongo.posts.insert_one(newPost) 
    newPost['_id'] = str(postedPost.inserted_id)
    
    return jsonify({'message':'post added', 'post': newPost, 'toastMessage':'Post Added'}), 200
    
    
     
# update post route
@routes.route('/updatePost', methods=['PATCH'])
@jwt_required()
def updatePost():
    token = get_jwt()
    data = request.get_json()
    oldPostData = data['oldPostData']
    newPostData = data['newPostData']
    updatedFields = {}
    
    
    dbPost = mongo.posts.find_one({'postTitle':oldPostData['postTitle'], 'isDeleted':False, 'postedBy':token['sub']})
    if(not dbPost):
        return jsonify({'message':'post not found'}), 404
    nativePostId = dbPost['_id']
    dbPost['_id'] = str(dbPost['_id'])
    #rest of the update post logic 
    if(not(('postTitle' in newPostData) or ('postBody' in newPostData))):
        return jsonify({'message':'no field to update'}), 400
    
    if(('postTitle' in newPostData)and(newPostData['postTitle'])):
        if(oldPostData['postTitle']==newPostData['postTitle']):
            return jsonify({'message':'new post title and old post title is same'}), 400 
        newDbPost = mongo.posts.find_one({'postTitle':newPostData['postTitle'], 'isDeleted':False, 'postedBy':token['sub']})
        if(newDbPost):
            return jsonify({'message':'post with same title already exists'}), 400
        # newDbPost['_id'] = str(newDbPost['_id'])
        updatedFields['postTitle'] = newPostData['postTitle']
    
    if(('postBody' in newPostData)and(newPostData['postBody'])):
        if(oldPostData['postBody']==newPostData['postBody']):
            return jsonify({'message':'new post body and old post body is same'}), 400 
        updatedFields['postBody'] = newPostData['postBody']
        
    newPost = mongo.posts.find_one_and_update({'_id':nativePostId}, {'$set':updatedFields, '$push':{'updatedLog':datetime.now()}}, return_document=ReturnDocument.AFTER)    
    newPost['_id'] = str(newPost['_id'])
    return jsonify({'message':'post updated', 'oldPost':dbPost, 'newPost':newPost}), 200
    
# delete and restore post route
@routes.route('/deleteRestorePost', methods=["PATCH"])
@jwt_required()
def deleteRestorePost():
    token = get_jwt()
    data = request.get_json()
    postData = data['postData']
    isDeleted = request.args.get('isDeleted', 'false').lower()
    isDeleted = True if isDeleted == 'true' else False
    
    dbPost =mongo.posts.find_one({'postTitle':postData['postTitle'], 'isDeleted':isDeleted})
    # for post in dbPost:
    #     post['_id'] = str(post['_id'])
    # dbPost = dbPost[0]
    # print('this is dbpost',dbPost)
    
    if(not dbPost):
        return jsonify({'message':'post not found'})
    # dbPost['_id'] = str(dbPost['_id'])
    print('checked if post exists')
    
    if(not isDeleted):
        if(dbPost['postedBy']!=token['sub']):
            return jsonify({'message':'user is unauthorized to perform this action (you can only update your own post)'})
    
    post = mongo.posts.find_one_and_update({'postTitle':postData['postTitle'], 'isDeleted':isDeleted}, {'$set':{'isDeleted':not isDeleted}})
    post['_id'] = str(post['_id'])
    
    return jsonify({'message': f"post {('restored'if isDeleted else'deleted')}", 'post': post}), 200
    
    