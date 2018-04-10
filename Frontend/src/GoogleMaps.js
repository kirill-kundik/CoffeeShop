/**
 * created by Kirill on 3.12.2017
 */

// my key - AIzaSyB-TZ12vi38BRxcnXm83S16V3nRV6X7cJM

var map;
var center;
var homeMarker;
var directionsDisplay;
var markers = [];
var content;

var marker_home = null;

function initialize() {

    directionsDisplay = new google.maps.DirectionsRenderer({polylineOptions: {strokeColor: "#332b29"}});

    center = new google.maps.LatLng(50.464379, 30.519131);

    var html_element = document.getElementById("googleMap");

    var mapProp = {
        center: center,
        zoom: 12
    };

    map = new google.maps.Map(html_element, mapProp);

    directionsDisplay.setMap(map);
    directionsDisplay.setOptions({
        suppressMarkers: true
    });

    init_markers();
    google.maps.event.addListener(map, 'click', find_closest_marker);

    // addMarker(center.lat(), center.lng());

    // var marker = new google.maps.Marker({
    //     position: center,
    //     map: map,
    //     icon: {
    //         url: "assets/images/map-icon.png",
    //         anchor: new google.maps.Point(30, 30)
    //     }
    // });

    // google.maps.event.addListener(map, 'click', function (me) {
    //
    //     var coordinates = me.latLng;
    //
    //     geocodeLatLng(coordinates, function (err, adress) {
    //         if (!err) {
    //             //Дізналися адресу
    //             // $("#inputAddress").val(adress);
    //             // $(".order-address").text(adress);
    //             // $(".address-group").removeClass("has-error").addClass("has-success");
    //             // $(".address-group").find(".help-block").css("display", "none");
    //
    //             if (homeMarker) homeMarker.setMap(null);
    //
    //             homeMarker = new google.maps.Marker({
    //                 position: coordinates,
    //                 map: map,
    //                 icon: {
    //                     url: "assets/images/home-icon.png",
    //                     anchor: new google.maps.Point(30, 30)
    //                 }
    //
    //             });
    //
    //             calculateRoute(pizzeria, coordinates, function (err, data) {
    //
    //                 if (!err)
    //                     console.log("norm");
    //                     // $(".order-time").text(data.duration.text);
    //                 else
    //                     console.log(err);
    //
    //             });
    //
    //         } else {
    //
    //             console.log(err);
    //
    //         }
    //     });
    // });
}

function addMarker(lat, lng, name) {
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        icon: {
            url: "assets/images/map-icon.png",
            anchor: new google.maps.Point(30, 30)
        },
        title: name
    });

    marker.addListener("click", function () {
        setCenter(lat, lng);
        $('#shop-list').val(name);
    });

    markers.push(marker);
}

function setCenter(lat, lng) {
    map.setCenter({lat: lat, lng: lng});
    map.setZoom(15);
}


function init_markers() {
    var api = require('./FrontendAPI');

    api.getShops(function (err, data) {
        // console.log(shops_list);
        data.forEach(function (t) {
            addMarker(t.lat, t.lng, t.name);
        });
    });
}

function geocodeLatLng(latlng, callback) {

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode(
        {'location': latlng},
        function (results, status) {

            if (status === 'OK') {

                var address = results[1].formatted_address;

                callback(null, address);

            } else {

                callback(new Error("Cannot find address."));

            }
        });
}

function geocodeAddress(address, callback) {

    var geocoder = new google.maps.Geocoder();

    geocoder.geocode(
        {'address': address},
        function (results, status) {

            if (status === 'OK') {

                var lat = results[0].geometry.location.lat();
                var lon = results[0].geometry.location.lng();
                var location = new google.maps.LatLng(lat, lon);

                if (homeMarker) homeMarker.setMap(null);

                homeMarker = new google.maps.Marker({
                    position: location,
                    map: map,
                    icon: {
                        url: "assets/images/home-icon.png",
                        anchor: new google.maps.Point(30, 30)
                    }

                });

                callback(null, location);

            } else {

                callback(new Error("Cannot find address."));

            }
        });
}

function calculateRoute(A_latlng, B_latlng, callback) {

    var directionsService = new google.maps.DirectionsService();
    // var directionsDisplay = new google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#332b29" } });
    // directionsDisplay.setMap(map);
    // directionsDisplay.setOptions({ suppressMarkers: true });

    directionsService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: 'DRIVING'
    }, function (response, status) {

        if (status === 'OK') {

            varleg = response.routes[0].legs[0];

            directionsDisplay.setDirections(response);

            callback(null, {
                duration: varleg.duration,
                distance: varleg.distance
            });

        } else {

            callback(new Error("Cannot find direction."));

        }
    });
}

function rad(x) {
    return x * Math.PI / 180;
}

function find_closest_marker(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for (var i = 0; i < markers.length; i++) {
        var mlat = markers[i].position.lat();
        var mlng = markers[i].position.lng();
        var dLat = rad(mlat - lat);
        var dLong = rad(mlng - lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        distances[i] = d;
        if (closest === -1 || d < distances[closest]) {
            closest = i;
        }
    }

    if (marker_home === null) {
        marker_home = new google.maps.Marker({
            position: event.latLng,
            map: map,
            icon: {
                url: "assets/images/home-icon.png",
                anchor: new google.maps.Point(30, 30)
            },
            title: "You're here!"
        });
    } else {
        marker_home.setPosition(event.latLng);
    }

    content = "<p>Найближче до Вас кафе '" + markers[closest].title + "', це всього за ";

    calculateRoute(event.latLng, markers[closest].position, function (err, data) {

        if (err)
            console.log(err);
        else {
            content += data.distance.text + ", а це " + data.duration.text + " на машині.</p>";
            var infowindow = new google.maps.InfoWindow({
                content: content
            });
            infowindow.open(map, marker_home);
        }
    });
    // alert(markers[closest].title);
}

// google.maps.event.addDomListener(window, 'load', initialize);

exports.geocodeLatLng = geocodeLatLng;
exports.geocodeAddress = geocodeAddress;
exports.calculateRoute = calculateRoute;
exports.initialize = initialize;
exports.setCenter = setCenter;
// exports.addMarker = addMarker;