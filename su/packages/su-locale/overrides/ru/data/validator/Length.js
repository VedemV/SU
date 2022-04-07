Ext.define('SU.locale.ru.data.validator.Length', {
    override: 'Ext.data.validator.Length',
    config: {
        minOnlyMessage: 'Длина должна быть не менее {0}',
        maxOnlyMessage: 'Длина должна быть не более {0}',
        bothMessage: 'Длина должна быть между {0} и {1}'
    }
});
