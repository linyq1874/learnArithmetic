git add .
read -p "input git commit message: " message
git commit -m ${message}
git pull
git push