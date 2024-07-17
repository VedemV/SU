/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('WSEcho.Application', {
    extend: 'Ext.app.Application',

    requires: ['SU.WebSocket', 'SU.locale.LocaleManager', 'SU.storage.LocalStorageCookie'],

    name: 'WSEcho',
    quickTips: true,

    stores: ['Locales'],
    // controllers: ['Main'],

    init: function () {
        var me = this;
        Ext.Cookie.setProxyId(me.getName() + '.cookies');
        this.initLocales();
    },

    launch: function () {
        // <debug>
        console.log('WSEcho.controller.Main.onLaunch');
        // </debug>
        var me = this,
            ws = me.getWebSocket();
        // ws.on({
        //     changestate: me.wsHandlerChangeState,
        //     beforeconnect: me.wsHandlerBeforeConnect,
        //     connect: me.wsHandlerConnect,
        //     afterconnect: me.wsHandlerAfterConnect,
        //     beforedisconnect: me.wsHandlerBeforeDisconnect,
        //     disconnect: me.wsHandlerDisconnect,
        //     send: me.wsHandlerSend,
        //     message: me.wsHandlerMessage,
        //     exception: me.wsHandlerException,
        //     scope: me
        // });
    },

    getWebSocket: function () {
        var me = this;
        if (!me.ws) {
            me.ws = new SU.WebSocket({
                //url: 'ws://echo.websocket.org/'
            });
        }
        return me.ws;
    },

    initLocales: function () {
        var me = this,
            lm = SU.locale.LocaleManager,
            locale;

        Ext.Language.mode = 'dinamic';
        lm.setLocales(this.getStore('localesStore'));

        // Запустим приложение после инициализации LocaleManager
        lm.on({
            initialized: {
                fn: me.doInitLocales,
                single: true,
                scope: me
            }
        });

        // Определение текущей локали
        locale = lm.getPersistedLocale();
        lm.setLocale(locale);
    },

    doInitLocales: function () {
        this.setMainView('Main');
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?', function (choice) {
            if (choice === 'yes') {
                window.location.reload();
            }
        });
    }
});
