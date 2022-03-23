/**
 * 
 */
Ext.define('SU.field.Text', {
    override: 'Ext.field.Text',

    config: {
        /**
         * @cfg {RegExp} maskRe optional
         * RegExp маска вводимых символов
         */
        maskRe: undefined,

        /**
         * @cfg {Boolaen} maskRawValue=false
         * применяется совместно с maskRe,
         * true - проверка всего введенного значения
         */
        maskRawValue: false
    },

    initialize: function () {
        var me = this;

        me.callParent(arguments);

        if (me.getMaskRe()) {
            me.mon(me.el, 'keypress', me.filterKeys, me);
        }
    },

    filterKeys: function (e) {

        if (e.ctrlKey && !e.altKey || e.isSpecialKey()) return;

        var charCode = String.fromCharCode(e.getCharCode()),
            raw = this.getValue() || '',
            value = this.getMaskRawValue() ? raw + charCode : charCode;

        if (!this.getMaskRe().test(value)) {
            e.stopEvent();
        }
    }
});
