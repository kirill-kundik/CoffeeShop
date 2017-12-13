$(function () {
    $('#datetimepicker3').datetimepicker({
        format: 'LT'
    });

    var regex = require('./regex');
    regex.initializeRegex();
});