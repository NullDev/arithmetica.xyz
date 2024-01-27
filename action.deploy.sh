#!/bin/bash

echo Pulling from upstream ...
git pull

echo Removing old dist ...
rm -rf ./dist

echo Installing dependencies ...
npm i

echo Starting build ...
npm run build:all

echo Copying files ...
cp -r ./dist/* ../public_html

echo Deploy finished!
