#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run doc:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
echo 'fe.azhubaby.com' > CNAME

git init
git config user.name 'johan'
git config user.email 't511069160@qq.com'
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f https://${GITHUB_TOKEN}@github.com/johanazhu/johanazhu.github.io.git master
# git push origin master:gh-pages

cd -