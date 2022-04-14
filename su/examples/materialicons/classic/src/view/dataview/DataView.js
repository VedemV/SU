/**
 *
 */
Ext.define('MIcons.view.dataview.DataView', {
    extend: 'Ext.DataView',
    xtype: 'app-dataview',

    itemTpl: [
        '<div class="x-item">',
        '  <div style="font-size: 3em;" class="icon {baseCls} {name}"></div>',
        '  <div>{content}</div>',
        '<div><strong>{name}</strong></div>',
        '</div>'
    ],
    itemSelector: '.x-item',
    selectionModel: {
        allowDeselect: false,
        mode: 'SINGLE'
    }
});
