from flask import Flask, jsonify
from utility.dbConnection import dbConfig
from routes.user import routes
import asyncio
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

load_dotenv()
app = Flask(__name__)
app.register_blueprint(routes)
secretKey = os.getenv('JWT_SECRET_KEY')
# print('secret key:', type(secretKey))
app.config['JWT_SECRET_KEY'] = secretKey
app.config['JWT_COOKIE_HTTPONLY'] = True
app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.config['JWT_TOKEN_LOCATION'] = ['cookies']

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
