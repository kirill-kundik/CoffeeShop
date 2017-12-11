var $flyout;

$(function () {
    $flyout = $('.sum-panel');
    $(window).scroll(function () {
        scrollCheck();
    });
    $(window).resize(function () {
        scrollCheck();
    });


    var CoffeeCart = require('../Cart/CoffeeCart');
    CoffeeCart.initialiseCart();
});

var scrollCheck = function () {
    // console.log(($(window).height() + $(this).scrollTop()) + ", " + ($(document).height() - 90));
    if ($(window).height() + $(this).scrollTop() < $(document).height() - 90) {
        $flyout.addClass('fixed');
    } else {
        $flyout.removeClass('fixed');
    }
};