Ext.define('WSEcho.view.Main', {
    extend: 'Ext.panel.Panel',

    requires: [
        'SU.WebSocket',
        'Ext.toolbar.TextItem',
        'Ext.form.field.Text',
        'SU.LangSelect',
        'SU.locale.LocalePlugin'
    ],

    xtype: 'app-main',

    titleDefault: 'WebSocket Echo Test',

    autoScroll: true,
    //tools:[{
    //       xtype: 'languagefield'
    //}],
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [
                {
                    action: 'url',
                    xtype: 'textfield',
                    width: 200,
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
                },
                {
                    xtype: 'tbfill'
                },
                //{
                //    action: 'text',
                //    xtype: 'textfield',
                //    width: 200,
                //    disabled: true
                //},
                //{
                //    action: 'send',
                //    text: 'Send',
                //    disabled: true
                //}
            ]
        },
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [{
                xtype: 'tbtext', text: '&#160;'
            }]
        },
        {
            xtype: 'container',
            dock: 'bottom',
            padding: 10,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'end'
            },
            items: [
                {
                    action: 'text',
                    xtype: 'textareafield',
                    height: 250,
                    //margin: 10,
                    //grow: true,
                    flex: 1,
                    disabled: true
                },
                {
                    xtype: 'button',
                    action: 'send',
                    text: 'Send',
                    margin: 10,
                    //widih: 150
                    disabled: true
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
        me.setTitle(me.titleDefault + (state === 2 ? (' (' + url + ')') : ''));
    }




});