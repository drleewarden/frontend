'use strict';

define(['angular', 'services','angularBreadcrumb', 'firebase'], function (angular, breadcrumbs, firebase) {

	/* Controllers */
	
	return angular.module('immersive.controllers', ['immersive.services'])
		// Sample controller where service is being used
		.controller('MyCtrl1', ['$scope', 'version', function ($scope, version) {
            //console.log(breadcrumbs);
			$scope.scopedAppVersion = version;
            $scope.breadcrumbs = breadcrumbs;
            console.log($scope.breadcrumbs)
		}])
		// More involved example where controller is required from an external file
		.controller('MyCtrl2', ['$scope', '$injector',  function($scope, $injector) {
			require(['controllers/myctrl2'], function(myctrl2) {
				// injector method takes an array of modules as the first argument
				// if you want your controller to be able to use components from
				// any of your other modules, make sure you include it together with 'ng'
				// Furthermore we need to pass on the $scope as it's unique to this controller
				$injector.invoke(myctrl2, this, {'$scope': $scope});
			});
		}])
        .controller('search',['$scope','$injector','ergastAPIservice',function($scope, $injector, ergastAPIservice){
            require(['controllers/search'], function(search) {
                $injector.invoke(search, this, {'$scope': $scope});
            });
        }])
        .controller('MyCtrl3', ['$scope', '$injector', function($scope, $injector) {
            require(['controllers/myctrl3'], function(myctrl3) {
                $injector.invoke(myctrl3, this, {'$scope': $scope});
            });
        }])
        .controller('wordpress', ['$scope', '$injector', function($scope, $injector) {
            require(['controllers/wordpress'], function(wordpress) {
                $injector.invoke(wordpress, this, {'$scope': $scope});
            });
        }])
        .controller('chat', ['$scope', '$injector', function($scope, $injector) {
            require(['controllers/chat'], function(chat) {
                $injector.invoke(chat, this, {'$scope': $scope});
            });
        }]);
});
