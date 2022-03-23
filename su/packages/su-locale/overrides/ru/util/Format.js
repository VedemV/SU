
Ext.onReady(function () {

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ' ', // &nbsp;
            decimalSeparator: ',',
            currencySign: '\u0440\u0443\u0431',
            // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});
