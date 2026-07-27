from flask import Flask, jsonify
from flask_pymongo import PyMongo
import os 
from dotenv import load_dotenv

app = Flask(__name__)
def dbConfig():

    load_dotenv()
    app.config['MONGO_URI'] = os.getenv('MONGO_DB_URI')
    mongo = PyMongo(app)
    mongo.db = mongo.cx['pyCRUD']
    print('MongoDB Connected')

    return mongo