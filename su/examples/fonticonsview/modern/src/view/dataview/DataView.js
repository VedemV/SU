/**
 *
 */
Ext.define('FIV.view.dataview.DataView', {
    extend: 'Ext.DataView',
    xtype: 'app-dataview',

    requires: ['Ext.layout.HBox'],

    inline: true,

    itemTpl: [
        '<div class="x-item">',
        '  <div style="font-size: 3em;" class="icon {baseCls} {name}"></div>',
        '  <div>{content}</div>',
        '<div><strong>{name}</strong></div>',
        '</div>'
    ],

    selectable: {
        mode: 'single',
        deselectOnContainerClick: false,
        deselectable: false
    },

    layout: {
        type: 'hbox',
        align: 'start',
        pack: 'center',
        wrap: true
    }
});
