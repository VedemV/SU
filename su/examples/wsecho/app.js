/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'WSEcho.Application',

    name: 'WSEcho',
    autoCreateViewport: false,

    requires: ['Ext.plugin.Viewport']

});
