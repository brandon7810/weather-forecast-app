(function () {

    'use strict';

    angular.module('weatherForecastApp.weatherCard')
        .controller('WeatherCardCtrl', WeatherCardCtrl);

    WeatherCardCtrl.$inject = ['moment'];
    function WeatherCardCtrl(moment) {

        let vm                  = this;
        vm.weatherDetails       = angular.fromJson(vm.weatherDetailsData);
        vm.date                 = moment(vm.weatherDetails[0].dt_txt);
        vm.selectedTimeWeather  = vm.weatherDetails[0];
        vm.getWeatherIconPath   = getWeatherIconPath;

        activate();

        function activate(){
            //console.log(vm.weatherDetails);
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
    }
})();