/**
 *
 */
Ext.define('SU.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        matcher: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    }
});
