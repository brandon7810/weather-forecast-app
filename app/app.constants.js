(function () {

    'use strict';

    angular.module('weatherForecastApp.constants', [])
        .constant('AppConstants', AppConstants());

    function AppConstants() {

        let appConstants = {};

        appConstants.openWeatherMapAPIKey = "8caa3a62ba1f3b52d931888f38d1bc75";

        return appConstants;
    }
})();