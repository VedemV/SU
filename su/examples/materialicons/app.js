/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'MIcons.Application',

    name: 'MIcons',

    requires: [
        'MIcons.view.main.Main'
    ],

    // The name of the initial view to create.
    mainView: 'MIcons.view.main.Main'
});
