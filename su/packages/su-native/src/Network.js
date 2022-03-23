/**
 * Нативная проверка состояния интернет соединения
 * 
 * Переопределяет метод Ext.isOnline
 *
 * Плагин: [cordova-plugin-network-information](https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-network-information/)
 */
Ext.define('SU.native.Network', {
    alternateClassName: ['SU.Network'],
    singleton: true,

    requires: [
        'Ext.Toast'
    ],

    config: {
        signalling: true
    },
    
    UNKNOWN: 'unknown',
    ETHERNET: 'enternet',
    WIFI: 'wifi',
    CELL_2G: '2g',
    CELL_3G: '3g',
    CELL_4G: '4g',
    CELL: 'cellular',
    NONE: 'none',

    connectionType: function () {
        if (window.Connection) {
            return navigator.connection.type || navigator.connection.effectiveType;
        } else {
            return navigator.connection.effectiveType || navigator.onLine;
        }
    },

    connectionTypeName: function () {
        var networkState = this.connectionType();
        var states = {};

        states[this.UNKNOWN] = 'Unknown connection';
        states[this.ETHERNET] = 'Ethernet connection';
        states[this.WIFI] = 'WiFi connection';
        states[this.CELL_2G] = 'Cell 2G connection';
        states[this.CELL_3G] = 'Cell 3G connection';
        states[this.CELL_4G] = 'Cell 4G connection';
        states[this.CELL] = 'Cell generic connection';
        states[this.NONE] = 'No network connection';

        return (networkState === true) ? states[this.UNKNOWN] : states[networkState];
    },

    isOnline: function () {
        var networkState = this.connectionType();
        return (networkState === true) ? true : (networkState !== this.NONE); 
    },

    onOnlineChange: function (e) {
        //<debug>
        console.log('online change');
        //</debug>
        if(this.getSignalling()){
            Ext.toast({
                message: SU.Network.connectionTypeName(),
                styling: {
                    backgroundColor: this.connectionType() === this.NONE ? '#FF0000' : '#00FF00'
                }
            });
        }
        Ext.fireEvent('onlinechange', this.isOnline());
    }

}, function () {

    Ext.onReady(function () {
        if (window.Connection) {
            document.addEventListener('offline', Ext.bind(SU.native.Network.onOnlineChange, SU.native.Network), false);
            document.addEventListener('online', Ext.bind(SU.native.Network.onOnlineChange, SU.native.Network), false);
        }

        window.addEventListener('offline', Ext.bind(SU.native.Network.onOnlineChange, SU.native.Network), false);
        window.addEventListener('online', Ext.bind(SU.native.Network.onOnlineChange, SU.native.Network), false);

        Ext.isOnline = Ext.bind(SU.native.Network.isOnline, SU.native.Network);
    });

});
