# README

## Overview

Simple application consuming Github REST API(https://developer.github.com/v3).
Docker has been used to simplify spinning it up.

## Quick and simple start with Docker

### Requirements

* Docker Engine

### Run

    git clone <repo_url>
    cd codes/
    source run.sh

## Manual

### Run

    git clone <repo_url>
    cd codes/codes
    yarn install
    yarn serve

### Build

    yarn build

## Testing

    cd codes/codes
    yarn test:unit

## Serve vue app on node http server

### Build and move vue files onto the server

    cd node
    source ui_build.sh

## Run node

    cd node
    yarn start

## Docker

### Build Docker image

    cd codes
    docker build -t codes-node<version> .
