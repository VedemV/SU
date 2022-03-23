
Ext.define('SU.locale.en.field.Date', {
    override: 'Ext.field.Date',

    config: {
        minDateMessage: 'The date in this field must be equal to or after {0}',
        maxDateMessage: 'The date in this field must be equal to or before {0}'
    }
});
