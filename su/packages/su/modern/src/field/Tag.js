/**
 * Поле выбора нескольких значений из списка.
 * 
 *     @example 
 *     var shows = Ext.create('Ext.data.Store', {
 *         fields: ['id','show'],
 *         data: [
 *             {id: 0, show: 'Battlestar Galactica'},
 *             {id: 1, show: 'Doctor Who'},
 *             {id: 2, show: 'Farscape'},
 *             {id: 3, show: 'Firefly'},
 *             {id: 4, show: 'Star Trek'},
 *             {id: 5, show: 'Star Wars: Christmas Special'}
 *         ]
 *     });
 *     
 *     Ext.create('Ext.Panel', {
 *         fullscreen: true,
 *         title: 'Sci-Fi Television',
 *         items: [{
 *             xtype: 'tagfield',
 *             label: 'Select a Show',
 *             store: shows,
 *             displayField: 'show',
 *             valueField: 'id'
 *         },{
 *             xtype: 'tagfield',
 *             label: 'Disabled',
 *             disabled: true,
 *             store: shows,
 *             displayField: 'show',
 *             valueField: 'id',
 *             value: [1,3,5]
 *         },{
 *             xtype: 'tagfield',
 *             label: 'Read only',
 *             readOnly: true,
 *             store: shows,
 *             displayField: 'show',
 *             valueField: 'id',
 *             value: [1,3,5]
 *         }]
 *     });
 * 
 * @history 16.07.2019
 * Обработка #disabled, #readOnly, #editable
 * 
 * @history 30.05.2019
 * - Переработано #selected
 * - Убираем вызовы #setValue при вводе поиска
 *
 * @history 24.05.2019
 * Подгрузка тегов в режиме #queryMode: 'remote'
 *
 * @history 06.05.2019
 * Добавлены свойства #queryMode и #queryField
 * 
 * @history 28.08.2018
 * Выявлен глюк в мобилке с edgePicker
 * Свойство #picker выставлено в `floated`
 */
