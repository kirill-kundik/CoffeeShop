/**
 * Created by chaika on 02.02.16.
 */
var fs = require('fs');
var ejs = require('ejs');


exports.Menu_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/Menu_OneItem.ejs', "utf8"));
exports.Cart_OneItem = ejs.compile(fs.readFileSync('./Frontend/templates/Cart_OneItem.ejs', "utf8"));
