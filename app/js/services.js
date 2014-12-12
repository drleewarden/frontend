'use strict';

define(['angular'], function (angular) {

    /* Services */

    // Demonstrate how to register services
    // In this case it is a simple value service.
    angular.module('immersive.services', [])
        .value('version', '0.1')
        .factory('ergastAPIservice', function($http) {

            var ergastAPI = {};

            ergastAPI.getDrivers = function() {
                return $http({
                    method: 'JSONP',
                    url: 'http://ergast.com/api/f1/2013/driverStandings.json?callback=JSON_CALLBACK'
                });
            };

            ergastAPI.getJsonData = function() {
                return  $http({
                    method: 'GET',
                    url: 'http://jsonip.com/'
                })
                    .error(function () {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                    });
            };
            //console.log(ergastAPI);
            return ergastAPI;
        });
});
