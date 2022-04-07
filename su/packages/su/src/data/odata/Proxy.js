/**
 * Rest proxy для работы с данными SharePoint по протоколам
 * - OData
 * - SOAP
 */
Ext.define('SU.data.odata.Proxy', {
    extend: 'Ext.data.RestProxy',
    alternateClassName: ['SU.data.ODataProxy', 'Ext.data.ODataProxy'],
    alias: 'proxy.odata',

    requires: ['SU.data.odata.Reader', 'SU.data.odata.Writer'],

    config: {
        /**
         * @cfg {Boolean} asRestAPI=false
         * true - использовать запросы RestAPI
         */
        asRestAPI: false,

        /**
         * @cfg {String} site
         * Адрес сайта SharePoint
         */
        site: null,

        /**
         * @cfg {String} list (reqired)
         * Имя списка
         */
        list: null
    },

    /**
     * @inheritdoc
     * @localdoc
     *
     * Для `update` вместо PUT используется MERGE.
     *
     * PUT ожидает, что все поля будут предоставлены, сбрасывая необязательные поля в значения по умолчанию.
     *
     * MERGE обновит только указанные поля
     */
    actionMethods: {
        create: 'POST',
        read: 'GET',
        update: 'MERGE',
        destroy: 'DELETE'
    },

    /**
     * @cfg {Object} [headers]
     * @inheritdoc
     * @localdoc
     * Требуем ответа в формате JSON
     */
    headers: {
        Accept: 'application/json; odata=verbose'
    },

    appendId: false,

    noCache: false,

    limitParam: '$top',

    startParam: '$skip',

    sortParam: '$orderby',

    filterParam: '$filter',

    /**
     * encode $orderby value for remote sorting
     *
     * @param {Ext.util.Sorter[]} sorters -
     * @return {String} -
     */
    encodeSorters: function (sorters) {
        var sort = [],
            length = sorters.length,
            i;

        for (i = 0; i < length; i++) {
            sort[i] = sorters[i].getProperty() + (sorters[i].getDirection() === 'DESC' ? ' desc' : '');
        }

        return sort.join(',');
    },

    /**
     * encode $filter value for remote filtering
     *
     * @param {Ext.util.Filter[]} filters -
     * @return {String} -
     */
    encodeFilters: function (filters) {
        var filter = [],
            length = filters.length,
            sq,
            i;

        for (i = 0; i < length; i++) {
            sq = typeof filters[i].getValue() === 'string' ? "'" : '';

            if (filters[i].getOperator() === 'in') {
                filter[i] = filters[i]
                    .getValue()
                    .map(function (value) {
                        sq = typeof value === 'string' ? "'" : '';
                        return filters[i].getProperty() + ' eq ' + sq + value + sq;
                    })
                    .join(' or ');
            } else if (filters[i].getOperator() === 'like') {
                filter[i] = 'indexof(' + filters[i].getProperty() + ', ' + sq + filters[i].getValue() + sq + ') ne -1';
            } else {
                filter[i] =
                    filters[i].getProperty() + ' ' + filters[i].getOperator() + ' ' + sq + filters[i].getValue() + sq;
            }
        }

        return filter.join(' and ');
    },

    // provide odata style urls
    // .../resouce(id) instead of ../resource/id
    buildUrl: function (request) {
        var me = this,
            operation = request.getOperation(),
            records = operation.getRecords() || [],
            record = records[0],
            site = me.getSite(),
            url = site
                ? Ext.String.format(
                      me.getAsRestAPI()
                          ? "{0}/_api/web/lists/getbytitle('{1}')/items"
                          : '{0}/_vti_bin/listdata.svc/{1}',
                      site,
                      me.getList()
                  )
                : me.getUrl(request),
            id;

        if (record && !record.phantom) {
            id = record.getId();
        }

        if (id) {
            url += '(' + id + ')';
        }

        // for now always hardcoded, removing this causes a different format of the response,
        // which don't match with the reader root config
        url += '?$inlinecount=allpages';
        request.setUrl(url);

        return me.callParent(arguments);
    },

    reader: {
        type: 'odata',
        rootProperty: 'd.results',
        totalProperty: 'd.__count'
    },

    writer: {
        type: 'odata'
    }
});
