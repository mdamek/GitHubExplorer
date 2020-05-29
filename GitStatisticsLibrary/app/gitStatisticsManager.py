import git
import json
import os, shutil, stat
from datetime import datetime
from os import path
from pydriller import RepositoryMining

class GitStatistics:
    def __init__(self, commitsTotalNumber, allCommits):
        self.commitsTotalNumber = commitsTotalNumber
        self.allCommits = allCommits

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class Commit:
    def __init__(self, author, date, hash):
        self.author = author
        self.date = date
        self.hash = hash

def on_rm_error( func, path, exc_info):
        os.chmod( path, stat.S_IWRITE )
        os.unlink( path )

def getGitStatistics(gitRepositoryPath, startDate, endDate):

    if startDate is not None:
        validStartDate = datetime.strptime(startDate, '%Y-%m-%d')
    else:
        validStartDate = None
    if endDate is not None:
        validEndDate = datetime.strptime(endDate, '%Y-%m-%d')
    else:
        validEndDate = None

    pathToTemporaryRepository = "./temporaryRepository"
    
    if path.exists(pathToTemporaryRepository):
        shutil.rmtree( pathToTemporaryRepository, onerror = on_rm_error )
    git.Repo.clone_from(gitRepositoryPath, pathToTemporaryRepository)
    allCommits = []
    for commit in RepositoryMining(pathToTemporaryRepository, since=validStartDate, to=validEndDate).traverse_commits():
        allCommits.append(Commit(commit.author.name, str(commit.committer_date), commit.hash))
        
    commitsTotalNumber = len(allCommits)
    if commitsTotalNumber is 0:
        shutil.rmtree( pathToTemporaryRepository, onerror = on_rm_error )
        return GitStatistics(0, 0, 0, 0, [])

    shutil.rmtree( pathToTemporaryRepository, onerror = on_rm_error )

    return GitStatistics(commitsTotalNumber, allCommits)          
    

