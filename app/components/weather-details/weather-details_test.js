(function(){

    'use strict';

    describe('weatherForecastApp.weatherDetails module', function() {

        beforeEach(module('weatherForecastApp.weatherDetails'));
        beforeEach(module('weatherForecastApp.constants'));

        let weatherListData, scope, weatherDetailsCtrl, rootScope;

        beforeEach(inject(function($injector, $controller) {

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
                    "temp": 9.55,
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

            scope       = $injector.get('$rootScope').$new(true);

            let data = {
                weatherDetailsData : weatherListData
            };

            weatherDetailsCtrl = $controller('WeatherDetailsCtrl', {$scope : scope}, data);
        }));

        it('should have weatherCard controller', inject(function() {

            expect(weatherDetailsCtrl).toBeDefined();
        }));

        it('should have defined values', inject(function(moment){

            expect(weatherDetailsCtrl.weatherDetails).toBeDefined();
            expect(weatherDetailsCtrl.date).toBeDefined();
            expect(weatherDetailsCtrl.selectedTimeWeather).toBeDefined();

            expect(weatherDetailsCtrl.weatherDetails[0].dt_txt).toBe(weatherListData[0].dt_txt);
            expect(+weatherDetailsCtrl.date).toBe(+moment(weatherListData[0].dt_txt));
            expect(weatherDetailsCtrl.selectedTimeWeather).toBe(weatherListData[0]);
        }));

        it('should have the correct weather when weather detail select event emit', inject(function(moment){

            weatherDetailsCtrl.weatherDetails       = null;
            weatherDetailsCtrl.date                 = null;
            weatherDetailsCtrl.selectedTimeWeather  = null;

            rootScope.$emit('weather-detail-select-event', weatherListData);

            expect(weatherDetailsCtrl.weatherDetails[0].dt_txt).toBe(weatherListData[0].dt_txt);
            expect(+weatherDetailsCtrl.date).toBe(+moment(weatherListData[0].dt_txt));
            expect(weatherDetailsCtrl.selectedTimeWeather).toBe(weatherListData[0]);
        }));

        it('should have the correct weather icon path', inject(function(){

            let path = weatherDetailsCtrl.getWeatherIconPath();

            expect(path).toBe('assets/img/rain-d.png');
        }));

        it('should select the correct weather', inject(function(){

            weatherDetailsCtrl.selectedTimeWeather = null;
            weatherDetailsCtrl.selectTimeWeather(weatherListData[0]);
            expect(weatherDetailsCtrl.selectedTimeWeather.dt).toBe(weatherListData[0].dt);
        }));
    });
})();