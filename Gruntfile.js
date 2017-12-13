
module.exports = function(grunt) {
    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify:     {
            //Загальні налаштування (grunt-browserify)
            options:      {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/"
                }
            },

            menu: {
                src:        'Frontend/src/Menu/mainMenu.js',
                dest:       'Frontend/www/assets/js/mainMenu.js'
            },

            mainPage: {
                src:        'Frontend/src/Main_Page/mainPage.js',
                dest:       'Frontend/www/assets/js/mainPage.js'
            },

            cartPage: {
                src:        'Frontend/src/Cart/cartPageMain.js',
                dest:       'Frontend/www/assets/js/cartPage.js'
            },

            orderPage: {
                src:        'Frontend/src/Order_Page/orderPageMain.js',
                dest:       'Frontend/www/assets/js/orderPage.js'
            },

            infoPage: {
                src:        'Frontend/src/Info_Page/infoPageMain.js',
                dest:       'Frontend/www/assets/js/infoPage.js'
            },

            aboutPage: {
                src:        'Frontend/src/about_Page/aboutPage.js',
                dest:       'Frontend/www/assets/js/aboutPage.js'
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:menu', 'browserify:mainPage', 'browserify:cartPage', 'browserify:orderPage',
                'browserify:infoPage', 'browserify:aboutPage']
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Список завданнь по замовчування
    grunt.registerTask('default',
        [
            'browserify:menu',
            'browserify:mainPage',
            'browserify:cartPage',
            'browserify:orderPage',
            'browserify:infoPage',
            'browserify:aboutPage'
            //Інші завдання які необхідно виконати
        ]
    );

};