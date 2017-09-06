(function () {

    'use strict';

    angular.module('weatherForecastApp.main')
        .directive('main', main);

    function main(){
        return {
            restrict        : 'E',
            templateUrl     : 'main/main.html',
            controller      : 'MainCtrl',
            scope           : {},
            controllerAs    : 'Main'
        };
    }
})();