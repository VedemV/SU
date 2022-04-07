/**
 *
 */
Ext.define('SU.data.odata.Writer', {
    extend: 'Ext.data.JsonWriter',
    alternateClassName: ['SU.data.ODataWriter', 'Ext.data.ODataWriter'],
    alias: 'writer.odata',
    allowSingle: true,

    write: function (request) {
        var me = this,
            records = request.getRecords() || [],
            record = records[0],
            url = request.getUrl(),
            proxy = request.getProxy(),
            action = request.getAction(),
            headers = request.getHeaders();

        if (proxy) {
            // remove $inlinecount as listdata.svc complains when sent with anything but GET
            // this is required for the pager for know how many total records
            if (url.indexOf('$inlinecount') > 0) {
                url = url.replace('$inlinecount=allpages', '');
                request.setUrl(url);
            }

            // for updates, set the if-match header to a matching etag
            if (action === 'update') {
                proxy.headers['If-Match'] = record.data.__metadata.etag;
            } else {
                if (headers && headers['If-Match']) {
                    delete headers['If-Match'];
                    request.setHeaders(headers);
                }
            }
        }

        return me.callParent(arguments);
    }
});
