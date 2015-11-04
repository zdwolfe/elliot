'use strict';

/**
 * @ngdoc service
 * @name elliotApp.CytoscapeService
 * @description
 * # CytoscapeService
 * Service in the elliotApp.
 */
angular.module('elliotApp')
  .service('CytoscapeService', function () {
    
    /* jshint ignore:start */
    return window.cytoscape;
    /* jshint ignore:end */
  });
