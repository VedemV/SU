Ext.define('SU.locale.ru.panel.Date', {
    override: 'Ext.panel.Date',

    config: {
        dateCellFormat: {
            $value: 'j',
            cached: true
        },

        format: {
            $value: Ext.Date.defaultFormat,
            cached: true
        },

        headerFormat: {
            $value: 'D, M j Y',
            cached: true
        },

        nextText: 'Следующий месяц (Ctrl+Стрелка вправо)',

        prevText: 'Предыдущий месяц (Ctrl+Стрелка влево)',

        startDay: {
            $value: Ext.Date.firstDayOfWeek,
            cached: true
        },

        weekendDays: {
            $value: 1, //Ext.Date.weekendDays,
            cached: true
        },

        buttons: {
            footerTodayButton: {
                text: 'Сегодня',
                tabIndex: -1,
                hidden: true,
                weight: -20,
                handler: 'onTodayButtonClick',
                reference: 'footerTodayButton'
            },
            spacer: {
                xtype: 'component',
                weight: -10,
                flex: 1
            },
            ok: {
                tabIndex: -1,
                handler: 'onOkButtonClick'
            },
            cancel: {
                tabIndex: -1,
                handler: 'onCancelButtonClick'
            }
        }
    }
});
