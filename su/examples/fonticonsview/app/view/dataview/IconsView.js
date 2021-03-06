/**
 *
 */
Ext.define('FIV.view.dataview.IconsView', {
    extend: 'Ext.Panel',
    xtype: 'app-iconsview',

    requires: ['FIV.view.dataview.DataView'],

    config: {
        basePrefix: null,
        prefix: null
    },

    viewModel: {
        type: 'app-iconsview'
    },

    controller: 'app-iconsview',
    scrollable: true,

    tbar: {
        xtype: 'app-filterview'
    },

    items: [
        {
            xtype: 'app-dataview',
            cls: 'x-icons-view',
            bind: {
                selection: '{selection}',
                store: '{iconsStore}'
            }
        }
    ]
});
