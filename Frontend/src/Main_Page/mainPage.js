$(function () {
    var CoffeeCart = require('../Cart/CoffeeCart');
    var cart = require('../Cart/CartHeader');
    var testScrolling = require('./testScrolling');

    CoffeeCart.initialiseCart();
    cart.init_header_cart();
    testScrolling.init();
});
