/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('MIcons.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'MIcons.store.Icons'
    ],

    controller: 'main',
    title: 'Material Icons',
    layout: 'border',

    items: [
        {
            xtype: 'toolbar',
            //dock: 'top',
            //height: 50,
            ui: 'footer',
            region: 'north',
            items: [
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Usage',
                    labelAlign: 'left',
                    labelWidth: 50,
                    //height: 40,
                    //ui: 'solo',
                    flex: 1,
                    listeners: {
                        painted: function () { this.inputElement.addCls('x-user-selectable-text'); },
                        single: true
                    }
                },
                {
                    xtype: 'searchfield',
                    //ui: 'solo',
                    placeHolder: 'Search icon',
                    //height: 40,
                    width: 250,
                    listeners: {
                        search: 'doSearch'
                    }
                }
            ]
        },
        {
            xtype: 'dataview',
            region: 'center',
            scrollable: true,
            itemTpl: '<div class="x-item"><div class="x-icon x-mi mi-hc-3x mi-{name}"></div><div>{content}</div><div><strong>{name}</strong></div></div>',
            itemSelector: '.x-item',
            selectionModel: {
                allowDeselect: false,
                mode: 'SINGLE'
            },
            store: {
                type: 'icons'
            },

            listeners: {
                select: 'doListSelect'
            }
        }
    ]

});
