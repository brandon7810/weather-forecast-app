(function () {

    'use strict';

    angular.module('weatherForecastApp.main')
        .directive('main', main);

    function main(){
        return {
            restrict        : 'E',
            templateUrl     : 'components/main/main.html',
            controller      : 'MainCtrl',
            scope           : {},
            controllerAs    : 'Main'
        };
    }
})();