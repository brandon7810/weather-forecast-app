(function () {

    'use strict';

    angular.module('weatherForecastApp.weatherDetails')
        .controller('WeatherDetailsCtrl', WeatherDetailsCtrl);

    WeatherDetailsCtrl.$inject = ['moment', '$scope', '$rootScope'];
    function WeatherDetailsCtrl(moment, $scope, $rootScope) {

        let vm                  = this;
        vm.weatherDetails       = angular.fromJson(vm.weatherDetailsData);
        vm.date                 = moment(vm.weatherDetails[0].dt_txt);
        vm.selectedTimeWeather  = vm.weatherDetails[0];

        vm.getWeatherIconPath   = getWeatherIconPath;
        vm.selectTimeWeather    = selectTimeWeather;
        vm.moment               = moment;

        activate();

        function activate(){

            let weatherDetailListener = $rootScope.$on('weather-detail-select-event', function(ev, weatherData){

                vm.weatherDetails       = weatherData;
                vm.date                 = moment(vm.weatherDetails[0].dt_txt);
                vm.selectedTimeWeather  = vm.weatherDetails[0];
            });

            $scope.$on('$destroy', weatherDetailListener);
        }

        function getWeatherIconPath(){

            let weather = vm.selectedTimeWeather.weather[0].description;

            if(weather.indexOf('clouds') !== -1)
                return "assets/img/clouds-d.png";
            else if(weather.indexOf('mist') !== -1)
                return "assets/img/mist.png";
            else if(weather.indexOf('rain') !== -1)
                return "assets/img/rain-d.png";
            else if(weather.indexOf('snow') !== -1)
                return "assets/img/snow.png";
            else if(weather.indexOf('thunderstorm') !== -1)
                return "assets/img/thunderstorm.png";
            else
                return "assets/img/clear-d.png";
        }

        function selectTimeWeather(weather){
            vm.selectedTimeWeather = weather;
        }
    }
})();