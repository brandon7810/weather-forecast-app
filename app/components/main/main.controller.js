(function () {

    'use strict';

    angular.module('weatherForecastApp.main')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['OpenWeatherMap', 'moment', '$rootScope', '$window'];
    function MainCtrl(OpenWeatherMap, moment, $rootScope, $window){

        let vm              = this;

        vm.citiesList       = [
            {
                name        : 'Toronto, Canada',
                city        : 'Toronto',
                countryCode : 'CA'
            },
            {
                name        : 'Vancouver, Canada',
                city        : 'Vancouver',
                countryCode : 'CA'
            },
            {
                name        : 'Calgary, Canada',
                city        : 'Calgary',
                countryCode : 'CA'
            },
            {
                name        : 'New York, USA',
                city        : 'New York',
                countryCode : 'US'
            },
            {
                name        : 'Las Vegas, USA',
                city        : 'Las Vegas',
                countryCode : 'US'
            }
        ];

        vm.displayedCity    = '';
        vm.city             = '';
        vm.countryCode      = '';
        vm.units            = 'metric';
        vm.weatherData      = null;
        vm.isLoading        = true;
        vm.errorOccurred    = false;
        vm.selectedWeather  = null;

        vm.loadWeatherForecast  = loadWeatherForecast;
        vm.selectDateWeather    = selectDateWeather;

        activate();

        function activate(){

            loadWeatherForecast(vm.citiesList[0]);
        }

        function loadWeatherForecast(cityObj){

            vm.isLoading        = true;

            if(cityObj){

                vm.city             = cityObj.city;
                vm.countryCode      = cityObj.countryCode;
                vm.displayedCity    = cityObj.name;
            }

            OpenWeatherMap.getFiveDayForeCast(vm.city + ',' + vm.countryCode, vm.units).then(function(data){

                vm.weatherData      = parseWeatherData(data);
                vm.selectDateWeather(vm.weatherData[0]);
                vm.isLoading        = false;
                vm.errorOccurred    = false;

            }, function(){

                vm.isLoading        = false;
                vm.errorOccurred    = true;
            });
        }

        function parseWeatherData(data){

            let _weatherByDate = {};

            if(!data.list){
                return null;
            }

            for(let i=0; i< data.list.length; i++){

                let item = data.list[i];
                let date = moment(item.dt_txt);

                if(_weatherByDate[date.format('DD-MM-YY')] == null){
                    _weatherByDate[date.format('DD-MM-YY')] = [item];
                }
                else{
                    _weatherByDate[date.format('DD-MM-YY')].push(item);
                }
            }

            return Object.values(_weatherByDate);
        }

        function selectDateWeather(weather){
            vm.selectedWeather = weather;
            $rootScope.$emit('weather-detail-select-event', weather);
            $window.scrollTo(0, 0);
        }
    }
})();