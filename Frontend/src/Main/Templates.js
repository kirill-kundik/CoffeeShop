var fs = require('fs');
var ejs = require('ejs');


exports.Menu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/Menu_OneItem.ejs', "utf8"));
exports.CartHeader_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/CartHeader_OneItem.ejs', "utf8"));
exports.Cart_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/Cart_OneItem.ejs', "utf8"));
exports.popup = ejs.compile(fs.readFileSync('./Frontend/templates/popup.ejs', "utf8"));
exports.empty_cart = ejs.compile(fs.readFileSync('./Frontend/templates/empty_cart.ejs', "utf8"));
