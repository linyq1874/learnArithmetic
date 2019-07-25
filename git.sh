git add .
read -p "input git commit message:" a
git commit -m ${a}
git pull
git push