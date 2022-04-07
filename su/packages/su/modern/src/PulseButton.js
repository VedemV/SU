/**
 * Плавающая пульсирующая кнопка с качающейся иконкой
 *
 */
Ext.define('SU.PulseButton', {
    extend: 'Ext.Component',
    alias: 'widget.pulsebutton',

    floated: true,
    baseCls: 'x-pulsebutton',

    cachedConfig: {
        eventHandlers: {
            click: 'onClick'
        }
    },

    config: {
        /**
         * @cfg {String} iconCls
         * CSS класс иконки
         */
        iconCls: null,

        /**
         * @cfg {String} handler
         * Обработчик нажатия кнопки
         */
        handler: null,

        /**
         * @cfg {String} scope
         * `this` для #handler
         */
        scope: null
    },

    height: 32,
    width: 32,

    preventDefaultAction: true,

    element: {
        tag: 'a',
        reference: 'element'
    },

    template: [
        {
            reference: 'circleElement',
            style: 'transform-origin: center;',
            cls: 'x-pulse-circle'
        },
        {
            reference: 'fillElement',
            style: 'transform-origin: center;',
            cls: 'x-pulse-circle-fill'
        },
        {
            reference: 'innerElement',
            style: 'transform-origin: center;',
            cls: 'x-pulse-icon-circle',
            onclick: 'return Ext.doEv(this, event);',
            children: [
                {
                    reference: 'iconElement',
                    style: 'transform-origin: center;',
                    cls: 'x-pulse-icon-circleblock'
                }
            ]
        }
    ],

    updateIconCls: function (iconCls, oldIconCls) {
        var me = this,
            element = me.iconElement;

        if (iconCls) {
            element.replaceCls(oldIconCls, iconCls);
        } else {
            element.removeCls(oldIconCls);
        }
    },

    updateHeight: function (height, oldHeight) {
        var me = this,
            element = me.iconElement,
            circle = me.circleElement;

        element.setHeight(height);
        element.setStyle('lineHeight', height + 'px');
        element.setStyle('fontSize', height * 0.6 + 'px');

        me.fillElement.setHeight(height * 1.4);
        me.innerElement.setTop((height * 1.4 - height) / 2);
        circle.setHeight(height * 2);
        circle.setTop((height * 1.4 - height * 2) / 2);
    },

    updateWidth: function (width, oldWidth) {
        var me = this,
            element = me.iconElement,
            circle = me.circleElement;

        element.setWidth(width);
        me.fillElement.setWidth(width * 1.4);
        me.innerElement.setLeft((width * 1.4 - width) / 2);
        circle.setWidth(width * 2);
        circle.setLeft((width * 1.4 - width * 2) / 2);
    },

    onClick: function (e) {
        return this.onTap(e);
    },

    onTap: function (e) {
        if (this.getDisabled()) {
            return false;
        }

        this.fireAction('tap', [this, e], 'doTap');
    },

    doTap: function (me, e) {
        var handler = me.getHandler();

        if (e && e.preventDefault && me.preventDefaultAction) {
            e.preventDefault();
        }

        if (handler) {
            Ext.callback(handler, me.getScope(), [me, e], 0, me);
        }
    }
});
