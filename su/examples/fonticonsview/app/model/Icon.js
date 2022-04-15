/**
 *
 */
Ext.define('FIV.model.Icon', {
    extend: 'Ext.data.Model',

    idProperty: 'name',

    fields: [
        { name: 'baseCls', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'content', type: 'string' }
    ]
});
