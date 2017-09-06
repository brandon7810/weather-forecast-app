(function () {

    'use strict';

    angular.module('weatherForecastApp.weatherCard')
        .controller('WeatherCardCtrl', WeatherCardCtrl);

    WeatherCardCtrl.$inject = ['moment'];
    function WeatherCardCtrl(moment) {

        let vm              = this;
        vm.weatherDetails   = angular.fromJson(vm.weatherDetailsData);

        activate();

        function activate(){
            console.log(vm.weatherDetails);
        }
    }
})();