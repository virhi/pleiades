#!/usr/bin/env bash

sudo apt-get update

# install git
sudo apt-get -y install git

sudo apt-get -y install nodejs

sudo apt-get -y install npm

sudo npm install -g nvm

sudo npm install -g nodemon

sudo ln -s /usr/bin/nodejs /usr/local/bin/node

# Configuring alias
cat <<EOT >/home/vagrant/.bashrc_alias
alias node='nodejs'
EOT

if [ `grep -c "source /home/vagrant/.bashrc_alias" /home/vagrant/.bashrc` -eq 0 ]
then
    echo "source /home/vagrant/.bashrc_alias" >>/home/vagrant/.bashrc
fi

## install mysql
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
sudo debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
sudo apt-get -y install mysql-server

sudo apt-get -y install mysql-client

mysql --user="root" --password="root" --database="pleiade" --execute="DROP DATABASE pleiade; CREATE DATABASE pleiade;"

cd /vagrant

sudo npm install express
sudo npm install
