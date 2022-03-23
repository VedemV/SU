Ext.define('Search.view.main.Tag', {
    extend: 'Ext.Panel',
    xtype: 'maintag',
    
    requires: [
        'SU.field.Tag'
    ],
    
    title: 'Sci-Fi Television',

    items: [{
        xtype: 'tagfield',
        label: 'Select a Show',
        store: {
            fields: ['id','show'],
            data: [
                {id: 0, show: 'Battlestar Galactica'},
                {id: 1, show: 'Doctor Who'},
                {id: 2, show: 'Farscape'},
                {id: 3, show: 'Firefly'},
                {id: 4, show: 'Star Trek'},
                {id: 5, show: 'Star Wars: Christmas Special'}
            ]
        },
        displayField: 'show',
        valueField: 'id'
    }]

});

