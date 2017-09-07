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
        vm.dailyMaxTemp         = null;
        vm.dailyMinTemp         = null;

        vm.getWeatherIconPath   = getWeatherIconPath;

        activate();

        function activate(){

            [vm.dailyMaxTemp, vm.dailyMinTemp] = getDailyTemp(vm.weatherDetails);
        }

        function getWeatherIconPath(){

            let _weather = vm.selectedTimeWeather.weather[0].description;

            if(_weather.indexOf('clouds') !== -1)
                return "assets/img/clouds-d.png";
            else if(_weather.indexOf('mist') !== -1)
                return "assets/img/mist.png";
            else if(_weather.indexOf('rain') !== -1)
                return "assets/img/rain-d.png";
            else if(_weather.indexOf('snow') !== -1)
                return "assets/img/snow.png";
            else if(_weather.indexOf('thunderstorm') !== -1)
                return "assets/img/thunderstorm.png";
            else
                return "assets/img/clear-d.png";
        }

        function getDailyTemp(weatherDetails){

            let _max = weatherDetails[0].main.temp,
                _min = weatherDetails[0].main.temp;


            for(let i=1; i<weatherDetails.length; i++){

                if(weatherDetails[i].main.temp > _max){
                    _max = weatherDetails[i].main.temp;
                }

                if(weatherDetails[i].main.temp < _min){
                    _min = weatherDetails[i].main.temp;
                }
            }

            return [Math.round(_max), Math.round(_min)];
        }
    }
})();