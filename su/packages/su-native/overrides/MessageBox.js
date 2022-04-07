/**
 * Подменяет окна сообщений Ext.Msg#alert, Ext.Msg#confirm
 * и Ext.Msg#prompt нативными диалогами при сборке в `cordova`
 * с подключенным плагином
 * [cordova-plugin-dialogs](https://www.npmjs.com/package/cordova-plugin-dialogs).
 *
 */
Ext.define(
    'SU.native.overrides.MessageBox',
    {
        override: 'Ext.MessageBox',

        /**
         * @property {Boolean} nativeDialog
         * `false` выключает использование нативных диалогов
         */
        nativeDialog: false,

        show: function (msgBoxOptions) {
            if (!navigator.notification || !this.nativeDialog) {
                return this.callParent(arguments);
            }

            var me = this,
                method,
                buttons;
            msgBoxOptions = msgBoxOptions || {};

            me.setButtons(msgBoxOptions.buttons || Ext.MessageBox.OK);
            buttons = me.getButtons();
            buttons = buttons.items.items.map(function (btn) {
                return { text: btn.getText(), itemId: btn.getItemId() };
            });

            method = msgBoxOptions.prompt ? 'prompt' : buttons.length > 1 ? 'confirm' : 'alert';

            navigator.notification[method].call(
                me,
                msgBoxOptions.message || '',
                function (results) {
                    results = results || {};
                    var buttonIndex = (typeof results === 'number' ? results : results.buttonIndex) || 1,
                        value = results.input1;

                    if (msgBoxOptions.fn) {
                        Ext.callback(msgBoxOptions.fn, msgBoxOptions.scope, [buttons[--buttonIndex].itemId, value]);
                    }
                },
                msgBoxOptions.title || 'Alert',
                buttons.map(function (btn) {
                    return Ext.String.capitalize(btn.text);
                }),
                msgBoxOptions.value
            );
        }
    },
    function () {
        Ext.onReady(function () {
            Ext.MessageBox.prototype.nativeDialog = !!navigator.notification;
        });
    }
);
