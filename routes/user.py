from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from datetime import datetime

routes = Blueprint('routes', __name__)
mongo = dbConfig()

@routes.route('/signup', methods=['POST'])
def signUpFunc():
    data = request.get_json()
    userEmail = data.get('email')
    dbUser = list(mongo.users.find({'email':data.get('email')}))
    print('dbUser: ', dbUser)
    
    if(dbUser):
        return jsonify({'message':'user already exists with this email'}), 201
    
    newUser = {
        'userName' : data.get('userName'),
        'password' : data.get('password'),
        'email' : data.get('email'),
        'role' : data.get('role'),
        'createdAt' :  datetime.now()
    }  
    result = mongo.users.insert_one(newUser)
    
    return jsonify({'message':'new user added'}), 201

@routes.route('/signin', methods=['POST'])
async def signIn():
    data = request.get_json()
    dbUser = mongo.db.users.find({'email':data.get('email')})
    
    print('user1: ', dbUser)
    print('user2: ', list(dbUser))
    print('user3: ', list(dbUser)[0])
    
    return jsonify({'message':'htis is signin route'})