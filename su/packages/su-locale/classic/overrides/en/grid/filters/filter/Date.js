
Ext.define("SU.locale.en.grid.filters.filter.Date", {
    override: "Ext.grid.filters.filter.Date",
    fields: {
        lt: { text: 'Before' },
        gt: { text: 'After' },
        eq: { text: 'On' }
    },
    // Defaults to Ext.Date.defaultFormat
    dateFormat: null
});

