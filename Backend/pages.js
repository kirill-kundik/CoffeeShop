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