$(function(){
    var CoffeeMenu = require('./CoffeeMenu');
    var CoffeeCart = require('../Cart/CoffeeCart');
    var cart = require('../Cart/CartHeader');

    CoffeeCart.initialiseCart();
    CoffeeMenu.initialiseMenu();
    cart.init_header_cart();
});
