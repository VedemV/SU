/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'Search.Application',

    name: 'Search',

    requires: [
        // This will automatically load all classes in the Search namespace
        // so that application classes do not need to require each other.
        //'Search.*'
    ],

    // The name of the initial view to create.
    mainView: 'Search.view.main.Main'
});
