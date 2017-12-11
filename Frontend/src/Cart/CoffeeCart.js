String.prototype.contains = function (substring) {
    return this.toLowerCase().indexOf(substring.toLowerCase()) !== -1;
};

var Templates = require('../Main/Templates');
var cart_key = "cart_key";
var storage = require("./storage");

var sizes = {
    Big: "big_size",
    Middle: "middle_size",
    Small: "small_size"
};

var Cart = storage.get(cart_key);
if (!Cart) Cart = [];


var $cart;
var $footer_cart;
var $counter;

var cart_page;

if(window.location.href.contains('cart')) {
    cart_page = true;
    $cart = $(".items");
    $footer_cart = $(".sum-inner");
    $counter = $(".counter");

} else {
    cart_page = false;
    $cart = $("#header-cart-list");
    $footer_cart = $(".sum");
    $counter = $(".items-count");
}

function addToCart(item, size) {

    var added = false;
    Cart.forEach(function (cart_item) {
        if (!added) {
            if (cart_item.item.title === item.title && cart_item.size === size) {
                cart_item.quantity += 1;
                added = true;
            }
        }
    });
    if (!added) {
        Cart.push({
            item: item,
            size: size,
            quantity: 1
            //is_editable: window.location.href === !window.location.href.contains("order.html")
        });
    }

    updateCart();
}

function removeFromCart(cart_item) {
    var i = Cart.indexOf(cart_item);
    Cart.splice(i, 1);
}

function delete_all() {
    Cart = [];
}

function initialiseCart() {
    updateCart();
}

function getItemsInCart() {
    return Cart;
}

function updateCart() {
    $cart.html("");

    function showOneItemInCart(cart_item) {

        //cart_item.is_editable = !window.location.href.contains("order.html");

        var html_code = cart_page ? Templates.Cart_OneItem(cart_item) : Templates.CartHeader_OneItem(cart_item);
        var $node = $(html_code);

        $node.find(".plus-amount").click(function () {
            // popup.new_popup();
            cart_item.quantity += 1;
            updateCart();
        });

        $node.find(".minus-amount").click(function () {
            cart_item.quantity -= 1;
            if (cart_item.quantity <= 0) {
                removeFromCart(cart_item);
            }
            updateCart();
        });

        if(cart_page) {
            $node.find(".delete").click(function () {
                removeFromCart(cart_item);
                updateCart();
            });
        }

        $cart.append($node);
    }


    if(cart_page) {
        $(".clear-all").click(function () {
            delete_all();
            updateCart();
        });
    }

    $footer_cart.find(".sum-text").text(getSum());

    var $order_btn = $footer_cart.find(".make-order");
    if (Cart.length > 0) {
        if ($order_btn.hasClass('disabled')) {
            $order_btn.removeClass("disabled").attr("rel", null);
        }
    } else {
        $cart.append('<div class="label-empty">Кошик пустий</div>');
        if (!$order_btn.hasClass('disabled')) {
            $order_btn.addClass("disabled").attr("rel", "tooltip");
        }
    }


    Cart.forEach(showOneItemInCart);
    storage.set(cart_key, Cart);
    setCounter();
}

function setCounter() {
    var count = 0;
    Cart.forEach(function (t) { count += t.quantity; });
    if(count > 0) {
        $counter.show();
    } else {
        $counter.hide();
    }
    $counter.text(count);
}

function getSum() {
    var sum = 0;
    Cart.forEach(function (t) {
        sum += parseInt(t.item[t.size].price) * parseInt(t.quantity);
    });
    return sum;
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getItemsInCart = getItemsInCart;
exports.initialiseCart = initialiseCart;

exports.sizes = sizes;

exports.getSum = getSum;