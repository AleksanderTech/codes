#!/bin/sh

docker build -t codes-node . && docker run -p 5000:5000 -t codes-node