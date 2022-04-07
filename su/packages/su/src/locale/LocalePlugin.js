/**
 * Общий класс для ExtJS 4.2+ / Sencha Touch 2.3+
 *
 * Плагин для регистрации компонента в Ext.Language.
 *
 */
Ext.define('SU.locale.LocalePlugin', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.localization',

    requires: ['SU.locale.model.ClientModel'],

    config: {
        /**
         * Метод копонента, вызываемый при изменении локализации.
         * @cfg {Function/String} method
         * @cfg {Mixed} method.property
         * Значение найденное в Ext.Language#properties по ключу #key
         * или Ext.Language#properties если ключ #key не указан или
         * значение не найдено.
         */
        method: Ext.EmptyFn,

        /**
         * Ключ для поиска значения в {@link Ext.Language#properties}.
         * @cfg {String} key
         */
        key: ''
    },

    /**
     * Инициализация плагина при создании компонента.
     * Регистрирует компонент в Ext.Language.
     *
     * @param {Ext.Component} client
     */
    init: function (client) {
        this.clientModel = Ext.create('SU.locale.model.ClientModel', {
            client: client,
            method: this.getMethod(),
            key: this.getKey()
        });

        SU.locale.LocaleManager.registerClient(this.clientModel);
    },

    destroy: function () {
        SU.locale.LocaleManager.unregisterClient(this.clientModel);
        this.callParent(arguments);
    }
});
