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

    api.getShops(function (err, data) {
        shops_list = data;
        // console.log(shops_list);
        shops_list.forEach(function (t) {
            googleMap.addMarker(t.lat, t.lng);
        });
    });
});

$(window).on("load", function () {


    console.log(shops_list);

});

