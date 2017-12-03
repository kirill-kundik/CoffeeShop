var $header_cart_btn = $(".cart-button");
var $header_cart = $("#cart_header");

var show_header_cart = false;

function init_header_cart() {
    function hide_cart() {
        show_header_cart = false;
        setTimeout(function () {
            if (!show_header_cart)
                $header_cart.fadeOut(200);
        }, 500);
    }

    $header_cart_btn.hover(function () {
            show_header_cart = true;
            $header_cart.fadeIn(200);
        },
        function () {
            hide_cart();
        });

    $header_cart.hover(function () {
        show_header_cart = true;
        // $header_cart.fadeIn(200);
    }, function () {
        hide_cart();
    });
}

exports.init_header_cart = init_header_cart;