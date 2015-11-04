'use strict';

/**
 * @ngdoc function
 * @name elliotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elliotApp
 */
angular.module('elliotApp')
  .controller('MainCtrl', ['CytoscapeService', function (cytoscape) {

    var elements = [];
    for (var element = 0; element < 10; element++) {
      elements.push({
        group: 'nodes',
        data: {
          id: element,
        }
      });
    }

    cytoscape({
      container: document.getElementById('graph'),
      elements: elements
    });
  }]);
