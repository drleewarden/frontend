/**
 * Created by dleewarden on 9/12/14.
 */
define(['angular', 'services'], function(angular, services) {
    /* Directives */
    angular.module('immersive.maps', ['immersive.services'])
        .directive('dirMaps', ['version', function(version) {
            return function(scope) {
                console.log('LOADED: dir maps');
                ////////////////////////////
                // directive maps loaded //
                ///////////////////////////
                initialize();
                function initialize() {

                    $('#map-angular').height(400);
                    map = new google.maps.Map(document.getElementById('map-angular'), {
                        zoom: 2,
                        center: new google.maps.LatLng(2.8,-187.3),
                        mapTypeId: google.maps.MapTypeId.TERRAIN,
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: true,
                        overviewMapControl: true
                    });

                    // Create a <script> tag and set the USGS URL as the source.
                    var script = document.createElement('script');
                    // (In this example we use a locally stored copy instead.)
                    script.src = 'http://earthquake.usgs.gov/earthquakes/feed/geojsonp/2.5/week';
                    //script.src = 'earthquake_GeoJSONP';
                    document.getElementsByTagName('head')[0].appendChild(script);

                    window.eqfeed_callback = function(results) {
                        for (var i = 0; i < results.features.length; i++) {
                            createMarker(i);
                        }
                        function createMarker(i) {
                            var coords = results.features[i].geometry.coordinates;
                            var text = results.features[i].type;
                            var latLng = new google.maps.LatLng(coords[1],coords[0]);
                            var marker = new google.maps.Marker({
                                position: latLng,
                                map: map,
                                animation: google.maps.Animation.DROP
                            });
                            var contentString = '<div id="content">'+

                                '<div class="siteNotice">'+
                                '</div>'+
                                '<h1 class="firstHeading" class="firstHeading">Uluru</h1>'+
                                '<div class="bodyContent">'+
                                '<p><b>Name</b>, also referred to as <br><b>Crop</b>, is a large <p>' +
                                text +
                                '</p> sandstone rock formation in the southern part of the '+
                                'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
                                'south west of the nearest large town, Alice Springs; 450&#160;km '+
                                '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
                                'features of the Uluru - Kata Tjuta National Park. Uluru is '+
                                'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
                                'Aboriginal people of the area. It has many springs, waterholes, '+
                                'rock caves and ancient paintings. Uluru is listed as a World '+
                                'Heritage Site.</p>'+
                                '<p>Attribution: Uluru, <a href="http://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
                                'http://en.wikipedia.org/w/index.php?title=Uluru</a> '+
                                '(last visited June 22, 2009).</p>'+
                                '</div>'+
                                '</div>';
//                    var infowindow = new google.maps.InfoWindow({
//                        content: contentString
//                    });
                            var infobox = new InfoBox({
                                content: contentString,
                                disableAutoPan: false,
                                maxWidth: 150,
                                pixelOffset: new google.maps.Size(-150, 0),
                                zIndex: null,
                                boxStyle: {
                                    background: "white",
                                    opacity: 1,
                                    width: "300px"
                                },
                                closeBoxMargin: "12px 4px 2px 2px",
                                closeBoxURL: "http://www.google.com/intl/en_us/mapfiles/close.gif",
                                infoBoxClearance: new google.maps.Size(1, 1)
                            });
                            google.maps.event.addListener(marker, 'click', function() {
                                infobox.open(map,marker);
                            });
                        }


                    }

                }

                // Loop through the results array and place a marker for each
                // set of coordinates.

                google.maps.event.addDomListener(window, 'load', initialize)
            }
        }]);
});