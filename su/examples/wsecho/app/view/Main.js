Ext.define('WSEcho.view.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.button.Button',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.HBox',
        'SU.LangSelect',
        'SU.locale.LocalePlugin',
        'WSEcho.controller.Main'
    ],

    controller: 'main',
    scrollable: true,
    plugins: [{ ptype: 'localization', method: 'setTitle', key: 'mainTitle' }],
    titleDefault: 'WebSocket Echo Test',

    tools: [
        {
            xtype: 'languagefield'
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    action: 'connect',
                    scale: 'large',
                    iconCls: 'x-mi mi-hc-2x mi-refresh',
                    tooltip: 'Connect'
                },
                {
                    action: 'disconnect',
                    scale: 'large',
                    iconCls: 'x-mi mi-hc-2x mi-close',
                    tooltip: 'Disconnect'
                },
                {
                    action: 'url',
                    xtype: 'textfield',
                    flex: 1,
                    emptyText: 'ws://echo.websocket.org/',
                    value: 'ws://echo.websocket.org/'
                },
                {
                    action: 'connect',
                    text: 'Connect'
                },
                {
                    action: 'disconnect',
                    text: 'Disconnect',
                    disabled: true
                }
            ]
        },
        // {
        //     xtype: 'toolbar',
        //     dock: 'bottom',
        //     items: [
        //         {
        //             xtype: 'tbtext',
        //             html: '&#160;'
        //         }
        //     ]
        // },
        {
            xtype: 'container',
            dock: 'bottom',
            padding: 10,
            layout: {
                type: 'hbox',
                align: 'end',
                pack: 'end'
            },
            items: [
                {
                    action: 'text',
                    xtype: 'textareafield',
                    maxHeight: 250,
                    grow: true,
                    flex: 1
                    //disabled: true
                },
                {
                    xtype: 'button',
                    action: 'send',
                    text: 'Send',
                    margin: 10
                    //widih: 150
                    //disabled: true
                }
            ]
        }
    ],
    //plugins: [
    //	{ ptype: 'localization', method: 'updateTitle' }
    //],

    constructor: function (config) {
        this.callParent(arguments);
        this.setTitle(this.titleDefault);
    },

    updateTitle: function () {
        var me = this,
            ws = WSEcho.getApplication().getController('Main').getWebSocket(),
            state = !!ws && ws.getReadyState(),
            url = !!ws && ws.getUrl();
        me.setTitle(me.titleDefault + (state === 2 ? ' (' + url + ')' : ''));
    }
});
