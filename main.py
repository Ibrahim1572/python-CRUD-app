from flask import Flask, jsonify
from utility.dbConnection import dbConfig
from routes.user import routes
import asyncio
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from routes.user import routes as user_routes
from routes.mediaPosts import routes as mediaposts_routes
from flask_cors import CORS

load_dotenv()
app = Flask(__name__)
app.register_blueprint(user_routes)
app.register_blueprint(mediaposts_routes)
secretKey = os.getenv('JWT_SECRET_KEY')
# print('secret key:', type(secretKey))
app.config['JWT_SECRET_KEY'] = secretKey
app.config['JWT_COOKIE_HTTPONLY'] = True
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

cors = CORS(app, origins='*')

jwt = JWTManager(app)

@app.route('/')
async def home():
    mongo = dbConfig()
    print('user: ', list(mongo.cx['test']['users'].find({'userName':'asdf'})))
    print('user: ', type(list(mongo.cx['test']['users'].find({'userName':'asdf'}))))
    print(type(mongo))

    return jsonify({'message': 'this is message from flask home func yes'})


if __name__ == "__main__":
    app.run(debug=True)
