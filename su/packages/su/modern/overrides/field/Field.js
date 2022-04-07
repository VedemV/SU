/**
 *
 */
Ext.define('SU.field.Field', {
    override: 'Ext.field.Field',

    requres: ['Ext.Sheet'],

    config: {
        /**
         * @cfg {String} helperIconCls
         *
         */
        helperIconCls: 'x-mi mi-help-circle-outline',

        /**
         * @cfg {String} helperTitle
         *
         */
        helperTitle: undefined,

        /**
         * @cfg {String} helperText
         *
         */
        helperText: undefined,

        /**
         * @cfg {Object} helperConfig
         *
         */
        helperConfig: {
            xtype: 'sheet',
            cls: 'x-field-helper-sheet'
        }
    },

    /**
     * @property {Boolean} preventMark
     * true to disable displaying any #errorMessage set on this object.
     */
    preventMark: false,

    /**
     * @property {Object} defaultHelperConfig
     *
     */
    defaultHelperConfig: {
        showAnimation: false,
        hideAnimation: false,
        centered: false
    },

    listeners: {
        click: 'onHelperClick',
        element: 'labelHelperElement',
        scope: 'this'
    },

    destroy: function () {
        var me = this;

        Ext.destroy(me.helperSheet);
        me.callParent(arguments);
    },

    getTemplate: function () {
        var template = this.callParent(arguments),
            helperHidden = !this.getHelperText();

        template[0].children.push({
            reference: 'labelHelperElement',
            cls: Ext.baseCSSPrefix + 'label-helper-el',
            tag: 'span',
            html: '&nbsp;',
            hidden: helperHidden
        });

        return template;
    },

    updateHelperConfig: function (config) {
        Ext.destroy(this.helperSheet);
    },

    updateHelperIconCls: function (value, oldValue) {
        if (this.labelHelperElement) {
            if (oldValue) {
                this.labelHelperElement.removeCls(oldValue);
            }

            if (value) {
                this.labelHelperElement.addCls(value);
            }
        }
    },

    updateHelperText: function (value) {
        var me = this;

        if (me.labelHelperElement) {
            if (value) {
                me.labelHelperElement.show();

                if (me.helperSheet) {
                    me.helperSheet.setHtml(value);
                }
            } else {
                me.labelHelperElement.hide();
                if (me.helperSheet) {
                    me.helperSheet.hide();
                    me.helperSheet.setHtml(null);
                }
            }
        }
    },

    onHelperClick: function (event) {
        var text = this.getHelperText();

        event.stopEvent();

        if (text) {
            console.log(this.getHelperSheet(), this.labelHelperElement);
            this.getHelperSheet().showBy(this.labelHelperElement, 'tc-br');
        }
    },

    // @hide
    privates: {
        // @private
        getHelperSheet: function () {
            var me = this,
                config = Ext.applyIf(me.getHelperConfig() || {}, me.defaultHelperConfig || {});

            return (
                me.helperSheet ||
                (me.helperSheet = Ext.factory(
                    Ext.applyIf(config, {
                        title: me.getHelperTitle(),
                        html: me.getHelperText()
                    }),
                    Ext.Sheet
                ))
            );
        }
    }
});
