(function(){

    'use strict';

    describe('weatherForecastApp.main module', function() {

        beforeEach(module('ngResource'));
        beforeEach(module('weatherForecastApp.constants'));
        beforeEach(module('weatherForecastApp.main'));
        beforeEach(module('weatherForecastApp.services'));

        let mainCtrl, OpenWeatherMap, openWeatherUrl, openWeatherRequestHandler,
            $httpBackend, AppConstants, weatherListData, rootScope;

        beforeEach(inject(function($injector, $controller) {

            OpenWeatherMap  = $injector.get('OpenWeatherMap');
            $httpBackend    = $injector.get('$httpBackend');
            AppConstants    = $injector.get('AppConstants');
            rootScope       = $injector.get('$rootScope');

            weatherListData = [{
                "dt": 1504753200,
                "main": {
                    "temp": 11.77,
                    "temp_min": 11.77,
                    "temp_max": 11.8,
                    "pressure": 1007.93,
                    "sea_level": 1026.5,
                    "grnd_level": 1007.93,
                    "humidity": 100,
                    "temp_kf": -0.03
                },
                "weather": [{
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }],
                "clouds": {
                    "all": 32
                },
                "wind": {
                    "speed": 2.27,
                    "deg": 321.501
                },
                "rain": {
                    "3h": 0.02
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2017-09-07 03:00:00"
            }, {
                "dt": 1504764000,
                "main": {
                    "temp": 11.55,
                    "temp_min": 11.55,
                    "temp_max": 11.57,
                    "pressure": 1006.98,
                    "sea_level": 1025.68,
                    "grnd_level": 1006.98,
                    "humidity": 100,
                    "temp_kf": -0.02
                },
                "weather": [{
                    "id": 500,
                    "main": "Rain",
                    "description": "light rain",
                    "icon": "10n"
                }],
                "clouds": {
                    "all": 36
                },
                "wind": {
                    "speed": 1.77,
                    "deg": 297.5
                },
                "rain": {
                    "3h": 0.055
                },
                "sys": {
                    "pod": "n"
                },
                "dt_txt": "2017-09-07 06:00:00"
            }];

            mainCtrl = $controller('MainCtrl');

            openWeatherUrl  = /http:\/\/api\.openweathermap\.org\/data\/2\.5\/forecast\?q=(.+)&APPID=(.+)&units=(.+)/;

            openWeatherRequestHandler = $httpBackend.when('GET', openWeatherUrl)
                .respond(function(method, url){

                    let params = matchParams(url.split('?')[1]);

                    params.list = weatherListData;

                    return [200, params];
                });
        }));

        it('should have main controller', inject(function() {

            expect(mainCtrl).toBeDefined();
        }));

        it('should have OpenWeatherMap service', inject(function() {

            expect(OpenWeatherMap).toBeDefined();
        }));

        it('should have defined values', inject(function() {

            expect(mainCtrl.displayedCity).toBeDefined();
            expect(mainCtrl.city).toBeDefined();
            expect(mainCtrl.countryCode).toBeDefined();
            expect(mainCtrl.units).toBeDefined();

            expect(mainCtrl.displayedCity).not.toBe(null);
            expect(mainCtrl.city).not.toBe(null);
            expect(mainCtrl.countryCode).not.toBe(null);
            expect(mainCtrl.units).not.toBe(null);

            expect(mainCtrl.isLoading).toBeDefined();
            expect(mainCtrl.errorOccurred).toBeDefined();
        }));

        it('should have expected values from initial successful request to Open Weather', inject(function() {

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).not.toBe(null);
        }));

        it('should have expected values from initial failed request to Open Weather', inject(function() {

            openWeatherRequestHandler.respond(503, 'Server Down.');

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(true);
            expect(mainCtrl.weatherData).toBe(null);
        }));

        it('should have expected values from successful request to Open Weather', inject(function() {

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

        it('should have expected values from failed request to Open Weather', inject(function() {

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

        it('should parse data from Open Weather into weather data by date - parseWeatherData()', inject(function() {

            expect(mainCtrl.isLoading).toBe(true);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).toBe(null);

            $httpBackend.flush();

            expect(mainCtrl.isLoading).toBe(false);
            expect(mainCtrl.errorOccurred).toBe(false);
            expect(mainCtrl.weatherData).not.toBe(null);

            expect(mainCtrl.weatherData[0][0].dt).toBe(weatherListData[0].dt);
            expect(mainCtrl.weatherData[0][1].dt).toBe(weatherListData[1].dt);
        }));

        it('should properly select weather data by date and emit the event', inject(function() {

            $httpBackend.flush();

            let _weatherDetails = null;
            rootScope.$on('weather-detail-select-event', function(ev, weatherData){
                _weatherDetails = weatherData;
            });

            expect(_weatherDetails).toBe(null);

            mainCtrl.selectDateWeather(mainCtrl.weatherData[0]);

            expect(mainCtrl.selectedWeather[0].dt).toBe(weatherListData[0].dt);
            expect(_weatherDetails[0].dt).toBe(weatherListData[0].dt);
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