#Install
***
## Vagrant install

```sh
vagrant up
```
You can check the script provision.sh to see the list of install packages.

***
##Create app.js
```sh
var app      = require('express')();
    pleiades = require(__dirname + '/index.js');

var settings = {
    orm: "mysql://user:password@localhost/database",
    objectsFolder: __dirname + '/objects',
    exposeObjects: {
        active: true,
        path: '/objects/all'
    },
    importableObjects: {
        active: true,
        path: '/objects/import'
    }
};

pleiades(app, settings, function() {
    app.listen(3000);
});
```
***
## Start the app

```sh
vagrant ssh
cd /vagrant
nodemon app.js
```

***
## Enjoy

now you can check all the object type at http://10.10.10.160:3000/objects/all