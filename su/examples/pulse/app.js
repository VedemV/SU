/**
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
  extend: 'Pulse.Application',

  requires: ['Pulse.view.main.Main'],

  name: 'Pulse',

  mainView: 'Pulse.view.main.Main'
});
