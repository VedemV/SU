/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'WSEcho.Application',

    name: 'WSEcho',
    autoCreateViewport: false,

    requires: [
        // This will automatically load all classes in the WSEcho namespace
        // so that application classes do not need to require each other.
        //'WSEcho.*'
    ],

    // The name of the initial view to create.
    //mainView: 'WSEcho.view.main.Main'
});
