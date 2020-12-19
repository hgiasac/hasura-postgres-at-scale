#! /bin/bash

git clone https://github.com/zalando/patroni.git
cd patroni
docker build -t patroni .
