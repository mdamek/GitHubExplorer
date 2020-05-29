import git
import json
import time
import os, shutil, stat
from datetime import datetime
from os import path
from pydriller import RepositoryMining

class GitStatistics:
    def __init__(self, commitsTotalNumber, allCommits, mergeCommits, time):
        self.commitsTotalNumber = commitsTotalNumber
        self.allCommits = allCommits
        self.mergeCommits = mergeCommits
        self.time = time

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class Commit:
    def __init__(self, author, date):
        self.author = author
        self.date = date

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
    
    start = time.time()
    git.Repo.clone_from(gitRepositoryPath, pathToTemporaryRepository)
    print('Repository downloaded')
    allCommits = []
    mergeCommits = 0
    for commit in RepositoryMining(pathToTemporaryRepository, since=validStartDate, to=validEndDate).traverse_commits():
        allCommits.append(Commit(commit.author.name, str(commit.committer_date))) 
        if commit.merge:
            mergeCommits += 1  
        
    commitsTotalNumber = len(allCommits)

    if commitsTotalNumber is 0:
        shutil.rmtree( pathToTemporaryRepository, onerror = on_rm_error )
        return GitStatistics(0, 0, 0, 0, [])

    shutil.rmtree( pathToTemporaryRepository, onerror = on_rm_error )

    stop = time.time() - start
    print('Commits done')
    print('In: ' + str(stop) + ' sec')

    return GitStatistics(commitsTotalNumber, allCommits, mergeCommits, round(stop,2))          
    

