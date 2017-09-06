(function () {

    'use strict';

    angular.module('weatherForecastApp.main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['OpenWeatherMap'];
    function MainCtrl(OpenWeatherMap){

        let vm              = this;

        vm.citiesList       = [
            {
                name        : 'Toronto, Canada',
                city        : 'Toronto',
                countryCode : 'CA'
            },
            {
                name        : 'Vancouver, Canada',
                city        : 'Vancouver',
                countryCode : 'CA'
            },
            {
                name        : 'Calgary, Canada',
                city        : 'Calgary',
                countryCode : 'CA'
            },
            {
                name        : 'New York, USA',
                city        : 'New York',
                countryCode : 'US'
            },
            {
                name        : 'Las Vegas, USA',
                city        : 'Las Vegas',
                countryCode : 'US'
            }
        ];

        vm.displayedCity    = '';
        vm.city             = '';
        vm.countryCode      = '';
        vm.units            = 'metric';
        vm.weatherData      = null;
        vm.isLoading        = true;
        vm.errorOccurred    = false;

        vm.loadWeatherForecast = loadWeatherForecast;

        activate();

        function activate(){

            loadWeatherForecast(vm.citiesList[0]);
        }

        function loadWeatherForecast(cityObj){

            vm.isLoading        = true;

            if(cityObj){

                vm.city             = cityObj.city;
                vm.countryCode      = cityObj.countryCode;
                vm.displayedCity    = cityObj.name;
            }

            OpenWeatherMap.getFiveDayForeCast(vm.city + ',' + vm.countryCode, vm.units).then(function(data){

                vm.weatherData      = data;
                vm.isLoading        = false;
                vm.errorOccurred    = false;

            }, function(){

                vm.isLoading        = false;
                vm.errorOccurred    = true;
            });
        }
    }
})();