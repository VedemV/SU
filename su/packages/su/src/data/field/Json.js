/**
 * Поле данных автоматически преобразующее значение JSON-строки в Object.
 *
 */
Ext.define('SU.data.field.Json', {
    extend: 'Ext.data.field.Field',
    alternateClassName: ['Ext.data.field.Json'],

    alias: 'data.field.json',

    isJsonField: true,

    /**
     * @cfg {Boolean} serialized=true
     * true - значение поля преобразуется в строку
     */
    serialized: true,

    /**
     * @inheritdoc
     * @localdoc
     * Преобразование JSON-строки в Object.
     *
     * При неудачном преобразовании возвращает null или пустой массив
     * в зависимости от #allowNull.
     *
     * @param {Mixed} v -
     * @return {Mixed} -
     */
    convert: function (v) {
        var me = this;

        if (v === undefined || v === null || v === '') {
            return me.allowNull ? null : [];
        }

        if (typeof v === 'string') {
            try {
                v = JSON.parse(v || '[]');
            } catch (e) {
                // <debug>
                // eslint-disable-next-line no-console
                console.log(e);
                // </debug>
                return me.allowNull ? null : [];
            }
        } else if (Ext.isArray(v)) {
            v = Ext.Array.clone(v);
        } else {
            v = Ext.Object.chain(v);
        }

        // me.rawValue = JSON.stringify(v);
        return v;
    },

    serialize: function (v, record) {
        var me = this;

        if (me.allowNull && (v === undefined || v === null)) {
            // me.rawValue = this.allowNull ? null : JSON.stringify([]);
            return null;
        }

        if (v) {
            // me.rawValue === JSON.stringify(v);
            return me.serialized ? JSON.stringify(v) : v;
        } else {
            // me.rawValue = me.allowNull ? null : JSON.stringify([]);
            return null;
        }
    },

    isEqual: function (value1, value2) {
        var me = this;

        try {
            if (value1 === value2) {
                return (
                    (value1 ? JSON.stringify(value1) : me.allowNull ? null : JSON.stringify([])) ===
                    (value2 ? JSON.stringify(value2) : me.allowNull ? null : JSON.stringify([]))
                );
            }
            return false;
        } catch (e) {
            // <debug>
            // eslint-disable-next-line no-console
            console.log(e);
            // </debug>
            return false;
        }
    },

    getType: function () {
        return 'json';
    }
});
