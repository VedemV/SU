/* eslint-disable object-shorthand */
/**
 *
 */
Ext.define('Pulse.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.main',

  handleShow: function () {
    this.lookup('pulsebutton').show();
  },

  handleHide: function () {
    this.lookup('pulsebutton').hide();
  },

  handleTapPulseButton: function () {
    Ext.Msg.alert('Alert', 'Call Me');
  }
});
