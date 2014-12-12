define([], function() {
	return ['$scope', '$http','UserService', function($scope, $http, UserService) {
		// You can access the scope of the controller from here
        $scope.initMap = function () {
            var $mapData = {},
                boxText = '',
                markerData = '';

            if ($('.chunklet-container').length > 0) {
                $mapData = $('.chunklet-container');
                markerData = '.chunklet-container';
                boxText = 'divname';
            }
            else {
                $mapData = $('.favourite-container');
                markerData = '.favourite-container';
                boxText = 'divname';
            }

            $scope.createData($mapData);
            google.maps.event.addDomListener(window, 'load', loadScript(markerData, boxText));
        };
        $scope.createData = function ($mapData) {
            $scope.data = [];
            $mapData.each(function () {
                var lat = $(this).data('latitude'),
                    lng = $(this).data('longitude'),
                    id = $(this).data('id'),
                    pin = $(this).data('marker'),
                    shadow = $(this).data('shadow');
                if (lat && lng) {
                    $scope.data.push({
                        Latitude: lat,
                        Longitude: lng,
                        ID: id,
                        PIN: pin,
                        SHADOW: shadow

                    });
                }
            });
            var mapObj = $scope.data;
            console.log(mapObj);
            $scope.mapObj = mapObj;
        };

        function loadScript(markerData, boxText) {
            var mapOptions = {

                center: new google.maps.LatLng(49, -123),
                zoom: 8,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                streetViewControl: true,
                overviewMapControl: true

            };

            var map = new google.maps.Map(document.getElementById("mapContainer"),
                mapOptions);
            var marker;
            var marker_list = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, len = $scope.data.length; i < len; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng($scope.data[i].Latitude, $scope.data[i].Longitude),
                    map: map,
                    animation: google.maps.Animation.DROP,
                    icon: $scope.data[i].PIN,
                    shadow: $scope.data[i].SHADOW

                });

                (function (marker, i) {
                    var ib = new InfoBox(getInfoBoxOpt(markerData, boxText, i));
                    google.maps.event.addListener(marker, 'click', function () {
                        //var id = $($.parseHTML(ib.getContent())).find('.chunklet-container').attr("data-id");
                        var content = $($.parseHTML(ib.getContent()));
                        $scope.ifFavExists($(content).find(markerData));

                        ib.setContent('<div class="infoBox">' + $(content).html() + '</div>');

                        ib.open(map, marker);
                        favMapChunk();
                    });
                })(marker, i);

                marker_list.push(marker);

                bounds.extend(marker.getPosition());

            }

            clusterMaker(map, marker_list);
            map.fitBounds(bounds);

        }

        function clusterMaker(map, marker_list) {
            // Add marker clustering
            var markerCluster = new MarkerClusterer(map, marker_list, {
                gridSize: 4,
                styles: [{
                    url: 'http://www.pixeljoint.com/files/icons/bat__r161055641.gif',
                    height: 30,
                    width: 30

                }],
                minimumClusterSize: 2,
                calculator: function (markers, numStyles) {
                    // Custom style can be returned here
                    return {
                        text: markers.length,
                        index: 0
                    };
                }
            });
        }


        function getInfoBoxOpt(details, favourites, i) {

            var markerData = $(details + '[data-id=' + $scope.mapObj[i].ID + ']').parent().clone(),
                boxText = '<div class="chunklet-holder ' + favourites + '">' + markerData.html() + '</div>',
                markerOptions = {
                    content: boxText,
                    boxStyle: {
                        background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                        opacity: 1,
                        width: "280px"
                    },
                    disableAutoPan: false,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, 0),
                    zIndex: null,
                    closeBoxMargin: "-22px 2px 2px 2px",
                    closeBoxURL: "http://www.autoweek.com/assets/losangeles/closeButton.png",
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: "floatPane",
                    enableEventPropagation: false

                };

            return markerOptions;

        }

        function favMapChunk() {

            setTimeout(function () {
                $('.infoBox .favourite-btn').click(function () {
                    var id = $(this).parent().data('id'),
                        typ = $(this).parent().data('favourite-type');
                    UserService.toggleFavourite(typ, id);
                    $scope.ifFavExists();
                    //$scope.checkFavExists();
                });
            }, 400);
        }

        $scope.$apply();
	}];
});
//////
// MAPS
/////


