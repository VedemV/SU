
Ext.define("SU.locale.ru.grid.filters.filter.Date", {
    override: "Ext.grid.filters.filter.Date",
    fields: {
        lt: { text: 'До' },
        gt: { text: 'После' },
        eq: { text: 'Во время' }
    },
    // Defaults to Ext.Date.defaultFormat
    dateFormat: null
});

