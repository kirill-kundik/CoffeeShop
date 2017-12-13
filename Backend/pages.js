exports.mainPage = function(req, res) {
    res.render('mainPage\\mainPage', {
        pageTitle: 'Головна',
        pageName: 'main'
    });
};

exports.menuPage = function(req, res) {
    res.render('menuPage\\menuPage', {
        pageTitle: 'Меню',
        pageName: 'menu'
    });
};

exports.cartPage = function(req, res) {
    res.render('cartPage\\cartPage', {
        pageTitle: 'Кошик',
        pageName: 'cart'
    });
};

exports.orderPage = function(req, res) {
    res.render('orderPage\\orderPage', {
        pageTitle: 'Замовлення',
        pageName: 'order'
    });
};

exports.infoPage = function(req, res) {
    res.render('infoPage\\infoPage', {
        pageTitle: 'Заклади',
        pageName: 'info'
    });
};

exports.aboutUsPage = function(req, res) {
    res.render('aboutUsPage\\aboutUsPage', {
        pageTitle: 'Про нас',
        pageName: 'about'
    });
};

