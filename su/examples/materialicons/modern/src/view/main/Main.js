/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 */
Ext.define('MIcons.view.main.Main', {
    extend: 'Ext.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.layout.Fit',
        'Ext.layout.HBox',
        'Ext.dataview.DataView',
        'Ext.field.Display',
        'Ext.field.Search',
        'MIcons.store.Icons',
        'MIcons.view.main.MainController'
    ],

    controller: 'main',
    title: 'Material Icons',
    layout: 'fit',

    items: [
        {
            xtype: 'toolbar',
            docked: 'top',
            ui: 'footer',
            layout: { type: 'hbox', align: 'stretch', pack: 'end', wrap: true },
            items: [
                {
                    xtype: 'searchfield',
                    ui: 'solo',
                    placeholder: 'Search icon',
                    minWidth: 250,
                    platformConfig: {
                        phone: {
                            flex: 1
                        }
                    },
                    listeners: {
                        search: 'doSearch'
                    }
                },
                {
                    xtype: 'displayfield',
                    label: 'Usage',
                    labelAlign: 'left',
                    labelWidth: 50,
                    ui: 'solo',
                    minWidth: 300,
                    flex: 1,
                    listeners: {
                        painted: function () { this.inputElement.addCls('x-user-selectable-text'); },
                        single: true
                    }
                }
            ]
        },
        {
            xtype: 'dataview',
            inline: true,
            itemTpl: '<div class="x-item"><div class="x-icon x-mi mi-hc-3x mi-{name}"></div><div>{content}</div><div><strong>{name}</strong></div></div>',
            selectable: {
                mode: 'single',
                deselectOnContainerClick: false,
                deselectable: false
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
