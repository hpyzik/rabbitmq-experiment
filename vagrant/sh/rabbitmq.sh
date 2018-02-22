#!/usr/bin/env bash

function install_rabbitmq()
{
    install_erlang_sources &&
    apt-get install -y erlang &&
    install_rabbit_sources &&
    apt-get install -y rabbitmq-server &&
    install_rabbitmq_management_plugin &&
    service rabbitmq-server restart &&
    echo '127.0.0.1 rabbitmq' >> /etc/hosts
}

function install_erlang_sources()
{
    echo "deb http://packages.erlang-solutions.com/ubuntu trusty contrib" | tee -a /etc/apt/sources.list &&
    wget http://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc &&
    apt-key add erlang_solutions.asc &&
    apt-get update
}

function install_rabbit_sources
{
    echo "deb https://dl.bintray.com/rabbitmq/debian trusty main" | tee -a /etc/apt/sources.list &&
    wget https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc &&
    apt-key add rabbitmq-release-signing-key.asc &&
    apt-get update
}

function install_rabbitmq_management_plugin()
{
    rabbitmq-plugins enable rabbitmq_management &&
    echo "loopback_users = none" > /etc/rabbitmq/rabbitmq.conf
}
