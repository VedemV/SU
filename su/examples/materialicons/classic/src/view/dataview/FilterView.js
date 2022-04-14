/**
 *
 */
Ext.define('MIcons.view.dataview.FilterView', {
    extend: 'Ext.Toolbar',
    xtype: 'app-filterview',

    requires: ['Ext.form.field.Display', 'Ext.form.field.Search'],

    layout: { type: 'hbox', align: 'center', pack: 'start', wrap: true },
    padding: '10 20',
    items: [
        {
            xtype: 'displayfield',
            fieldLabel: 'Usage',
            labelAlign: 'left',
            labelWidth: 50,
            minWidth: 300,
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
            placeHolder: 'Search icon',
            userCls: 'x-icons-search',
            width: 250,
            bind: {
                value: '{search}'
            }
        },
        {
            xtype: 'segmentedbutton',
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
