var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
            callback(null, data);
        },
        error: function () {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getList = function (callback) {
    backendGet("/api/get-list/", callback);
};

exports.getShops = function (callback) {
    backendGet("/api/get-shops/", callback);
};

exports.createOrder = function (order_info, callback) {
    backendPost("/api/create-order/", order_info, callback);
};
