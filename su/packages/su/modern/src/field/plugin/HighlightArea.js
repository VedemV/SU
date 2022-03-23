/**
 * Плагин подсветки текста в Ext.field.TextArea
 * 
 * @history 20.11.2018 
 * Временно убрана обработка в #handleInput
 * При включении проверить работу в рекапах UK.ECP
 */
Ext.define('SU.field.plugin.HighlightArea', {
    extend: 'Ext.plugin.Abstract',
    alias: 'plugin.highlightarea',

    config: {
        field: null,

        /**
         * @cfg {Function}
         * Функция для получения форматированного HTML
         * 
         * @param {SU.field.plugin.HighlightArea} me
         * @param {Ext.field.TextArea} field
         * @param {String} text
         * @return {String}
         */
        boundaries: null,

        /**
         * @cfg {String/Object} scope
         */
        scope: null

    },

    init: function (field) {
        var me = this,
            container;

        me.setField(field);
        me.input = field.inputElement;

        field.inputElement.addCls('x-input x-content');

        var container = Ext.dom.Helper.insertAfter(me.input, {
            tag: 'div',
            cls: 'x-highlight-container',
            //data-componentid: 
            children: [
                {
                    tag: 'div',
                    cls: 'x-backdrop',
                    children: [
                        {
                            tag: 'div',
                            cls: 'x-highlights'
                        }
                    ]
                }
            ]

        });

        me.containerEl = Ext.get(container);
        me.backdropEl = me.containerEl.down('.x-backdrop');
        me.highlightEl = me.containerEl.down('.x-highlights');

        //this.container.setAttribute('data-componentid', field.inputElement.getAttribute('data-componentid'));
        me.containerEl.append(me.input.dom);
        //field.inputElement = this.containerEl;

        //field.on({
        //    change: this.handleInput,
        //    scope: this,
        //    buffer: 100
        //});

        me.input.dom.addEventListener('input', Ext.bind(me.handleInput, me));
        me.input.dom.addEventListener('scroll', Ext.bind(me.handleScroll, me));

        field.highlightUpdate = function () {
            me.handleInput();
        }

        field.on({
            painted: function () {
                me.handleInput();
            },
            single: true
        })
    },

    destroy: function () {
        //this.cleanup();
        this.callParent();
    },

    handleInput: function () {
//        var me = this,
//            text = me.input.dom.value,
//            boundaries = me.getBoundaries();
//
//        text = boundaries ? Ext.callback(boundaries, me.getScope(), [me, me.getField(), text], 0, me) : text;
//        me.highlightEl.setHtml(text);
    },

    handleScroll: function () {
        this.backdropEl.dom.scrollTop = this.input.dom.scrollTop;

        // Chrome and Safari won't break long strings of spaces, which can cause
        // horizontal scrolling, this compensates by shifting highlights by the
        // horizontally scrolled amount to keep things aligned
        var scrollLeft = this.input.dom.scrollLeft;
        this.backdropEl.dom.style.transform = (scrollLeft > 0) ? 'translateX(' + -scrollLeft + 'px)' : '';

    }

})
