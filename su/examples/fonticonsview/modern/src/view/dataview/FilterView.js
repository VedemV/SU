/**
 *
 */
Ext.define('FIV.view.dataview.FilterView', {
    extend: 'Ext.Toolbar',
    xtype: 'app-filterview',

    requires: ['Ext.form.field.Search', 'Ext.layout.HBox', 'Ext.field.Display', 'Ext.SegmentedButton'],

    ui: 'footer',
    layout: { type: 'hbox', align: 'center', pack: 'start', wrap: true },
    padding: '10 20',
    defaults: { margin: '0 10 0 0' },

    items: [
        {
            xtype: 'displayfield',
            label: 'Usage',
            labelAlign: 'left',
            labelWidth: 50,
            ui: 'solo',
            minWidth: 300,
            listeners: {
                painted: 'usagePainted',
                single: true
            },
            bind: {
                value: '{usageSelection}'
            }
        },
        {
            xtype: 'component',
            flex: 1
        },
        {
            xtype: 'searchfield',
            placeholder: 'Search icon',
            width: 250,
            bind: {
                value: '{search}'
            }
        },
        {
            xtype: 'segmentedbutton',
            defaultUI: 'default',
            items: [
                {
                    iconCls: 'x-mi mi-sort-alphabetical',
                    value: 'name'
                },
                {
                    iconCls: 'x-mi mi-sort-numeric',
                    value: 'content'
                }
            ],
            bind: {
                value: '{sortProperty}'
            }
        },
        {
            bind: {
                iconCls: '{sortDirectionIcon}'
            },
            handler: 'sortDirectionChange'
        }
    ]
});
