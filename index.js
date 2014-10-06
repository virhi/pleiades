var bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    async            = require('async'),
    _                = require('underscore'),
    orm              = require('orm'),
    ormHelper        = require('./bin/ormHelper.js'),
    fs               = require('fs'),
    services         = require('./bin/services.js')
    objects          = [],
    objectsHelper    = require('./bin/objectsHelper.js'),
    pluginsHelper    = require('./bin/pluginsHelper.js');

module.exports = function(app, settings, callbackPleiades) {
  app.use(bodyParser.json());
  app.use(expressValidator());

  // Check settings
  if(typeof(settings.objectsFolder) != 'undefined') {
    // Get objects
    objectsHelper.getObjects(settings.objectsFolder, objects, function() {
      app.pleiades = {
        objects: _.indexBy(objects, 'name'),
        settings: settings,
      };
      // Use ORM to run services
      app.use(orm.express(settings.orm, {
        define: function (db, models, next) {
          // Init models for each objects
          ormHelper.define(app, db, models, next);
        }
      }));

      // Prepare objects
      services.configure(app, objects, function(app) {
        // run services
        services.run(function() {
          // Run enabled plugins
          pluginsHelper.init(app, function() {
            callbackPleiades();
          });
        });
      });
    });
  }
  else {
    console.log('Error : No objects folder defined.');
  }
}
