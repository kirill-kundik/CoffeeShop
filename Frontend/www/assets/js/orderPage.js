(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getList = function (callback) {
    backendGet("/api/get-list/", callback);
};

exports.getShops = function (callback) {
    backendGet("/api/get-shops/", callback);
};

exports.createOrder = function (order_info, callback) {
    backendPost("/api/create-order/", order_info, callback);
};

},{}],2:[function(require,module,exports){
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
},{"./FrontendAPI":1}],3:[function(require,module,exports){
var shops_list = [];

$(function () {
    $('#datetimepicker3').datetimepicker({
        format: 'LT'
    });

    var regex = require('./regex');
    var api = require('../FrontendAPI');
    var googleMap = require('../GoogleMaps');

    regex.initializeRegex();
    googleMap.initialize();

    var $shop_list = $('#shop-list');
    $shop_list.text("");

    api.getShops(function (err, data) {
        shops_list = data;
        shops_list.forEach(function (t) {
            var html = "<option>" + t.name + "</option>";
            var $option = $(html);
            $shop_list.append($option);
        });

        $shop_list.on("click", function (info) {
            if (info.which === 0) {
                var pos = getLanLngWithName($shop_list.val());
                googleMap.setCenter(pos.lat, pos.lng);
                // console.log(info);
            }
        });
    });

    function getLanLngWithName(name) {
        var res = {};
        shops_list.forEach(function (t) {
            if (t.name === name) {
                res = {lat: t.lat, lng: t.lng};
                return;
            }
        });
        return res;
    }

});


},{"../FrontendAPI":1,"../GoogleMaps":2,"./regex":4}],4:[function(require,module,exports){
// ******** VALIDATE INPUT *********

function initializeRegex() {
    $('#error-name').hide();
    $('#inputName').on('input', function () {
        validateName();
    });

    $('#error-phone').hide();
    $('#inputPhone').on('input', function () {
        validatePhone();
    });
}

function validateName() {
    var regex = /^[a-zA-Zа-яА-Я \-]{2,30}$/;
    var valid = regex.test($('#inputName').val());

    if (!valid) {
        $('#error-name').show();
        $('#nameGroup').addClass('has-error');
        $('#nameGroup').removeClass('has-success');
    } else {
        $('#error-name').hide();
        $('#nameGroup').addClass('has-success');
        $('#nameGroup').removeClass('has-error');
    }
    return valid;
}

function validatePhone() {
    var regex = /^(\+380|0)([0-9]\d{8})$/;
    var valid = regex.test($('#inputPhone').val());

    if (!valid) {
        $('#error-phone').show();
        $('#phoneGroup').addClass('has-error');
        $('#phoneGroup').removeClass('has-success');
    } else {
        $('#error-phone').hide();
        $('#phoneGroup').addClass('has-success');
        $('#phoneGroup').removeClass('has-error');
    }
    return valid;
}

exports.initializeRegex = initializeRegex;
},{}]},{},[3]);
