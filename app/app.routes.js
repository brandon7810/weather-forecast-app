(function () {
    'use strict';

    angular.module('weatherForecastApp.routes', [])
        .config(config);

    config.$inject = ['$routeProvider'];
    function config($routeProvider){

        $routeProvider.when('/index', {
            template  : "<main></main>"
        });

        $routeProvider.otherwise({redirectTo: '/index'});
    }
})();