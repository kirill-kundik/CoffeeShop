var $flyout;

var scrollCheck = function () {
    // console.log(($(window).height() + $(this).scrollTop()) + ", " + ($(document).height() - 90));
    if ($(window).height() + $(this).scrollTop() < $(document).height() - 90) {
        $flyout.addClass('fixed');
    } else {
        $flyout.removeClass('fixed');
    }
};

$(function () {
    $flyout = $('.sum-panel');
    $(window).scroll(function () {
        scrollCheck();
    });
    $(window).resize(function () {
        scrollCheck();
    });
    $(window).click(function () {
        scrollCheck();
    });



    var CoffeeCart = require('../Cart/CoffeeCart');
    CoffeeCart.initialiseCart();
});

$( window ).on( "load", function() {
    // console.log( "window loaded" );
    scrollCheck();
});

