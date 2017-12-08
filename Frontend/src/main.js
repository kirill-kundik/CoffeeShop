$(function(){
    //This code will execute when the page is ready
    var CoffeeMenu = require('./menu/CoffeeMenu');
    var CoffeeCart = require('./menu/CoffeeCart');
    // var Coffee_List = require('./Coffee_List');
    // var PizzaOrderPage = require('./pizza/PizzaOrderPage');
    var cart = require('./Cart');

    CoffeeCart.initialiseCart();
    CoffeeMenu.initialiseMenu();

    cart.init_header_cart();

    // if(window.location.href.contains('order')) {
    //     PizzaOrderPage.initializeOrderPage();
    // }

});