define('google', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
    function () {
        // return the gmaps namespace for brevity
        console.log('LOADED: googlemaps');
        return window.google.maps;
    });