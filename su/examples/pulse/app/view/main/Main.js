/**
 *
 */
Ext.define('Pulse.view.main.Main', {
  extend: 'Ext.Panel',
  xtype: 'app-main',

  requires: ['Pulse.view.main.MainController', 'SU.PulseButton'],

  controller: 'main',
  viewModel: {},

  tbar: [
    {
      text: 'Show Pulse Button',
      handler: 'handleShow',
      bind: {
        disabled: '{!pulsebutton.hidden}'
      }
    },
    {
      text: 'Hide Pulse Button',
      handler: 'handleHide',
      bind: {
        disabled: '{pulsebutton.hidden}'
      }
    }
  ],

  items: [
    {
      xtype: 'pulsebutton',
      reference: 'pulsebutton',
      publishes: 'hidden',
      bottom: 180,
      right: 100,
      height: 48,
      width: 48,
      iconCls: 'x-fa fa-phone',
      handler: 'handleTapPulseButton'
    }
  ]
});
