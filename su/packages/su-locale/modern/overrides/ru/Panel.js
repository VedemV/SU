
Ext.define('SU.locale.ru.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: { text: 'OK' },
            abort: { text: 'Прервать' },
            retry: { text: 'Повторить' },
            ignore: { text: 'Игнорировать' },
            yes: { text: 'Да' },
            no: { text: 'Нет' },
            cancel: { text: 'Отмена' },
            apply: { text: 'Применить' },
            save: { text: 'Сохранить' },
            submit: { text: 'Отправить' },
            help: { text: 'Справка' },
            close: { text: 'Закрыть' }
        },

        closeToolText: 'Закрыть'
    }
});
