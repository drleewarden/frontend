/**
 * Created by dleewarden on 13/11/14.
 */

define(['angular', 'services'], function(angular, services) {
    /* Directives */
    angular.module('immersive.aside', ['immersive.services'])
        .directive('dirAside', function () {
            return {
                restrict: 'AE',
                replace: 'true',
                //template: '<h3>Hello World!!</h3>'
                templateUrl: 'app/templates/aside.html'
            };
        });
});