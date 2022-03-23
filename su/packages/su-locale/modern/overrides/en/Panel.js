
Ext.define('SU.locale.en.Panel', {
    override: 'Ext.Panel',

    config: {
        standardButtons: {
            ok: { text: 'OK' },
            abort: { text: 'Abort' },
            retry: { text: 'Retry' },
            ignore: { text: 'Ignore' },
            yes: { text: 'Yes' },
            no: { text: 'No' },
            cancel: {text: 'Cancel' },
            apply: { text: 'Apply' },
            save: { text: 'Save' },
            submit: { text: 'Submit' },
            help: { text: 'Help' },
            close: { text: 'Close' }
        },

        closeToolText: 'Close panel'
    }
});
