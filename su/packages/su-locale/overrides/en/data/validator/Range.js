Ext.define('SU.locale.en.data.validator.Range', {
    override: 'Ext.data.validator.Range',
    config: {
        minOnlyMessage: 'Must be must be at least {0}',
        maxOnlyMessage: 'Must be no more than than {0}',
        bothMessage: 'Must be between {0} and {1}',
        nanMessage: 'Must be numeric'
    }
});
