#!/bin/sh
gulp
cd moneytrack.github.io
git add *
git commit -m "Update prod files"
git push
cd ..