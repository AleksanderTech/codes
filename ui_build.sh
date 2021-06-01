#!/bin/sh

runIn() { 
    cd "$1" && eval "$2" && cd - > /dev/null
}

runIn ./codes 'yarn install'
runIn ./codes 'yarn build'
runIn . 'cp -r ./codes/dist/* node/public/'