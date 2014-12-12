'use strict';

require.config({
	paths: {
		angular: '../bower_components/angular/angular',
		bootstrapJS: '../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap',
		jQuery: '../bower_components/jquery/dist/jquery',
		angularRoute: '../bower_components/angular-route/angular-route',
		angularMocks: '../bower_components/angular-mocks/angular-mocks',
		text: '../bower_components/requirejs-text/text',
        infobox:'http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/src/infobox',
        google: 'site/gmaps',
        Isotope: 'vendor/isotope.pkgd.min',
        paper: 'vendor/jquery.paperfold',
        angularGMapsPlugin: '../bower_components/angular-google-maps/dist/angular-google-maps.min',
        angularBreadcrumb: '../bower_components/ng-breadcrumbs/dist/ng-breadcrumbs',
        firebaseCDN:'https://cdn.firebase.com/js/client/2.0.4/firebase',
        firebase:'../bower_components/angularfire/dist/angularfire.min',
        async:'../bower_components/async/async'
	},
	shim: {
		'jQuery' : {'exports' : '$'},
		'angular' : {
            deps:['jQuery'],
            'exports' : 'angular'
        },
        'Isotope':['jQuery', 'angular'],
        'paper': ['jQuery', 'angular'],
        'firebaseCDN':['angular'],
        'firebase' :[ 'angular','firebaseCDN'],
        'angularGMapsPlugin':['jQuery', 'angular','google'],
        'infobox':{
            deps:['google'],
            exports:'Infobox'
        },
        'base' :['jQuery', 'angular'],
        'map' :['jQuery', 'angular','google'],
		'angularRoute': ['angular', 'angularBreadcrumb'],
        'angularBreadcrumb':['angular'],
        'app':['jQuery', 'angular', 'angularRoute', 'angularGMapsPlugin','bootstrapJS', 'angularBreadcrumb','firebaseCDN','firebase'],
        'bootstrapJS':['jQuery', 'angular'],
		'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require( [
    'jQuery',
	'angular',
    'google',
    'Isotope',
    'paper',

	'app',
	'routes',
    'site/map',
    'base'
], function($, angular,google,Isotope,paper,app, routes,map, base) {
///////////////////////////////////////////////////////////////
// these functions are for standard requirejs without angular
///////////////////////////////////////////////////////////////
	var $html = angular.element(document.getElementsByTagName('html')[0]);
    $(function() {
       // map.initialize(); // google maps feature
        base.initialize(); // base functionality
    });
	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
