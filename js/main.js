// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

var map;

function initAutocomplete() {

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.825603, lng: 10.608394999999973 },
        zoom: 13,
        //mapTypeId: "OSM",
        //styles: [{ "elementType": "labels", "stylers": [{ "visibility": "off" }, { "color": "#f49f53" }] }, { "featureType": "landscape", "stylers": [{ "color": "#f9ddc5" }, { "lightness": -7 }] }, { "featureType": "road", "stylers": [{ "color": "#813033" }, { "lightness": 43 }] }, { "featureType": "poi.business", "stylers": [{ "color": "#645c20" }, { "lightness": 38 }] }, { "featureType": "water", "stylers": [{ "color": "#1994bf" }, { "saturation": -69 }, { "gamma": 0.99 }, { "lightness": 43 }] }, { "featureType": "road.local", "elementType": "geometry.fill", "stylers": [{ "color": "#f19f53" }, { "weight": 1.3 }, { "visibility": "on" }, { "lightness": 16 }] }, { "featureType": "poi.business" }, { "featureType": "poi.park", "stylers": [{ "color": "#645c20" }, { "lightness": 39 }] }, { "featureType": "poi.school", "stylers": [{ "color": "#a95521" }, { "lightness": 35 }] }, {}, { "featureType": "poi.medical", "elementType": "geometry.fill", "stylers": [{ "color": "#813033" }, { "lightness": 38 }, { "visibility": "off" }] }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, { "elementType": "labels" }, { "featureType": "poi.sports_complex", "stylers": [{ "color": "#9e5916" }, { "lightness": 32 }] }, {}, { "featureType": "poi.government", "stylers": [{ "color": "#9e5916" }, { "lightness": 46 }] }, { "featureType": "transit.station", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit.line", "stylers": [{ "color": "#813033" }, { "lightness": 22 }] }, { "featureType": "transit", "stylers": [{ "lightness": 38 }] }, { "featureType": "road.local", "elementType": "geometry.stroke", "stylers": [{ "color": "#f19f53" }, { "lightness": -10 }] }, {}, {}, {}]
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var bthideshow = document.getElementById('bthideshow');
    //map.controls[google.maps.ControlPosition.TOP_RIGHT].push(bthideshow);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // [START region_getplaces]
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };
            var marker = new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location,
                draggable: true
            });
            google.maps.event.addListener(marker, 'dragend', function (marker) {
                var latLng = marker.latLng;
                $latitude.value = latLng.lat();
                $longitude.value = latLng.lng();
            });

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': 'Sousse' }, function (results, status) {

            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                $latitude.value = latitude;
                $longitude.value = longitude;
            }
        });
    });
}
window.onload = function () {
    //alert('Gharbi');
    //Define OSM map type pointing at the OpenStreetMap tile server
    map.mapTypes.set("OSM", new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            var tilesPerGlobe = 1 << zoom;
            var x = coord.x % tilesPerGlobe;
            if (x < 0) {
                x = tilesPerGlobe + x;
            }
            return "http://tile.openstreetmap.org/" + zoom + "/" + x + "/" + coord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        name: "OpenStreetMap",
        maxZoom: 18
    }));
}

function UpdateStyle(id) {
    switch (id) {
        case 0:
            var styledMapType = SetStyle(lost_in_the_desert_style);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 1:
            var styledMapType = SetStyle(shades_of_grey_style);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 2:
            var styledMapType = SetStyle(black_and_white_without_labels);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 3:
            var styledMapType = SetStyle(ultra_light_with_labels_style);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 4:
            var styledMapType = SetStyle(bluish);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 5:
            var styledMapType = SetStyle(weird_realms);
            map.mapTypes.set('styled_map', styledMapType);
            map.setMapTypeId('styled_map');
            break;
        case 6:
            map.setMapTypeId("OSM");
            //alert(map.mapTypeId);

            break;
        default:
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }
}
function SetStyle(style) {
    var styledMapType = new google.maps.StyledMapType(
        style,
        { name: 'Styled Map' });
    return styledMapType;
}