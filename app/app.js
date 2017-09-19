(function () {

    'use strict';

    angular.module('weatherForecastApp', [
        'ngRoute',
        'ngResource',
        'weatherForecastApp.constants',
        'weatherForecastApp.routes',
        'weatherForecastApp.components',
        'weatherForecastApp.services'
    ]);
})();