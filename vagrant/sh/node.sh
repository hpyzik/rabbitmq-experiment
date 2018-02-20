#!/usr/bin/env bash

function install_node()
{
    apt-get install -y nodejs npm &&
    install_specific_nodejs_version
}

function install_specific_nodejs_version()
{
    NODE_VERSION='8.4.0'

    if [ "`node -v`" != "v$NODE_VERSION" ]; then
        npm cache clean -f &&
        npm install -g n &&
        n $NODE_VERSION &&

        ln -sf /usr/local/n/versions/node/$NODE_VERSION/bin/node /usr/bin/node &&
        ln -sf /usr/local/n/versions/node/$NODE_VERSION/bin/npm /usr/bin/npm
    else
        echo "Node version $NODE_VERSION already installed";
    fi;
}
