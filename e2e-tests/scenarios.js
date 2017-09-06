'use strict';

describe('weatherForecastApp', function() {

  it('should automatically redirect to /index when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/index");
  });


  describe('index', function() {

    beforeEach(function() {
      browser.get('index.html#/index');
    });

    it('should render index when user navigates to /index', function() {
      expect(element.all(by.css('[ng-view] h1')).first().getText()).
        toMatch(/Weather Forecast App/);
    });
  });
});
