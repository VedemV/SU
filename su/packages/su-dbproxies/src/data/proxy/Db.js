/**
 * Базовый класс для {@link DBProxies.data.proxy.IndexedDB IndexedDB} и {@link DBProxies.data.proxy.Sql Sql} прокси.
 * @private
 */
Ext.define('SU.dbproxies.data.proxy.Db', {
    extend: 'Ext.data.proxy.Client',

    config: {
        /**
         * @cfg {Boolean} cloud
         * Следует ли хранить локальные операции в хранилище локальных операций сеанса для загрузки в облако.
         * Вероятно, это ничего не значит для вас, если вы не используете облачную систему, совместимую с этими прокси.
         */
        cloud: false,

        /**
         * @cfg {Boolean} implicitFields
         * Следует ли также сохранять неявные поля в записи.
         * Неявные поля - это поле, которое не было явно определено в конфигурации полей модели, но было установлено в записи
         */
        implicitFields: false
    },

    /**
     * @cfg {Object} reader
     * Не используется в db-прокси
     * @hide
     */

    /**
     * @cfg {Object} writer
     * Не используется в db-прокси
     * @hide
     */

    setException: function (operation, error) {
        operation.setException(error);
    }
});
