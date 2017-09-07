(function () {

    'use strict';

    // Declare app level module which depends on views, and components
    angular.module('weatherForecastApp', [
        'ngRoute',
        'ngResource',
        'weatherForecastApp.constants',
        'weatherForecastApp.routes',
        'weatherForecastApp.components',
        'weatherForecastApp.services'
    ]);
})();