from app import app
from .gitStatisticsManager import getGitStatistics
import json
from flask import Response
@app.route('/')
@app.route('/getRepositoryStatistics')
def index():
    response = Response(response=getGitStatistics("https://github.com/supermamon/Reposi3.git").toJSON(),
                    status=200,
                    mimetype="application/json")
    return response