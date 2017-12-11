var Templates = require('../Main/Templates');
var CoffeeCart = require('../Cart/CoffeeCart');
var popup = require('../Main/popup');

var api = require('../FrontendAPI');
var Items_List;

//HTML едемент куди будуть додаватися піци
var $items_list = $("#items_list");

function showList(list) {
    //Очищаємо старі піци в кошику
    $items_list.html("");

    //Онволення однієї піци
    function showOneItem(item) {
        var html_code = Templates.Menu_OneItem({item: item});

        var $node = $(html_code);

        $node.find(".add-big").click(function () {
            CoffeeCart.addToCart(item, CoffeeCart.sizes.Big);
            popup.new_popup(item.title + " великий");
        });
        $node.find(".add-middle").click(function () {
            CoffeeCart.addToCart(item, CoffeeCart.sizes.Middle);
            popup.new_popup(item.title + " середній");
        });
        $node.find(".add-small").click(function () {
            CoffeeCart.addToCart(item, CoffeeCart.sizes.Small);
            popup.new_popup(item.title + " маленький");
        });

        $items_list.append($node);
    }

    list.forEach(showOneItem);
}

function filter(filters, negative_filters) {
    var items_shown = [];

    Items_List.forEach(function (item) {

        var add = true;
        negative_filters.forEach(function (t) {
            if (item.type === t) {
                add = false;
            }
        });

        if (add) {
            add = true;
            filters.forEach(function (t) {
                if (item.type !== t) {
                    add = false;
                }
            });
            if (add)
                items_shown.push(item);
        }
    });

    //Показати відфільтровані піци
    showList(items_shown);
}

function initialiseMenu() {
    $('#menu-button').addClass('selected');
    //document.getElementById('contacts-button').href = '/';

    api.getList(function (err, data) {
        Items_List = data;
        showList(Items_List);
    });

    $('#type1').click(function () {
        showList(Items_List);
    });
    $('#type2').click(function () {
        filter(['Кава'], []);
    });
    $('#type3').click(function () {
        filter(['Чай'], []);
    });
    $('#type4').click(function () {
        filter([], ['Кава', 'Чай', 'Солодке']);
    });
    $('#type5').click(function () {
        filter(['Солодке'], []);
    });
}

exports.filterPizza = filter;
exports.initialiseMenu = initialiseMenu;