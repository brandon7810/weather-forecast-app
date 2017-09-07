(function () {

    'use strict';

    angular.module('weatherForecastApp.weatherDetails')
        .directive('weatherDetails', weatherDetails);

    function weatherDetails(){
        return {
            restrict        : 'E',
            templateUrl     : 'components/weather-details/weather-details.html',
            controller      : 'WeatherDetailsCtrl',
            scope           : {},
            controllerAs    : 'WeatherDetails',
            bindToController: {
                weatherDetailsData : '@weatherDetailsData'
            }
        };
    }
})();