'use strict';

define(['angular', 'app'], function(angular, app) {

	return app.config(['$routeProvider', function($routeProvider) {
        var temps = 'app/templates';
//        $routeProvider.when('/', {
//            templateUrl: 'app/templates/breadcrumbs.html',
//            controller: 'MyCtrl1',
//            label: 'Home'
//        });
		$routeProvider.when('/view1', {
			templateUrl: 'app/partials/partial1.html',
			controller: 'MyCtrl1',
            label: 'Home: view '
		});
        $routeProvider.when('/search', {
            templateUrl: temps+'/search.html',
            controller: 'search'
        });
		$routeProvider.when('/view2', {
			templateUrl: 'app/partials/partial2.html',
			controller: 'MyCtrl2'
		});
        $routeProvider.when('/view3', {
            templateUrl: 'app/partials/partial3.html',
            controller: 'MyCtrl3'
        });
        $routeProvider.when('/home', {
            templateUrl: 'app/partials/partial3.html',
            controller: 'MyCtrl3'
        });
        $routeProvider.when('/firebase', {
            templateUrl: temps+'/firebase.html',
            controller: 'chat'
        });
        $routeProvider.when('/about', {
            templateUrl: 'app/templates/about.html',
            controller: 'MyCtrl3'
        });
        $routeProvider.when('/view7', {
            templateUrl: 'app/templates/about.html',
            controller: 'MyCtrl3'
        });
        $routeProvider.when('/wordpress', {
            templateUrl: 'app/templates/wordpress.html',
            controller: 'wordpress'
        });

		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);

});
