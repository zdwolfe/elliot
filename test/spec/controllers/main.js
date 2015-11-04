'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('elliotApp'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      'CytoscapeService': function() {}
    });
  }));

  // @TODO :)
  it('should have some tests! @TODO', function () {
    expect(true).toBe(true);
  });
});
