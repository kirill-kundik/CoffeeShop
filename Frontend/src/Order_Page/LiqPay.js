function initLiqPay() {
    var sum = require('../Cart/CoffeeCart').getSum();
    var items_in_order = "";

    require('../Cart/CoffeeCart').getItemsInCart().forEach(function (t) {
        items_in_order += "- " + t.quantity + "шт. [" + (t.size === 'big_size' ? 'Велика' : 'Мала') + "] "
            + t.item.title + ";\n";
    });

    var order_info = {
        amount: sum,
        description: "test_description" +
        // description: 'Замовлення піци: ' + $('#inputName').val() + '\n' +
        // 'Адреса доставки: ' + $('#inputAddress').val() + '\n' +
        // 'Телефон: ' + $('#inputPhone').val() + '\n' +
        // items_in_order +
        '\nРазом ' + sum + 'грн'
    };
    require('../FrontendAPI.js').createOrder(order_info, function (err, data) {
        if (!err) {
            LiqPayCheckout.init({
                data: data.data,
                signature: data.signature,
                embedTo: "#liqpay",
                mode: "popup"	//	embed	||	popup
            }).on("liqpay.callback", function (data) {
                console.log(data.status);
                console.log(data);
            }).on("liqpay.ready", function (data) {
                //	ready
            }).on("liqpay.close", function (data) {
                //	close
            });
        }
    });
}

exports.initLiqPay = initLiqPay;