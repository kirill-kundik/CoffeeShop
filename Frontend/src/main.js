$(function(){
    //This code will execute when the page is ready
    var CoffeeMenu = require('./pizza/PizzaMenu');
    //var CoffeeCart = require('./pizza/PizzaCart');
    var Coffee_List = require('./Coffee_List');
    //var PizzaOrderPage = require('./pizza/PizzaOrderPage');

    //PizzaCart.initialiseCart();
    CoffeeMenu.initialiseMenu();

    // if(window.location.href.contains('order')) {
    //     PizzaOrderPage.initializeOrderPage();
    // }
});