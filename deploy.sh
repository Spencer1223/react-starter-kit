#!/bin/bash
yarn build:uat
scp -r ./dist/* root@192.168.103.107:/home/nginx/website/web/test