Ext.define('SU.field.Tag', {
    extend: 'Ext.field.Picker',
    alternateClassName: ['Ext.field.Tag', 'Ext.form.field.Tag'],
    xtype: 'tagfield',

    requires: [
        'Ext.picker.Picker'
    ],
    
    config: {
        /**
         * @cfg {Ext.data.Store/Object/String} store
         * The store to provide selection options data. Either a Store instance,
         * configuration object or store ID.
         * @accessor
         */
        store: null,

        /**
         * @cfg {String/Number} displayField
         * The underlying {@link Ext.data.Field#name data value name} to bind to this
         * Select control.  If configured as `null`, the #valueField is used.
         *
         * This resolved value is the visibly rendered value of the available selection
         * options.
         * @accessor
         */
        displayField: 'text',

        /**
         * @cfg {String/Number} valueField
         * The underlying {@link Ext.data.Field#name data value name} to bind to this
         * Select control. If configured as `null`, the #displayField is used.
         * @accessor
         */
        valueField: 'id',

        queryMode: 'local',

        queryField: undefined,

        floatedPicker: {
            xtype: 'list',
            selectable: 'multi'
        },

        edgePicker: {
            xtype: 'list',
            selectable: 'multi'
        }
    },

    isField: true,

    // @inheritdoc
    isInputField: false,

    // @inheritdoc
    isSelectField: true,

    classCls: Ext.baseCSSPrefix + 'tagfield',

    picker: 'floated',

    listeners: {

        collapse: function () {
            var me = this,
                store = me.getStore(),
                queryField = me.getQueryField() || me.getDisplayField(),
                inputEl = me.inputElement.dom;

            inputEl.value = '';
            store.removeFilter(queryField);

        },

        keyup: {
            fn: function (field, e) {
                var me = this,
                    v = me.getInputValue(),
                    store = me.getStore(),
                    queryMode = me.getQueryMode(),
                    queryField = me.getQueryField() || me.getDisplayField();

                // Здесь в IE обнаружена беда с параметрами

                if (!e.isEvent && field.isEvent) {
                    e = field;
                }
                
                if (!e.isEvent || e.getKey() === Ext.event.Event.ESC) {
                    return;
                }

                !me.expanded && me.expand();

                if (v && v.length) {
                    store.addFilter({
                        property: queryField,
                        operator: 'like',
                        value: v
                    });
                } else {
                    store.removeFilter(queryField);
                }

            },
            buffer: 200
        }
    },

    /**
     * @property {Object} selected
     *
     * Набор выбранных записей в виде ключ -> запись.
     * В качестве ключа принимается значение поля, указаного в #valueField.
     *
     * @private
     */

    applyDisplayField: function (displayField) {
        if (displayField == null) {
            displayField = this.getValueField();
        }
        return displayField;
    },

    applyValueField: function (valueField) {
        if (valueField == null) {
            valueField = this.getDisplayField();
        }
        return valueField;
    },

    applyStore: function (store) {
        if (store) {
            store = Ext.data.StoreManager.lookup(store);
        }
        return store;
    },

    updateStore: function (value, oldStore) {
        this.fireEvent('updatestore', value, oldStore);
    },

    updateReadOnly: function (readOnly) {

        this.callParent(arguments);

        this.removeCls('x-field-readonly');
        if (readOnly) {
            this.addCls('x-field-readonly');
        }
    },

    updateEditable: function () {
        var isReadOnly = this.getReadOnly();

        this.callParent(arguments);
        this.updateReadOnly(isReadOnly);
    },

    createFloatedPicker: function () {
        var me = this;

        return Ext.merge({
            ownerCmp: me,
            store: me.getStore(),
            itemTpl: me.itemTpl ? me.itemTpl : '{' + me.getDisplayField() + '}',
            listeners: {
                select: me.onSelect,
                deselect: me.onDeselect,
                scope: me
            }
        }, me.getFloatedPicker());
    },

    createEdgePicker: function () {
        var me = this;

        return Ext.merge({
            ownerCmp: me,
            store: me.getStore(),
            itemTpl: me.itemTpl ? me.itemTpl : '{' + me.getDisplayField() + '}',
            listeners: {
                select: me.onSelect,
                deselect: me.onDeselect,
                scope: me
            }
        }, me.getEdgePicker());
    },

    getValue: function () {
        var me = this,
            selected = me.getSelected(),
            keys = Object.keys(selected),
            values = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            values.push(selected[keys[i]].get(me.getValueField()));
        }
        return values;
    },

    clear: function () {
        var me = this,
            selected = me.getSelected(),
            keys = Object.keys(selected),
            values = [];

        for (var i = 0, len = keys.length; i < len; i++) {
            values.push(selected[keys[i]]);
        }

        me.onDeselect(null, values);

    },

    expand: function () {
        if (!this.getReadOnly() || this.getEditable()) {
            this.callParent(arguments);
        }
    },

    reset: function () {
        this._selected = {};
        this.removeAllTags();
        this.callParent(arguments);
    },

    onInput: function (e) {
        var me = this,
            inputEl = me.inputElement.dom,
            value = inputEl.value,
            inputMask = me.getInputMask(),
            parseErrors, oldValue;

        if (inputMask) {
            inputMask.processAutocomplete(this, value);
            value = inputEl.value;
        }

        // Keep our config up to date:
        me._inputValue = value;

        // If the value is empty don't try and parse it, use the result
        // of parseValue as the default. For text fields it will be empty string,
        // for other typed fields (number/date) it will be null
        if (value) {
            parseErrors = [];
            value = me.parseValue(value, parseErrors);
        }

        if (parseErrors && parseErrors.length) {
            me.setError(parseErrors);
        } else {
            oldValue = me.getValue();
            //me.setValue(value);

            //If the value did not change, revalidate.
            //The user may have just erased into a valid state from an invalid state.
            if (me.getValue() === oldValue) {
                me.validate();
            }
        }

        me.syncEmptyState();

        // if we should ignore input, stop now.
        if (me.ignoreInput) {
            me.ignoreInput = false;
            return;
        }

        // set a timeout for 10ms to check if we want to stop the input event.
        // if not, then continue with the event (keyup)
        Ext.defer(function () {
            if (!me.ignoreInput && !me.destroyed) {
                me.fireEvent('keyup', e);
                me.ignoreInput = false;
            }
        }, 10);
    },

    setValue: function (value) {
        var me = this,
            selection = [],
            queryMode = me.getQueryMode(),
            store = me.getStore(),
            promises = [];

        if (!store) {
            me.on({
                updatestore: function (store, oldStore) {
                    if (store && !oldStore) {
                        me.setValue(value);
                    }
                },
                single: true
            });
            return;
        }

        if (Ext.isString(value)) {
            value = value.split(',');
        }

        if (!(value instanceof Array)) {
            value = Ext.Array.from(value);
        }

        var i = 0, len = value.length, config, f;

        if (queryMode === 'local' && store.isLoaded()) {

            // Для локального фильтра и загруженного стора
            // метим записи по значениям в value
            while (i < len) {
                f = store.getAt(store.findExact(me.getValueField(), value[i]));
                f && selection.push(f);
                i++;
            }

            if (selection.length) {
                me.getPicker().select(selection);
            }

        } else {

            // при отсутствии данных в сторе
            // принудительно загружаем нужные записи
            while (i < len) {
                config = {};
                config[me.getValueField()] = value[i];
                promises.push(store.createModel(config).loadP());
                i++;
            }

            Ext.Promise.all(promises)
                .then(function (selection) {
                    if (selection.length) {
                        me.getPicker().select(selection);
                    }
                });
        }

        if (!me.expanded) {
            me.syncLabelPlaceholder(true);
        }
    },

    // Do nothing!
    updateInputValue: function () { },

    validate: function (skipLazy) {
        var me = this,
            empty,
            errors,
            field,
            record,
            validity,
            value;

        if (me.isConfiguring && me.validateOnInit === 'none') {
            return true;
        }

        if (!me.getDisabled() || me.getValidateDisabled()) {

            errors = [];

            //if (me.isInputField && !me.isSelectField) {
            //    value = me.getInputValue();
            //    empty = !value;
            //    validity = empty && me.inputElement.dom.validity;
            //    if (validity && validity.badInput) {
            //        errors.push(me.badFormatMessage);
            //        empty = false;
            //    }
            //} else {
            value = me.getValue();
            empty = value === '' || value == null || !value.length;
            //}

            if (empty && me.getRequired()) {

                errors.push(me.getRequiredMessage());

            } else if (!errors.length) {

                if (!empty) {
                    value = me.parseValue(value, errors);
                }

                if (!errors.length) {

                    field = me._validationField;
                    record = me._validationRecord;

                    if (field && record) {
                        field.validate(value, null, errors, record);
                    }

                    if (!empty) {
                        me.doValidate(value, errors, skipLazy);
                    }

                }
            }
            if (errors.length) {
                me.setError(errors);
                return false;
            }
        }

        me.setError(null);
        return true;
    },

    doDestroy: function() {
        this._selected = {};
        this.destroyMembers('picker', 'hideEventListeners', 'touchListeners', 'focusTrap');
        this.callParent();
    },

    //@hide
    privates: {

        getSelected: function () {
            return this._selected || (this._selected = {});
        },

        /**
         * Обработка выбора записи в списке
         *
         * @param {Ext.dataview.DataView} view .
         * @param {Ext.data.Model/Ext.data.Model[]} records .
         * @private
         */
        onSelect: function (view, records) {
            records = Ext.Array.from(records);

            var me = this,
                field = me.getValueField(),
                selected = me.getSelected(),
                i = 0,
                len = records.length;

            while (i < len) {

                // Не добавлять выделение, если оно уже выбрано
                if (selected[records[i].get(field)]) {
                    break;
                }

                selected[records[i].get(field)] = records[i];
                me.addTag(records[i]);
                i++;
            }

            me.validate();
            me.fireEvent('change', me.getValue());
        },

        /**
         * Обработка отмены выбора записи в списке
         *
         * @param {Ext.dataview.DataView} view .
         * @param {Ext.data.Model/Ext.data.Model[]} records .
         * @private
         */
        onDeselect: function (view, records) {
            var me = this,
                i = 0,
                len = records.length;

            while (i < len) {
                delete me.getSelected()[records[i].get(me.getValueField())];
                me.removeTag(records[i]);
                i++;
            }
            me.validate();
            me.fireEvent('change', me.getValue());
        },

        /**
         *
         * @param {Ext.data.Model} tag .
         * @private
         */
        addTag: function (tag) {
            var me = this,
                id = me.id + '-tag-' + tag.get(me.getValueField()),
                el = document.createElement('span');

            //if (me.beforeInputElement.down('#' + id)) {
            //    me.removeTag(tag);
            //}

            el.id = id;
            el.className = Ext.baseCSSPrefix + 'tag';
            el.innerHTML = tag.get(me.getDisplayField()) + ' <span class="x-tag-tool x-fa fa-close" aria-hidden="true">&nbsp;</span>';
            el.setAttribute('tagFieldSpan', true);

            el.querySelector('span')
                .addEventListener('click',
                    Ext.bind(function () {
                        this.getPicker().getSelectable().deselect([tag]);
                        this.getPicker().onItemDeselect([tag]);
                        //this.getPicker().setItemSelection([tag], false);
                    },
                        me)
                );

            me.beforeInputElement.append(el);

            me.beforeInputElement.setStyle({
                marginRight: '10px'
            });
        },

        /**
         *
         * @param {Ext.data.Model} tag .
         * @private
         */
        removeTag: function (tag) {
            var el = this.beforeInputElement.down('#' + this.id + '-tag-' + tag.get(this.getValueField()));
            if (el) {
                el.destroy();
            }

            if (!this.expanded) {
                this.syncLabelPlaceholder(true);
            }
        },

        removeAllTags: function () {
            var items = this.beforeInputElement.query('span[tagFieldSpan=true]'),
                i = items.length, el;

            while (i--) {
                el = this.beforeInputElement.down('#' + this.id + '-tag-' + items[i].get(this.getValueField()));
                el && el.destroy();
            }
        },

        /**
         *
         * @param {Boolean} animate .
         */
        syncLabelPlaceholder: function (animate) {
            var me = this,
                selected = me.getSelected(),
                inside;

            me._animPlaceholderLabel = animate;

            if (me.rendered) {

                if (Object.keys(selected).length > 0) {
                    inside = false;
                } else {
                    inside = !me.hasFocus || me.getDisabled() || me.getReadOnly();
                }
                me.setLabelInPlaceholder(inside);
            }

            me._animPlaceholderLabel = false;
        }
    }
});
