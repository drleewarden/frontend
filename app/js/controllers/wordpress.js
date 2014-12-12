define(['services','firebase'], function(services, $firebase) {

    return ['$scope', '$http', '$firebase', function($scope, $http, $firebase) {
        // You can access the scope of the controller from here
        var wordpressData = new Firebase('https://wp.firebaseio.com/posts');
        // create an AngularFire reference to the data
        var sync = $firebase(wordpressData);
        // download the data into a local object
        $scope.messages = sync.$asArray();

            $('.flipper .front').click(function () {
                $(this).parents('.flipper').addClass('flip-r');
            });
            $('.back').click(function () {
                $(this).parents('.flipper').removeClass('flip-r');
            });



        // ************ Filters ************* //
        $scope.filter = function($iso) {

            $('#posts-filter a').click(function (e) {
                e.preventDefault();
                var filterValue = $(this).attr('data-filter');
                // use filter function if value matches
                //filterValue = filterFns[filterValue] || filterValue;
                $iso.arrange({ filter: filterValue });
            });
            // ************ Search ************* //
            $('#isotopeSearch').bind('keyup', function () {
                isotopeSearch($(this).val().toLowerCase());
            });
            // ************ isotope Search  ************* //
            function isotopeSearch( kwd) {

                if ((kwd != '') && (kwd.length >= 3)) { // min 2 chars to execute query:
                    var xxx = '.' + kwd;

                    //$iso.destroy();
                    $iso.arrange({
                        filter: xxx
                    });
                }
                else if (kwd === '') {
                    var item = '.item';
                    //$('#isotopeContainer').isotope('destroy');
                    $iso.arrange({
                        filter: item
                    });
                }
            }
        };
        $scope.$apply();
    }];
});
