/**
 * Набор данных, содержащий список объектов SU.locale.model.LocaleModel.
 */
Ext.define('SU.locale.store.LocalesStore', {
    extend: 'Ext.data.Store',
    alias: 'store.locales',

    requires: ['SU.locale.model.LocaleModel'],

    config: {
        //		storeId: 'localesStore',
        model: 'SU.locale.model.LocaleModel',

        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: ''
            }
        }
    }
});
