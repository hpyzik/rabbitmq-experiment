#!/usr/bin/env bash

function install_rabbitmq()
{
    apt-get install -y rabbitmq-server &&
    install_rabbitmq_management_plugin
}
function install_rabbitmq_management_plugin()
{
    rabbitmq-plugins enable rabbitmq_management
}
