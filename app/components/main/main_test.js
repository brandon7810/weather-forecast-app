(function(){

    'use strict';

    describe('weatherForecastApp.main module', function() {

        beforeEach(module('ngResource'));
        beforeEach(module('weatherForecastApp.constants'));
        beforeEach(module('weatherForecastApp.main'));
        beforeEach(module('weatherForecastApp.services'));

        let OpenWeatherMap, openWeatherUrl, openWeatherRequestHandler,
            $httpBackend, AppConstants;

        beforeEach(inject(function($injector) {

            OpenWeatherMap  = $injector.get('OpenWeatherMap');
            $httpBackend    = $injector.get('$httpBackend');
            AppConstants    = $injector.get('AppConstants');

            openWeatherUrl  = /http:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast\?q=(.+)&APPID=(.+)&units=(.+)/;

            openWeatherRequestHandler = $httpBackend.when('GET', openWeatherUrl)
                .respond(function(method, url){

                    let params = matchParams(url.split('?')[1]);
                    return [200, params];
                });
        }));

        it('should have main controller', inject(function($controller) {

            let mainCtrl = $controller('MainCtrl');
            expect(mainCtrl).toBeDefined();
        }));

        it('should have OpenWeatherMap service', inject(function() {

            expect(OpenWeatherMap).toBeDefined();
        }));

        it('should have defined values', inject(function($controller) {

            let mainCtrl = $controller('MainCtrl');
            expect(mainCtrl.displayedCity).toBeDefined();
            expect(mainCtrl.city).toBeDefined();
            expect(mainCtrl.countryCode).toBeDefined();
            expect(mainCtrl.units).toBeDefined();
            expect(mainCtrl.isLoading).toBeDefined();
            expect(mainCtrl.errorOccurred).toBeDefined();
        }));

        it('should have expected values from initial successful request to Open Weather', inject(function($controller) {

            let mainCtrl = $controller('MainCtrl');

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).not.toBe(null);
        }));

        it('should have expected values from initial failed request to Open Weather', inject(function($controller) {

            openWeatherRequestHandler.respond(503, 'Server Down.');

            let mainCtrl = $controller('MainCtrl');

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(true);
            expect(mainCtrl.weatherData).toBe(null);
        }));

        it('should have expected values from successful request to Open Weather', inject(function($controller) {

            let mainCtrl = $controller('MainCtrl');
            $httpBackend.flush();

            mainCtrl.weatherData = null;

            let city = {
                name        : 'Vancouver, Canada',
                city        : 'Vancouver',
                countryCode : 'CA'
            };

            mainCtrl.loadWeatherForecast(city);

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).not.toBe(null);
        }));

        it('should have expected values from failed request to Open Weather', inject(function($controller) {

            let mainCtrl = $controller('MainCtrl');
            $httpBackend.flush();

            mainCtrl.weatherData = null;

            let city = {
                name        : 'Bad City, Bad Country',
                city        : 'Bad City',
                countryCode : 'XX'
            };

            mainCtrl.loadWeatherForecast(city);

            openWeatherRequestHandler.respond(400, 'Invalid City.');

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(true);
            expect(mainCtrl.weatherData).toBe(null);
        }));
    });

    function matchParams(query) {
        let match;
        let params = {};

        // replace addition symbol with a space
        let pl = /\+/g;

        // delimit params
        let search = /([^&=]+)=?([^&]*)/g;


        let decode = function (s) {
            return decodeURIComponent(s.replace(pl, " "));
        };

        while (match = search.exec(query))
            params[decode(match[1])] = decode(match[2]);

        return params;
    }
})();