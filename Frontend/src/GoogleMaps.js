/**
 * created by Kirill on 3.12.2017
 */

// my key - AIzaSyB-TZ12vi38BRxcnXm83S16V3nRV6X7cJM

var map;
var center;
var homeMarker;
var directionsDisplay;

function initialize() {

    directionsDisplay = new google.maps.DirectionsRenderer();
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
}

function setCenter(lat, lng) {
    map.setCenter({lat:lat, lng:lng});
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

    directionsService.route({
        origin: A_latlng,
        destination: B_latlng,
        travelMode: 'DRIVING'
    }, function (response, status) {

        if (status == 'OK') {

            var leg = response.routes[0].legs[0];

            directionsDisplay.setDirections(response);

            callback(null, {
                duration: leg.duration
            });

        } else {

            callback(new Error("Cannot find direction."));

        }
    });
}

// google.maps.event.addDomListener(window, 'load', initialize);

exports.geocodeAddress = geocodeAddress;
exports.calculateRoute = calculateRoute;
exports.initialize = initialize;
exports.setCenter = setCenter;
// exports.addMarker = addMarker;