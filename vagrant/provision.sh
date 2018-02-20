#!/usr/bin/env bash

. /vagrant/vagrant/sh/setup.sh
. /vagrant/vagrant/sh/node.sh
. /vagrant/vagrant/sh/rabbitmq.sh

install_setup &&
install_node &&
install_rabbitmq
