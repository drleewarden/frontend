'use strict';

define(['angular', 'services','Isotope'], function(angular, services, Isotope) {
    /* Directives */
    angular.module('immersive.directives', ['immersive.services'])
        .directive('onFinishRender', function () {
            return function (scope, element, attrs) {
                //angular.element(element).css('color', 'blue');
                if (scope.$last) {
                    scope.$iso = new Isotope( '#isotope', {
                        itemSelector: '.element-item',
                        layoutMode: 'fitRows'
                    });
                    scope.filter(scope.$iso);
                }
            };
        })
        .directive('appVersion', ['version', function(version) {
            return function(scope, elm, attrs) {
                elm.text(version);
            };
        }]);

});
