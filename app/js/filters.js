'use strict';

define(['angular', 'services'], function (angular, services) {

	/* Filters */
	
	angular.module('immersive.filters', ['immersive.services'])
        .filter('htmlToPlaintext', function () {
            return function (text) {
                return String(text).replace(/<[^>]+>/gm, '');
            };
        })
		.filter('interpolate', ['version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
	}]);
});
