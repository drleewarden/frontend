define(['services'], function(services) {

    return ['$scope', '$http','ergastAPIservice', function($scope, $http, ergastAPIservice) {
        // You can access the scope of the controller from here
        $scope.nameFilter = null;
        $scope.driversList = [];
        $scope.xxx = ergastAPIservice;
        console.log( $scope.xxx);
        ergastAPIservice.getDrivers().success(function (response) {
            //Dig into the responde to get the relevant data

            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            console.log($scope.driversList);
        });
        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
        };
        $scope.$apply();
    }];
});
