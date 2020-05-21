from app import app
from .gitStatisticsManager import getGitStatistics
import json

@app.route('/')
@app.route('/index')
def index():
    return getGitStatistics("https://github.com/github/auto-complete-element.git").toJSON()