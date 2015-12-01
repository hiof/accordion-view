# Hiof accordion view package

## About

A package with the required files for the it-services views.

## Copyright

This project is distributed under a GNU General Public License v3 - Take a look at the COPYING file for details.

## Install

Install [Git](http://git-scm.com) if it's not already installed on your computer. Then run (this will download this project to the folder the shell has open):

```
$ git clone https://github.com/hiof/accordion-view.git
```

Install [io.js](https://iojs.org) (or [Node.js](http://nodejs.org)) if it's not already installed on your computer. Then run (this will install the project dependencies):

```
$ sudo npm install -g grunt-cli
$ npm install
$ bower install
```

## Build

`$ grunt build`: Compiles and builds the accordion view package for www
`$ grunt build2`: Compiles and builds the accordion view package for www2

## Deploy

1. Rename secret-template.json to secret.json and add your credentials.
2. Deploy and test your code
    1. The staging server for www `$ grunt deploy-staging`
    2. The staging server for www2 `$ grunt deploy-staging2`
3. Deploy to production
    1. Deploy to www `$ grunt deploy-prod`
    2. Deploy to www2 `$ grunt deploy-prod2`

## Releases

- v1.1.0 - Make the project server agnostic
- v1.0.0 - Initial accordion view

[Github releases](https://github.com/hiof/accordion-view/releases)

### Roadmap


