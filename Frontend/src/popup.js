var Templates = require('./Templates');
var $parent = $("#popups");

function new_popup(str) {
    var html_code = Templates.popup({str: str});
    var $node = $(html_code);

    $parent.append($node);
    $node.fadeIn("fast");
    $node.addClass('slide-up');
    setTimeout(function () {
        $node.removeClass('slide-up');
        $node.fadeOut("fast", function () {
            $node.remove();
        });
    }, 2000);
}

exports.new_popup = new_popup;