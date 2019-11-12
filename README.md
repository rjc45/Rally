# Rally
How to Run:

1. git clone
2. npm install in directory
3. expo start

WORKFLOW

delete your personal and remote branches
git branch -a        command lists all of the branches
git branch -d <your branch name>     deletes local branches
git push origin --delete <your remote branch name>     deletes remote branches

create a new branch that branches off of origin/master
git checkout -b <your branch name> origin

committing new files
git commit -a -m "commit message/description"
git push origin <your branch name>

look for a pull request github link on terminal
open pull request on Github, check for merge conflicts
if no merge conflicts, merge with master through github

make sure to pull from master early and often
git checkout -b origin
git pull

if master and your branch have conflicts (i.e) master is ahead of branch
git checkout <your branch name>
git rebase master
