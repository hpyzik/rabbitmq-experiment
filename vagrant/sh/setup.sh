#!/usr/bin/env bash

function install_setup()
{
    apt-get update &&
    apt-get install -y git zip unzip wget &&
    ulimit -n 2048 &&
    set_up_home_directory
}

function set_up_home_directory()
{
    grep "cd /vagrant" /home/ubuntu/.bashrc || echo "cd /vagrant" >> /home/ubuntu/.bashrc
}
