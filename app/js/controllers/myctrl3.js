define([], function() {
	return ['$scope', '$http', function($scope, $http) {
		// You can access the scope of the controller from here
        $scope.thirdPage = ' Welcome to the third page';
        $http({
            method: 'GET',
            url: 'http://jsonip.com/'
        }).
            success(function (data) {

                $scope.infomation = data;
                console.log(data.ip);


                setTimeout(function () {

                }, 500);

            }).error(function () {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
		$scope.$apply();
	}];
});
