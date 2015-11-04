'use strict';

describe('Service: CytoscapeService', function () {

  // load the service's module
  beforeEach(module('elliotApp'));

  // instantiate service
  var CytoscapeService;
  beforeEach(inject(function (_CytoscapeService_) {
    CytoscapeService = _CytoscapeService_;
  }));

  it('should do something', function () {
    expect(!!CytoscapeService).toBe(true);
  });

});
