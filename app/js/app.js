'use strict';

define([
	'angular',

    'firebase',
	'filters',
	'services',
	'directives',
	'directives/aside',
	'directives/maps',
	'controllers',
	'angularRoute',
    'angularBreadcrumb'


	], function (angular, firebase, filters, services, directives, aside, maps, controllers) {

		// Declare app level module which depends on filters, and services
		
		return angular.module('immersive', [

            'firebase',
			'ngRoute',
			'immersive.filters',
			'immersive.services',
			'immersive.directives',
			'immersive.aside',
			'immersive.maps',
			'immersive.controllers'


		]);
});

