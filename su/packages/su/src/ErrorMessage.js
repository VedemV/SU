/*
 * Project    : Lib Packages Common
 * File	      : ErrorMessage.js
 * Created on : 22.04.2015 13:27:27
 */

//@define SU.ErrorMessage

/**
 * @class Ext
 *
 * @history 22.04.2015
 * Создание модуля
 *
 * @singleton
 */
(function () {
    /*
     * Список сообщений об ошибках
     */
    var errorList = [];

    /*
     * Окно сообщений об ошибках
     */
    var dlg;

    /*
     * Номер отображаемой ошибки
     */
    var errorIndex = -1;

    /*
     * Создание окна вывода сообщения об ошибке
     */
    function createDialog() {
        dlg = Ext.create('Ext.ErrorDialog', {
            listeners: {
                destroy: onDestroy,
                close: onClose,
                changepos: onChangePos
            }
        });
        //		dlg.render( document.body );
        //		dlg.getEl().addClass( 'x-window-dlg' );
        //		dlg.setIcon( Ext.ERROR );
    }

    /*
     * Отображение номера показываемой ошибки
     */
    function refreshNumber(index) {
        !!dlg &&
            dlg.updateNavigate({
                current: index,
                count: errorList.length
            });
    }

    /*
     * Обработка уничтожения окна
     */
    function onDestroy() {
        dlg = undefined;
        errorList = [];
    }

    /*
     * Обработка при закрытии окна
     */
    function onClose() {
        // Вызов обработчиков
        for (var i = 0, len = errorList.length; i < len; i++) {
            if (errorList[i].handler && typeof errorList[i].handler === 'function')
                errorList[i].handler.call(errorList[i].scope || this, this, errorList[i]);
        }
    }

    /*
     * Смещение к сообщению об ошибке
     * @param {Object} b
     * @param {Number} step Смещение
     */
    function onChangePos(b, step) {
        Ext.setError(errorIndex + step);
    }

    /**
     * Установка на отображение указанного сообщения об ошибке
     * @param {Number} index Номер сообщения в сохраненном списке
     */
    Ext.setError = function setError(index) {
        if (!dlg || index < 0 || index >= errorList.length) {
            return;
        }
        errorIndex = index;
        refreshNumber(index);
        dlg.updateException(errorList[index]);
    };

    /**
     * Вывод сообщений об ошибке с использованием настройки окна
     *
     * @param {Object} options
     * Параметры сообщения и настройки окна
     * @param {Number} options.code код ошибки
     * @param {String} options.message текст сообщения об ошибке
     * @param {String} options.description (optional) текст описания ошибки
     * (при отсутствии параметра детализация по ошибке не показывается)
     * @param {String} options.title (optional) заголовок окна
     * @param {String} options.icon (optional) картинка, рядом с текстом ошибки.
     * По умолчанию {@link Ext#ERROR}.
     * @param {Function} options.handler (optional)
     * Функция окончательной обработки ошибки
     * @param {Object} options.scope (optional) Область видимости при вызове <tt>handler</tt>.
     * По умолчанию - {@link Ext.ErrorDialog}
     */
    Ext.errorMessage = function errorMessage(options) {
        var me = this;
        // Добавление сообщения в список
        !!options && errorList.push(options);

        // Создание окна, если не создано
        if (!dlg) {
            createDialog();
        }
        if (dlg.isHidden()) {
            // Если ранее не показывалось - показываем последнюю ошибку
            dlg.show();
            me.setError(errorList.length - 1);
        } else {
            // иначе - обновляем инфу о количестве ошибок
            refreshNumber(errorIndex);
            //dlg.show();
        }
    };

    /**
     * CSS класс иконки сообщения.
     * @type {String}
     */
    Ext.INFO = 'ext-mb-info';

    /**
     * CSS класс иконки прадупреждения.
     * @type {String}
     */
    Ext.WARNING = 'ext-mb-warning';

    /**
     * CSS класс иконки запроса.
     * @type {String}
     */
    Ext.QUESTION = 'ext-mb-question';

    /**
     * CSS класс иконки ошибки.
     * @type {String}
     */
    Ext.ERROR = 'ext-mb-error';

    /**
     * Высота панели описания ошибки.
     * @type {Number}
     */
    Ext.ADVANSED_HEIGHT = 150;
})();
