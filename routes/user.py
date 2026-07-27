from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from datetime import datetime
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies

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
    dbUser = list(mongo.users.find({'email':data.get('email')}))
    cookieData = {'userName':data['userName'], 'email':data['email'], 'role': data['role']}
    if(dbUser):
        dbUSerPassword = dbUser[0]['password']
        if(data['password']==dbUSerPassword):
            refresh_token = create_refresh_token(identity=cookieData)
            access_token = create_access_token(identity=cookieData)
            
            resp = jsonify({'message':'user logged in'})
            
            set_refresh_cookies(resp, refresh_token)
            set_access_cookies(resp, access_token)
            
            return resp, 200

        else:
            return jsonify({'message':'wrong password'})
    else:
        return jsonify({'message':'no User found'}) ,200
    
    
    
    
    
    
    
    
    
    
    
@routes.route('/logout', methods=['GET'])
def signOut():
    #clearing cookies
    return jsonify({'message': 'user logged out'})










