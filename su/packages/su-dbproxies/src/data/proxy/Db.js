/**
 * Ѕазовый класс дл€ {@link DBProxies.data.proxy.IndexedDB IndexedDB} и {@link DBProxies.data.proxy.Sql Sql} прокси.
 * @private
 */
Ext.define('SU.dbproxies.data.proxy.Db', {
    extend: 'Ext.data.proxy.Client',

    config: {
        /**
         * @cfg {Boolean} cloud
         * —ледует ли хранить локальные операции в хранилище локальных операций сеанса дл€ загрузки в облако.
         * ¬еро€тно, это ничего не значит дл€ вас, если вы не используете облачную систему, совместимую с этими прокси.
         */
        cloud: false,

        /**
         * @cfg {Boolean} implicitFields
         * —ледует ли также сохран€ть не€вные пол€ в записи. 
         * Ќе€вные пол€ - это поле, которое не было €вно определено в конфигурации полей модели, но было установлено в записи
         */
        implicitFields: false
    },

    /**
     * @cfg {Object} reader
     * Ќе используетс€ в db-прокси
     * @hide
     */

    /**
     * @cfg {Object} writer
     * Ќе используетс€ в db-прокси
     * @hide
     */

    setException: function (operation, error) {

        operation.setException(error);

    }

});
