/**
 * Простое поле поиска, аналогичное полю поиска в `modern`, по оформлению
 * соответствует полю ввода `<input type="search">` HTML5.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         renderTo: Ext.getBody(),
 *         items: [
 *             {
 *                 xtype: 'searchfield',
 *                 fieldLabel: 'Query',
 *                 name: 'query',
 *                 listeners: {
 *                     search: function(f, text){
 *                         alert('Search text: ' + (text || 'null'));
 *                     }
 *                 }
 *             }
 *         ]
 *     });
 *
 *
 */
Ext.define('SU.form.field.Search', {
    extend: 'Ext.form.field.Text',
    alternateClassName: ['Ext.form.field.Search', 'Ext.form.Search', 'Ext.form.SearchField'],
    alias: 'widget.searchfield',

    /**
     * @cfg {String} cls='x-form-type-search'
     * @inheritdoc
     */
    cls: Ext.baseCSSPrefix + 'form-type-search',

    config: {
        /**
         * @cfg {Boolean} [reuse=true]
         * Разрешает повторный вброс события #search
         * при неизмененном тексте
         */
        reuse: true
    },

    /**
     * @cfg {Object} triggers={clear,search}
     * @inheritdoc
     */
    triggers: {
        clear: {
            weight: 0,
            cls: Ext.baseCSSPrefix + 'form-clear-trigger',
            hidden: true,
            handler: 'doClear',
            scope: 'this'
        },

        search: {
            weight: 1,
            cls: Ext.baseCSSPrefix + 'form-search-trigger',
            handler: 'mybeFireSearch',
            scope: 'this'
        }
    },

    listeners: {
        specialkey: function (f, e) {
            if (e.getKey() === e.ENTER) {
                e.stopEvent();
                this.mybeFireSearch();
                return false;
            }
        },

        change: function (f, v) {
            this.syncClearTrigger();
            if (v.length === 0) {
                this.mybeFireSearch();
            }
        }
    },

    privates: {
        syncClearTrigger: function () {
            var me = this,
                clear = me.getTriggers().clear,
                value = me.getValue();

            clear.setVisible(!!value);
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
         * Обработка триггерной кнопки очистки
         * @private
         */
        doClear: function () {
            this.setValue('');
        },

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
    }
});
