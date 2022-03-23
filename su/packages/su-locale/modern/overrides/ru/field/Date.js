
Ext.define('SU.locale.ru.field.Date', {
    override: 'Ext.field.Date',

    config: {
        minDateMessage: 'Дата в этом поле должна быть не ранее {0}',
        maxDateMessage: 'Дата в этом поле должна быть не позже {0}'
    }

});
