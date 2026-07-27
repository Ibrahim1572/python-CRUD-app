from flask import Flask, jsonify, Blueprint
from flask_pymongo import PyMongo
from pymongo import MongoClient 
import os 
from dotenv import load_dotenv

def dbConfig():

    load_dotenv()
    client = MongoClient(os.getenv('MONGO_DB_URI'))
    db = client['pyCRUD']
    print('MongoDB Connected')

    return db