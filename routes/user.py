from flask import Flask, jsonify
from utility.dbConnection import dbConfig

app = Flask(__name__)
mongo = dbConfig()

@app.route('/signUp', methods=['GET'])
async def signUpFunc():
    