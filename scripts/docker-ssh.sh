#!/bin/bash

CONTAINER=$2
if [[ "$CONTAINER" == "" ]]; then
    CONTAINER_NAME=$1
    if [[ "$CONTAINER_NAME" == "" ]]; then
        CONTAINER_NAME="app"
    fi;

    CONTAINER=$(docker ps | grep ${CONTAINER_NAME} | grep -Eo "^[0-9a-z]{8,}\b")
fi

docker exec -i -t $CONTAINER bash -l
