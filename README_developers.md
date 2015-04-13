# Hydrogen Framework: developers' guide

[![Build Status](https://travis-ci.org/raul-arrieta/hydrogen-framework.svg?branch=master)](https://travis-ci.org/raul-arrieta/hydrogen-framework)

## Requirements for development

### Install Git

    sudo apt-get update
    sudo apt-get install git

### NodeJS

    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install python-software-properties python g++ make nodejs
    
### Grunt

    sudo npm install -g grunt
    sudo npm install -g grunt-cli
    
### Http server for serving local files

    npm install http-server -g
    
### Clone repository

    git clone https://github.com/jmescuderojustel/hydrogen-framework
    
### Install dependencies
    
Go to folder and run:
    
    bower install
    npm install
    
## Run it

Application runs on **http://localhost:8282/index.html** for viewing the sample and help development. For that, just run:

    grunt
    
If you want to generate the final files to distribute or use in your projects, run the following and pick files from **dist** folder:

    grunt distrib