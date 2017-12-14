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

