/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('MIcons.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    doListSelect: function (list, selection) {
        var me = this,
            view = me.view,
            usage = view.down('displayfield');

        usage.setValue('iconCls: \'x-mi mi-' + selection.get('name') + '\'');
    },

    doSearch: function (field, value) {
        var me = this,
            view = me.view,
            list = view.down('dataview');

        if (value) {
            list.getStore().addFilter({
                property: 'name',
                operator: 'like',
                value: value
            });
        } else {
            list.getStore().removeFilter('name');
        }
    }

});
