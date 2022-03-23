/**
 * Заплатка ошибки "Uncaught TypeError: Cannot read property 'getDataIndex' of null"
 * [EXTJS Forum](https://www.sencha.com/forum/showthread.php?469749-6-5-2-Modern-Ext-grid-plugin-CellEditing-getEditor-has-exception-logged)
 */
Ext.define('SU.grid.plugin.CellEditing', {
    override: 'Ext.grid.plugin.CellEditing',

    getEditor: function (location) {
        if (!location.column) {
            return;
        }

        return this.callParent([location]);
    }
});