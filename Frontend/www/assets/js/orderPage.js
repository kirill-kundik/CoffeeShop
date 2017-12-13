(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(function () {
    $('#datetimepicker3').datetimepicker({
        format: 'LT'
    });

    var regex = require('./regex');
    regex.initializeRegex();
});
},{"./regex":2}],2:[function(require,module,exports){
// ******** VALIDATE INPUT *********

function initializeRegex() {
    $('#error-name').hide();
    $('#inputName').on('input', function () {
        validateName();
    });

    $('#error-phone').hide();
    $('#inputPhone').on('input', function () {
        validatePhone();
    });
}

function validateName() {
    var regex = /^[a-zA-Zа-яА-Я \-]{2,30}$/;
    var valid = regex.test($('#inputName').val());

    if (!valid) {
        $('#error-name').show();
        $('#nameGroup').addClass('has-error');
        $('#nameGroup').removeClass('has-success');
    } else {
        $('#error-name').hide();
        $('#nameGroup').addClass('has-success');
        $('#nameGroup').removeClass('has-error');
    }
    return valid;
}

function validatePhone() {
    var regex = /^(\+380|0)([0-9]\d{8})$/;
    var valid = regex.test($('#inputPhone').val());

    if (!valid) {
        $('#error-phone').show();
        $('#phoneGroup').addClass('has-error');
        $('#phoneGroup').removeClass('has-success');
    } else {
        $('#error-phone').hide();
        $('#phoneGroup').addClass('has-success');
        $('#phoneGroup').removeClass('has-error');
    }
    return valid;
}

exports.initializeRegex = initializeRegex;
},{}]},{},[1]);
