'use strict';

/**
 * @ngdoc function
 * @name elliotApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the elliotApp
 */
angular.module('elliotApp')
  .controller('MainCtrl', ['CytoscapeService', '$scope', function (cytoscape, $scope) {
    var MAX_ELEMENTS = 10;

    var voltageSystems = [
        {
          lineToLine: 480,
          lineToNeutral: 277,
          phase: 3,
          wires: 4,
          polesFromSupply: 3,
          neutral: true
        },
        {
          lineToLine: 208,
          lineToNeutral: 120,
          phase: 3,
          wires: 4,
          polesFromSupply: 3,
          neutral: true
        },
        {
          lineToLine: 480,
          lineToNeutral: 277,
          phase: 3,
          wires: 3,
          polesFromSupply: 3,
          neutral: false
        },
        {
          lineToLine: 208,
          lineToNeutral: 120,
          phase: 1,
          wires: 3,
          polesFromSupply: 2,
          neutral: true
        }
    ];

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

    function getPanelId(elementNumber) {
      return 'panel-' + elementNumber;
    }

    function getRandomVoltageSystem() {
      return voltageSystems[getRandomInt(0,4)];
    }

    function getRandomBusRating() {
      return getRandomInt(1,7) + '00A';
    }

    function getRandomMainCb() {
      return getRandomInt(1,7) + '00A';
    }

    function getRandomPoles() {
      return getRandomInt(30,99);
    }

    function getElements() {
      var elements = [];
      for (var element = 0; element < MAX_ELEMENTS; element++) {
        elements.push({
          group: 'nodes',
          data: {
            id: getPanelId(element),
            voltageSystem: getRandomVoltageSystem(),
            busRating: getRandomBusRating(),
            mainCb: getRandomMainCb(),
            poles: getRandomPoles()
          }
        });
      }

      for (var edge = 0; edge < MAX_ELEMENTS * 6; edge++) {
        elements.push({
          data: {
            id: edge,
            source: getPanelId(getRandomInt(0, 10)),
            target: getPanelId(getRandomInt(0, 10))
          }
        });
      }
      return elements;
    }

    // min (included) max (excluded)
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    var graph = cytoscape({
      container: document.getElementById('graph'),
      elements: getElements(),
      layout: getLayout(),
      style: getStyle()
    });

    // @TODO This is ugly - is there a better way to do this in Angular?
    graph.on('click', function(e) {
      var node = e.cyTarget;
      $scope.$apply(function() {
        var activeElementData = node.data();
        $scope.activeElementData = JSON.stringify(activeElementData, null, '  ');
        $scope.activeElement = node;
      });
    });
  }]);
