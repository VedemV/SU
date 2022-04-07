/**
 *
 */
Ext.define('SU.field.Search', {
    override: 'Ext.field.Search',
    alternateClassName: ['Ext.form.field.Search', 'Ext.form.SearchField'],

    config: {
        /**
         * @cfg {Boolean} [reuse=true]
         * Разрешает повторный вброс события #search
         * при неизмененном тексте
         */
        reuse: true
    },

    initialize: function () {
        var me = this,
            search = me.getTriggers().search;

        me.callParent();

        search.setHandler(function () {
            me.mybeFireSearch.apply(me, arguments);
        });

        me.on({
            specialkey: function (f, e) {
                if (e.getKey() === e.ENTER) {
                    e.stopEvent();
                    this.mybeFireSearch();
                }
            },
            change: function (f, v) {
                if (v.length === 0) {
                    this.mybeFireSearch();
                }
            }
        });
    },

    /**
     * @event search
     * Возникает по требованию пользоваля при нажатии
     *
     * - кнопки `search`,
     * - клавиши `ENTER`
     *
     * или при очистке поля ввода.
     *
     * Событие возникает только после изменения введенного значения.
     *
     * @param {Ext.form.Search} this
     * @param {String} [searchText]
     */

    /**
     * Обработка
     *
     * - триггерной кнопки поиска
     * - клавиши `ENTER
     * - очистки поля ввода
     *
     * Если необходимо - отправка события #search
     */
    mybeFireSearch: function () {
        var me = this,
            value = me.getValue();

        if (!!value && value.length > 0) {
            if (me.getReuse() || me.searchText !== value) {
                me.searchText = value;
                me.fireEvent('search', me, value);
            }
        } else {
            if (me.getReuse() || !!me.searchText) {
                me.searchText = undefined;
                me.fireEvent('search', me, null);
            }
        }
    }
});
