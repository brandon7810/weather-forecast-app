(function () {

    'use strict';

    angular.module('weatherForecastApp.weatherCard')
        .directive('weatherCard', weatherCard);

    function weatherCard(){
        return {
            restrict        : 'E',
            templateUrl     : 'components/weather-card/weather-card.html',
            controller      : 'WeatherCardCtrl',
            scope           : {},
            controllerAs    : 'WeatherCard',
            bindToController: {
                weatherDetailsData : '@weatherDetailsData'
            }
        };
    }
})();