git add .
read -p "input git commit message:" a
echo ${a}
git commit -m ${a}
git pull
git push