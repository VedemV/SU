/*
 * File	      : ErrorDialog.js
 * Created on : 22.04.2015 13:59:05
 */

//@require SU.ErrorMessage

/**
 * Диалоговое окно 'Сообщение об ошибке', вызываемое из Ext#errorMessage.
 *
 * @history 30.06.2019
 * Переработано для ExtJS 6.5.2+ modern
 *
 * @history 22.04.2015
 * Создание модуля
 */
Ext.define('SU.ErrorDialog', {
    extend: 'Ext.Dialog',
    alias: 'widget.errordialog',
    alternateClassName: ['Ext.ErrorDialog'],

    width: '90%',
    minWidth: 320,
    maxWidth: 600,
    closable: true,
    cls: 'x-error-dialog',

    //bodyPadding: 0,

    /**
     * @property {String}
     * Текст кнопки `Ок`
     */
    textOk: 'Ok',

    /**
     * @property {String}
     * Текст кнопки `Подробно`
     */
    textAdvansed: 'Advanced',

    /**
     * @property {String}
     * Текст заголовка окна по умолчанию
     */
    textErrorTitle: 'Error message',

    /**
     * @property {String}
     * Шаблон строки отображения количества сообщений
     */
    textErrorNumber: 'Error {0} of {1}',

    keyMap: {
        ESC: 'onEscape',
        ENTER: 'onEscape',
        scope: 'this'
    },

    initialize: function () {
        var me = this;

        me.setTitle(me.textErrorTitle);

        me.callParent(arguments);

        me.initNavigate();
        me.initMessageInfo();
        me.initDescription();

        me.setDefaultFocus(me.btnOk);

        if (Ext.os.deviceType === 'Phone') {
            me.setFullscreen(true);
            me.description.setFlex(1);
        } else {
            me.description.setHeight(Ext.ADVANSED_HEIGHT);
        }
    },

    initNavigate: function () {
        var me = this;

        /**
         * @property {Ext.Toolbar}
         * Панель отображения перехода между ошибками.
         * @private
         */
        me.navigate =
            me.navigate ||
            me.add({
                xtype: 'toolbar',
                docked: 'bottom',
                ui: 'upper'
            });

        /**
         * @property {Ext.Label}
         * Поле отображения количества ошибок и номера отображаемой ошибки.
         * @private
         */
        me.errorNumber =
            me.errorNumber ||
            me.navigate.add({
                xtype: 'label',
                flex: 1,
                ui: 'light'
            });

        /**
         * @property {Ext.Button}
         * Кнопка 'Назад' для перехода между ошибками.
         * Отображается когда в диалог передано несколько ошибок.
         * @private
         */
        me.btnPrev =
            me.btnPrev ||
            me.navigate.add({
                width: 50,
                text: '<<',
                cls: 'x-error-btn-prev',
                focusable: false,
                handler: 'onPrev',
                scope: me
            });

        /**
         * @property {Ext.Button}
         * Кнопка 'Вперед' для перехода между ошибками.
         * Отображается когда в диалог передано несколько ошибок.
         * @private
         */
        me.btnNext =
            me.btnNext ||
            me.navigate.add({
                width: 50,
                text: '>>',
                cls: 'x-error-btn-next',
                focusable: false,
                handler: 'onNext',
                scope: me
            });
    },

    initMessageInfo: function () {
        var me = this,
            container = me.add({
                xtype: 'container',
                layout: { type: 'hbox', align: 'stretch', pack: 'end' }
            }),
            buttons;

        /**
         * Иконка сообщения
         * @property {Ext.Component}
         * @private
         */
        me.icon = container.add({
            xtype: 'component',
            itemId: 'erroricon',
            cls: 'x-error-icon'
        });

        /**
         * Поле отображения информации об ошибке.
         * @property {Ext.Component}
         * @private
         */
        me.message = container.add({
            xtype: 'component',
            itemId: 'errormessage',
            height: 125,
            flex: 1,
            cls: 'x-error-message',
            scrollable: true
        });

        buttons = container.add({
            xtype: 'container',
            width: 115,
            layout: { align: 'stretch', type: 'vbox' }
        });

        /**
         * Кнопка 'OK'
         * @property {Ext.Button}
         * @private
         */
        me.btnOk = buttons.add({
            xtype: 'button',
            margin: 5,
            ui: 'action',
            text: me.textOk,
            handler: 'onOk',
            scope: me
        });

        /**
         * Кнопка 'Подробно'. Скрывает или показывает подробности сообщения.
         * @property {Ext.SegmentedButton}
         * @private
         */
        me.btnAdvansed = buttons.add({
            xtype: 'button',
            docked: 'bottom',
            margin: 5,
            ui: 'action',
            text: me.textAdvansed,
            focusable: false,
            enableToggle: true,
            toggleHandler: 'onAdvansed',
            scope: me
        });
    },

    initDescription: function () {
        var me = this;

        /**
         * Контейнер отображения дополнительной информации об ошибке.
         * @property {Ext.Container}
         * @private
         */
        me.description =
            me.description ||
            me.add({
                xtype: 'container',
                itemId: 'description',
                //hidden: true,
                scrollable: true,
                border: 1,
                cls: 'x-error-description'
            });
    },

    afterRender: function () {
        var me = this;

        me.callParent(arguments);
        me.focus();

        //me.setKeyMap({
        //    ENTER: function () { me.close(); }
        //});
    },

    /**
     * Обновляет сведения о количестве ошибок.
     *
     * @param {Object} config
     * @param {Number} config.count количество ошибок
     * @param {Object} config.current номер отображаемой ошибки
     *
     * @protected
     */
    updateNavigate: function (config) {
        config = config || {};

        var me = this,
            index = config.count ? config.current || 0 : -1,
            prevEnable = index > 0 && config.count > 1,
            nextEnable = index < config.count - 1 && config.count > 1,
            visible = config.count > 1;

        me.navigate.setHidden(!visible);
        me.btnNext.setDisabled(!nextEnable);
        me.btnPrev.setDisabled(!prevEnable);
        me.errorNumber.setHtml(Ext.String.format(me.textErrorNumber, index + 1, config.count));
    },

    /**
     * Обновление данных информационных полей из объекта ошибки
     *
     * @param {Ext.Error|Object} exception
     * Сообщение об ошибке
     *
     * @param {String} exception.message
     * текст сообщения об ошибке
     *
     * @param {String} exception.description (optional)
     * текст дополнительного описания ошибки
     *
     * @param {String} exception.title (optional)
     * заголовок окна
     *
     * @param {String} exception.icon (optional)
     * CSS класс иконки сообщения. По умолчанию {@link Ext#ERROR}.
     *
     * False - скрытие иконки
     *
     * @protected
     */
    updateException: function (exception) {
        var me = this,
            description = exception.description || '',
            msg = exception.message || exception.msg || exception.toString();

        me.setTitle(exception.title || me.textErrorTitle);

        msg = msg || 'UNKNOWN';
        //me.message.setHtml(msg.replace(/\n/g, '<br />'));
        me.message.setHtml(msg);

        me.icon.removeCls([Ext.INFO, Ext.WARNING, Ext.QUESTION, Ext.ERROR]);
        me.icon.addCls(exception.icon || Ext.ERROR);
        me.icon.setHidden(exception.icon === false);

        if (
            exception.stack &&
            me.statics().APPEND_STACK &&
            (me.statics().APPEND_STACK_EMPTY_DESCRIPTION || !!description)
        ) {
            description += '\n\n';
            description += exception.stack;
        }

        me.description.setHtml(description || '');

        me.btnAdvansed.setHidden(!description);
        me.description.setHidden(me.btnAdvansed.getHidden() || !me.btnAdvansed.getPressed());
    },

    /**
     * Обработка переключения кнопки `Дополнительно`.
     *
     * @private
     */
    doToggleAdvansed: function () {
        var me = this,
            errorDescription = me.down('#errordescription'),
            errorAdvansed = me.down('#erroradvansed'),
            visibled = errorAdvansed.pressed && errorAdvansed.isVisible();

        me.setMinHeight(visibled ? 260 : null);
        me.setHeight(null);
        errorDescription.setVisible(visibled);
    },

    /**
     * Обработка нажатия кнопки {@link #btnPrev переход к предыдущей ошибке}.
     * @param {Ext.Button} btn Кнопка
     * @param {Ext.event.Event} e Событие
     * @private
     */
    onPrev: function (btn, e) {
        e.stopEvent();
        this.fireEvent('changepos', btn, -1);
    },

    /**
     * Обработка нажатия кнопки {@link #btnNext переход к следующей ошибке}.
     * @param {Ext.Button} btn Кнопка
     * @param {Ext.event.Event} e Событие
     * @private
     */
    onNext: function (btn, e) {
        e.stopEvent();
        this.fireEvent('changepos', btn, 1);
    },

    /**
     * Обработка нажатия кнопки {@link #btnOk закрытия диалогового окна}.
     *
     * @param {Ext.Button} btn Кнопка
     * @param {Ext.event.Event} e Событие
     * @private
     */
    onOk: function (btn, e) {
        e.stopEvent();
        this.destroy();
    },

    /**
     * Обработка нажатий кнопки {@link #btnAdvansed скрыть|показать подробности сообщения}.
     *
     * @param {Ext.Button} btn Кнопка
     * @param {Boolean} pressed Состояние кнопки
     *
     * @private
     */
    onAdvansed: function (btn, pressed) {
        this.description.setHidden(!pressed);
    },

    statics: {
        /**
         * Управляет добавлением данных стека, при их наличии, в описание ошибки
         */
        APPEND_STACK: true,

        /**
         * Управляет добавлением данных стека в пустое описание.
         *
         * Как правило, пустое описание связано с выводом информационных сообщений.
         * Для ошибок описание всегда существует.
         */
        APPEND_STACK_EMPTY_DESCRIPTION: false
    }
});
