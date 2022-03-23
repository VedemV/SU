
Ext.onReady(function () {

    if (Ext.data && Ext.data.Types) {
        Ext.data.Types.stripRe = /[\$,%]/g;
    }

    if (Ext.Date) {
        Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.monthNames[month].substring(0, 3);
        };

        Ext.Date.monthNumbers = {
            January: 0,
            Jan: 0,
            February: 1,
            Feb: 1,
            March: 2,
            Mar: 2,
            April: 3,
            Apr: 3,
            May: 4,
            June: 5,
            Jun: 5,
            July: 6,
            Jul: 6,
            August: 7,
            Aug: 7,
            September: 8,
            Sep: 8,
            October: 9,
            Oct: 9,
            November: 10,
            Nov: 10,
            December: 11,
            Dec: 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";

        Ext.Date.firstDayOfWeek = 0;
        Ext.Date.weekendDays = [6, 0];
    }

});

