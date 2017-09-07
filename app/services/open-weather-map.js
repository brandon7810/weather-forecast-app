(function () {

    'use strict';

    angular.module('weatherForecastApp.services')
        .factory('OpenWeatherMap', OpenWeatherMap);

    OpenWeatherMap.$inject = ['$resource', 'AppConstants', '$q'];
    function OpenWeatherMap($resource, AppConstants, $q) {

        return {
            getFiveDayForeCast  : getFiveDayForeCast
        };

        function getFiveDayForeCast(location, units){

            let url = 'http://api.openweathermap.org/data/2.5/forecast?'
                + 'q='      +   location
                + "&APPID=" +   AppConstants.openWeatherMapAPIKey
                + "&units=" +   units;

            return $resource(url, {}, {
                query: {method:'GET'}
            }).query().$promise.then(function (data) {

                if(data){
                    return data;
                }

                return $q.reject('No data return!');

            }, function(error) {

                return $q.reject(error);
            });
        }
    }
})();