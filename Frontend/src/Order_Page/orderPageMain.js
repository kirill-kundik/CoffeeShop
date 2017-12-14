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
            $shop_list.append("<option>"+t.name+"</option>");
        });
    });
});

