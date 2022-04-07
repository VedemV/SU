Ext.define('SU.locale.en.panel.Date', {
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

        nextText: 'Next Month (Control+Right)',

        prevText: 'Previous Month (Control+Left)',

        startDay: {
            $value: Ext.Date.firstDayOfWeek,
            cached: true
        },

        weekendDays: {
            $value: Ext.Date.weekendDays,
            cached: true
        },

        buttons: {
            footerTodayButton: {
                text: 'Today',
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
