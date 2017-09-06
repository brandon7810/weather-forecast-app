(function () {

    'use strict';

    angular.module('weatherForecastApp.constants', [])
        .constant("moment", moment)
        .constant('AppConstants', AppConstants());

    function AppConstants() {

        let appConstants = {};

        appConstants.openWeatherMapAPIKey = "ba91712c3b7d009a186fd42973a19af4";

        return appConstants;
    }
})();