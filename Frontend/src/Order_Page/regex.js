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