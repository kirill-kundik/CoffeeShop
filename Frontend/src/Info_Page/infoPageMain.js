$(function() {
    $('#contacts-button').addClass('selected');

    var CoffeeCart = require('../Cart/CoffeeCart');
    var cart = require('../Cart/CartHeader');

    CoffeeCart.initialiseCart();
    cart.init_header_cart();
});
