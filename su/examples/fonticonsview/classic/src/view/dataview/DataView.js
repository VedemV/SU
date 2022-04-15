/**
 *
 */
Ext.define('FIV.view.dataview.DataView', {
    extend: 'Ext.DataView',
    xtype: 'app-dataview',

    requires: ['Ext.plugin.Viewport'],

    itemSelector: '.x-item',

    itemTpl: [
        '<div class="x-item">',
        '  <div style="font-size: 3em;" class="icon {baseCls} {name}"></div>',
        '  <div>{content}</div>',
        '<div><strong>{name}</strong></div>',
        '</div>'
    ],

    selectionModel: {
        allowDeselect: false,
        mode: 'SINGLE'
    }
});
