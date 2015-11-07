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
    var MAX_ELEMENTS = 10;

    // An array of maps of type {selector: String, style {}}
    function getStyle() {
      return [
        {
          selector: 'node',
          style: {
            'label': 'data(id)'
          }
        }
      ];
    }

    // See http://js.cytoscape.org/#layouts
    function getLayout() {
      return {
        name: 'breadthfirst',
        fit: true, // whether to fit the viewport to the graph
        directed: false, // whether the tree is directed downwards (or edges can point in any direction if false)
        padding: 30, // padding on fit
        circle: false, // put depths in concentric circles if true, put depths top down if false
        spacingFactor: 1.75, // positive spacing factor, larger => more space between nodes (N.B. n/a if causes overlap)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        roots: undefined, // the roots of the trees
        maximalAdjustments: 0, // how many times to try to position the nodes in a maximal way (i.e. no backtracking)
        animate: false, // whether to transition the node positions
        animationDuration: 500, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
        ready: undefined, // callback on layoutready
        stop: undefined // callback on layoutstop
      };
    }

    function getElements() {
      var elements = [];
      for (var element = 0; element < MAX_ELEMENTS; element++) {
        elements.push({
          group: 'nodes',
          data: {
            id: element,
          }
        });
      }

      for (var edge = 0; edge < MAX_ELEMENTS * 6; edge++) {
        elements.push({
          data: {
            id: edge,
            source: getRandomInt(0, 10),
            target: getRandomInt(0, 10)
          }
        });
      }
      return elements;
    }

    // min (included) max (excluded)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    cytoscape({
      container: document.getElementById('graph'),
      elements: getElements(),
      layout: getLayout(),
      style: getStyle()
    });
  }]);
