/**
 * Лекарство ошибки `Cannot read property 'length' of undefined at constructor.unjoin (Model.js...`
 * в дереве при сортировке или обновлении.
 */
Ext.define('SU.data.Model', {
    override: 'Ext.data.Model',

    unjoin: function (item) {
        var me = this;

        if (!me.joined || !me.stores) return;
        me.callParent(arguments);
    }

});
