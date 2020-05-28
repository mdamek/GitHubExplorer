from app import app
from .gitStatisticsManager import getGitStatistics
import json
import urllib.parse
from flask import Response, request
@app.route('/')
@app.route('/getRepositoryStatistics')
def index():
    gitEncodedAddress = request.args.get('gitRepositoryAddress')
    startDate = request.args.get('startDate')
    endDate = request.args.get('endDate')
    response = Response(response=getGitStatistics(gitEncodedAddress, startDate, endDate).toJSON(),
                    status=200,
                    mimetype="application/json")
    return response