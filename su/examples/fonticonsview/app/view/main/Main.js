/**
 *
 */
Ext.define('FIV.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: ['FIV.view.dataview.IconsView'],

    title: 'Font Icons View',
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
                    title: 'Material Design',
                    tooltip: "SU package 'material-icons'",
                    basePrefix: 'x-mi',
                    prefix: 'mi'
                },
                {
                    xtype: 'app-iconsview',
                    title: 'Awesome',
                    tooltip: "ExtJS package 'font-awesome'",
                    basePrefix: 'x-fa',
                    prefix: 'fa'
                },
                {
                    xtype: 'app-iconsview',
                    title: 'Ext',
                    tooltip: "ExtJS package 'font-ext'",
                    basePrefix: 'ext',
                    prefix: 'ext'
                },
                {
                    xtype: 'app-iconsview',
                    title: 'iOS',
                    tooltip: "ExtJS package 'font-ios'",
                    basePrefix: 'x-ios',
                    prefix: 'ios'
                },
                {
                    xtype: 'app-iconsview',
                    title: 'Pictos',
                    tooltip: "ExtJS package 'font-pictos'",
                    basePrefix: 'pictos',
                    prefix: 'pictos'
                }
            ]
        }
    ]
});
