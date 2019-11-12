# Rally
How to Run:

1. git clone
2. npm install in directory
3. expo start

WORKFLOW

delete your personal and remote branches
1. git branch -a        command lists all of the branches
2. git branch -d "your branch name"    deletes local branches
3. git push origin --delete "your remote branch name"    deletes remote branches

create a new branch that branches off of origin/master
1. git checkout -b "your branch name" origin

committing new files
1. git commit -a -m "commit message/description"
2. git push -u origin "your branch name"

opening pull requests
1. click on your branch in the github
2. see the "pull request button under "clone or download"
3. open pull request on Github, check for merge conflicts
4. if no merge conflicts, merge with master through github

make sure to pull from master early and often
1. git checkout -b origin
2. git pull

if master and your branch have conflicts (i.e) master is ahead of branch
1. git checkout "your branch name"
2. git rebase master
