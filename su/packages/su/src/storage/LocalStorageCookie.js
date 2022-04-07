/**
 * Cookie менеджер для длительного хранения пользовательских данных,
 * основанный на HTML5 `localStorage` API.
 *
 * Пример использования
 * --------------------
 * #### Инициализация
 * Cookie менеджер не нуждается в инициализации и
 * доступен как `Ext.Cookie` или `Pallada.LocalStorageCookie`.
 *
 * #### Инициализация с настройкой
 * Настройка должна быть выполнена до использования любого метода
 * изменения или чтения данных:
 *
 *     Ext.Cookie.{@link #setProxyId}('com.mydomain.cookies');
 *
 * #### Установка значения
 *     Ext.Cookie.{@link #set}('some_setting', 'some_value');
 *
 * #### Чтение значения
 *     Ext.Cookie.{@link #get}('some_setting');
 *
 * #### Удаление значения
 *     Ext.Cookie.{@link #del}('some_setting');
 *
 * @history 17.12.2016
 * Правки по результатам selenium тестов
 *
 * @history 14.10.2013
 * Создание модуля.
 */
Ext.define('SU.storage.LocalStorageCookie', {
    alternateClassName: ['Ext.Cookie', 'SU.LocalStorageCookie'],
    singleton: true,

    requires: ['SU.storage.CookieProvider', 'Ext.data.proxy.LocalStorage', 'Ext.data.Store'],

    config: {
        /**
         * Уникальный идентификатор приложения, используется в качестве ключа,
         * под которым все данные приложения хранятся в локальном объекте хранения.
         */
        proxyId: 'app.cookies'
    },

    constructor: function (config) {
        var me = this;
        me.callParent(arguments);
        me.isStorage = !!window.localStorage;
    },

    updateProxyId: function () {
        Ext.destroy(this.store);
        this.store = null;
        this.getStore();
    },

    /**
     * Возвращает, и при необходимости создает, набор данных с ключем #proxyId.
     *
     * @return {Ext.data.Store}
     * @private
     */
    getStore: function () {
        var me = this;

        if (!me.store) {
            if (!me.isStorage) {
                me.store = new SU.storage.CookieProvider({
                    prefix: me.getProxyId() + '-'
                });
            } else {
                me.store = new Ext.data.Store({
                    autoSync: true,
                    fields: ['key', 'value'],
                    proxy: {
                        type: 'localstorage',
                        id: me.getProxyId()
                    }
                });
                me.store.load();
            }
        }
        return me.store;
    },

    /**
     * Возвращает значение параметра.
     *
     * Если параметр не найден, возвращается `undefined`.
     *
     * @param {String} key имя параметра
     * @return {Mixed}
     */
    get: function (key) {
        var me = this,
            store = me.getStore(),
            index,
            record;

        if (!me.isStorage) return store.get(key);

        index = store.find('key', key, 0, false, true, true);
        if (~index) {
            record = store.getAt(index);
            return record.get('value');
        }
    },

    /**
     * Устанавливает значение параметра.
     *
     * Возвращает `true` при успешной записи значения.
     *
     * @param {String} key имя параметра
     * @param {Mixed} value значение
     * @return {Boolean}
     */
    set: function (key, value) {
        var me = this,
            store = me.getStore(),
            index,
            record;

        if (!me.isStorage) {
            store.set(key, value);
            return true;
        }

        index = store.find('key', key, 0, false, true, true);
        if (~index) {
            record = store.getAt(index);
            record.set('value', value);
            record.commit();
        } else {
            record = Ext.create(store.getModel(), { key: key, value: value });
            store.data.add(record);
        }
        store.sync();
        return !!record;
    },

    /**
     * Удаляет параметр.
     *
     * Возвращает `true` при успешном удалении.
     *
     * @param {String} key имя параметра
     * @return {Boolean}
     */
    del: function (key) {
        var me = this,
            store = this.getStore(),
            index,
            record;

        if (!me.isStorage) {
            store.clear(key);
            return true;
        }

        index = store.find('key', key, 0, false, true, true);
        if (~index) {
            record = store.getAt(index);
            store.remove(record);
            store.sync();
            return true;
        }
        return false;
    }
});
