$(function () {
    $('#about-button').addClass('selected');

    var CoffeeCart = require('../Cart/CoffeeCart');
    var cartHeader = require('../Cart/CartHeader');

    CoffeeCart.initialiseCart();
    cartHeader.init_header_cart();

});