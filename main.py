from flask import Flask, jsonify
from utility.dbConnection import dbConfig
import asyncio

app = Flask(__name__)

@app.route('/')
async def home():
    mongo = dbConfig()
    print('user: ', list(mongo.cx['test']['users'].find({'userName':'asdf'})))
    print('user: ', type(list(mongo.cx['test']['users'].find({'userName':'asdf'}))[0]))
    print(type(mongo))

    return jsonify({'message': 'this is message from flask home func yes'})


if __name__ == "__main__":
    app.run(debug=True)
