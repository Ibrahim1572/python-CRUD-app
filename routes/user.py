from flask import Flask, jsonify, request, Blueprint
from utility.dbConnection import dbConfig
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies
from flask_jwt_extended import get_jwt, jwt_required, unset_jwt_cookies
routes = Blueprint('auth', __name__)
mongo = dbConfig()



# signup route

@routes.route('/signup', methods=['POST'])
def signUpFunc():
    data = request.get_json()
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




# signin route

@routes.route('/signin', methods=['POST'])
async def signIn():
    data = request.get_json()
    
    dbUser = list(mongo.users.find({'email':data.get('email')}))    
    
    if(dbUser):
        dbUser = dbUser[0]
            
        cookieData = {'userName':dbUser['userName'], 'role': dbUser['role']}
        dbUSerPassword = dbUser['password']
        
        if(data['password']==dbUSerPassword):
            dbRefreshToken = mongo.refreshTokens.update_many(filter={'userEmail':dbUser['email']}, update={'$set':{'isValid':False}})

            refresh_token = create_refresh_token(identity=dbUser['email'], additional_claims=cookieData)
            access_token = create_access_token(identity=dbUser['email'], additional_claims=cookieData)
            
            resp = jsonify({'message':'user logged in'})
            
            set_refresh_cookies(resp, refresh_token, max_age=7*24*60*60)
            set_access_cookies(resp, access_token, max_age=15*60)
            
            inserted_refresh_token = mongo.refreshTokens.insert_one({'isValid':True, 'token':refresh_token, 'userEmail':data.get('email'), 'createdAt':datetime.now(), 'expiresAt':datetime.now()+timedelta(days=7)})
            
            return resp, 200

        else:
            return jsonify({'message':'wrong password'})
    else:
        return jsonify({'message':'no User found'}) ,200
    


    
# logout route
@routes.route('/logout', methods=['GET'])
@jwt_required()
def signOut():
    response = jsonify({'message': 'user logged out'})
    unset_jwt_cookies(response)
    return response, 200



# Get profile data route
@routes.route('/profile', methods=['GET'])
@jwt_required()
def getProfile():
    token = get_jwt()
    
    return jsonify({'email':token['sub'], 'userName':token['userName'], 'role':token['role']})