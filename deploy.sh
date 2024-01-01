#!/bin/bash

green='\033[0;32m'

echo -e "${green}Start building..."
npm run build
echo -e "${green}Finish building..."

git add dist -f
echo -e "${green}Dist added to git"

git commit -m 'build'
echo -e "${green}Dist committed"

git subtree push --prefix dist origin gh-pages
echo -e "${green}Dist pushed to gh-pages branch"

read -r
