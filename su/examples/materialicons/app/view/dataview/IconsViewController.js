/**
 *
 */
Ext.define('MIcons.view.dataview.IconsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.app-iconsview',

    sortDirectionChange: function () {
        var vm = this.getViewModel();
        vm.set('sortDirection', Ext.String.toggle(vm.get('sortDirection'), 'DESC', 'ASC'));
    },

    usagePainted: function (field) {
        field.inputElement.addCls('x-user-selectable-text');
    }
});
