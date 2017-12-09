var basil = require('basil.js');
var storage = new basil();

exports.get = function (key) {
    return storage.get(key);
};

exports.set = function (key, value) {
    return storage.set(key, value);
}