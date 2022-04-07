/**
 * CaptchaField для Google reCAPTCHA v2
 *
 * Для подключения добавить в файл `app.json` в секцию js
 *
 *     {
 *         "path": 'https://www.google.com/recaptcha/api.js?render=explicit',
 *         "remote": true
 *     }
 *
 * Чтобы начать работу, вам нужно будет зарегистрировать
 * свой сайт {@link https://www.google.com/recaptcha/admin/create на этой странице},
 * выбрав опции `reCAPTCHA v2` и `Флажок "Я не робот"`.
 *
 */
Ext.define('SU.field.Captcha', {
    extend: 'Ext.field.Field',
    alternateClassName: ['Ext.field.Captcha', 'Ext.form.field.Captcha'],
    xtype: 'captchafield',

    config: {
        /**
         * @cfg {String} siteKey (required)
         * ключ в HTML-коде, который ваш сайт передает на устройства пользователей
         */
        siteKey: undefined,

        /**
         * @cfg {String} theme
         * тема reCAPTCHA `light` или `dark`
         */
        theme: 'dark'

        /**
         * @cfg {String} render
         * oload or explicit
         */
        //render: 'explicit'
    },

    isField: true,

    classCls: Ext.baseCSSPrefix + 'capchafield',
    capchaCls: 'g-recaptcha',

    isCaptchaValid: false,

    initialize: function () {
        var me = this,
            po,
            s;

        me.callParent(arguments);

        if (window.grecaptcha) {
            grecaptcha.ready(Ext.bind(me.renderGCaptcha, me));
        } else {
            me.addCls('x-grecaptcha-error');
        }
    },

    getBodyTemplate: function () {
        return [
            {
                reference: 'captchaElement',
                cls: this.capchaCls
            }
        ];
    },

    updateSiteKey: function (value) {
        this.captchaElement.dom.dataset.sitekey = value;
    },

    updateTheme: function (value) {
        this.captchaElement.dom.dataset.theme = value;
    },

    renderGCaptcha: function () {
        var me = this;

        grecaptcha.render(me.captchaElement.id, {
            callback: function (response) {
                me.verifyCallback.call(me, response);
            },
            'expired-callback': function () {
                me.onRecaptchaExpired.call(me);
            },
            'error-callback': function () {
                me.onErrorCallback.call(me);
            }
        });
    },

    verifyCallback: function (response) {
        var me = this;

        me.isCaptchaValid = response.length > 0;
        if (me.isCaptchaValid) {
            me.setValue(response);
            me.fireEvent('recaptchavalid', me);
        } else {
            me.setValue();
            me.fireEvent('recaptchainvalid', me);
        }
    },

    onRecaptchaExpired: function () {
        var me = this;

        me.isCaptchaValid = false;
        me.setValue();
        me.fireEvent('recaptchaexpired', me);
    },

    onErrorCallback: function () {
        var me = this;

        me.isCaptchaValid = false;
        me.setValue();
        this.fireEvent('recaptchaerror', me);
    },

    validate: function () {
        var me = this;
        return me.isDisabled() || me.isCaptchaValid;
    }
});
