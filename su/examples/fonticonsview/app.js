/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'FIV.Application',

    name: 'FontIconsView',

    requires: ['FIV.view.main.Main'],

    // The name of the initial view to create.
    mainView: 'FIV.view.main.Main'
});
