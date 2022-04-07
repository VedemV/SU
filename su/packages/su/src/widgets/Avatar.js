/**
 *
 * Example usage:
 *
 *     @example
 *
 *     Ext.create({
 *         xtype: 'container',
 *         fullscreen: true,
 *         padding: 10,
 *
 *         items: [
 *             {
 *                 xtype: 'container',
 *                 layout: 'hbox',
 *                 defaults: { style: 'margin: 20px;' },
 *                 items: [
 *                     {
 *                         xtype: 'avatar',
 *                         userName: 'Пупкин Василий Эдмундович'
 *                     },
 *                     {
 *                         xtype: 'avatar',
 *                         ui: 'plain',
 *                         userName: 'Иванов Антон'
 *                     },
 *                     {
 *                         xtype: 'avatar',
 *                         userName: 'Вася Пупкин',
 *                         image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
 *                     }
 *                 ]
 *             },
 *             {
 *                 xtype: 'container',
 *                 layout: 'hbox',
 *                 defaults: { style: 'margin: 10px;' },
 *                 items: [
 *                     {
 *                         xtype: 'avatar',
 *                         proportions: 80,
 *                         userName: 'Петя Васечкин'
 *                     },
 *                     {
 *                         xtype: 'avatar',
 *                         ui: 'plain',
 *                         proportions: 80,
 *                         userName: 'Иванов Антон'
 *                     },
 *                     {
 *                         xtype: 'avatar',
 *                         proportions: 80,
 *                         userName: 'Вася Пупкин',
 *                         image: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
 *                     }
 *                 ]
 *             }
 *         ],
 *         renderTo: Ext.getBody()
 *     });
 *
 *
 *
 */
Ext.define('SU.widgets.Avatar', {
    extend: 'Ext.Widget',
    alternateClassName: ['Ext.Avatar'],
    alias: 'widget.avatar',

    config: {
        /**
         * @cfg {Number} proportions
         * Высота и ширина
         */
        proportions: 60,

        /**
         * @cfg {String} userName
         * ФИО пользователя, при отсутствии #image
         * отображает 2 буквы из ФИО
         */
        userName: undefined,

        /**
         * @cfg {String} image
         * ССылка на изображение
         */
        image: undefined

        /**
         * @cfg {Number} height
         * @hide
         */

        /**
         * @cfg {Number} width
         * @hide
         */
    },

    baseCls: 'x-avatar',

    element: {
        reference: 'element',
        children: [
            {
                reference: 'innerElement',
                cls: 'x-avatar-inner'
            }
        ]
    },

    updateProportions: function (size) {
        this.element.setStyle('font-size', size * 0.35 + 'px');
        this.setHeight(size);
        this.setWidth(size);
    },

    updateUserName: function (name) {
        var me = this;

        if (me.getImage() || !name) {
            me.innerElement.dom.setAttribute('data-content', '');
            return;
        }

        name = name
            .split(' ')
            .filter(function (s) {
                return s.length > 3;
            })
            .map(function (s) {
                return s.substr(0, 1);
            })
            .slice(0, 2)
            .join('');

        me.innerElement.dom.setAttribute('data-content', name);
    },

    updateImage: function (image) {
        var me = this,
            bg = image ? 'url(' + image + ')' : 'none';

        me.element.setStyle('background-image', bg);

        //if (bg) {
        me.updateUserName(me.getUserName());
        //}
    }
});
