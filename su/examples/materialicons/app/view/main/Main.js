/**
 *
 */
Ext.define('MIcons.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: ['MIcons.view.dataview.IconsView'],

    title: 'Material Icons',
    bodyPadding: '20 20 0 20',

    layout: {
        type: 'vbox',
        pack: 'start',
        align: 'center'
    },

    items: [
        {
            xtype: 'tabpanel',
            flex: 1,
            maxWidth: 1350,
            width: '100%',

            tabBar: {
                userCls: 'app-main-tabbar',
                layout: {
                    pack: 'start'
                }
            },

            items: [
                {
                    xtype: 'app-iconsview',
                    title: 'Material',
                    basePrefixCls: 'x-mi',
                    prefix: 'mi'
                },
                {
                    xtype: 'app-iconsview',
                    title: 'Awesome',
                    basePrefixCls: 'x-fa',
                    prefix: 'fa'
                }
            ]
        }
    ]
});
