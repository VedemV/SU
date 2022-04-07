/**
 *
 */
Ext.define('SU.dbproxies.data.SqlConnection', {
    singleton: true,

    requires: ['SU.dbproxies.config.Config'],

    getConn: function () {
        if (!Ext.isDefined(this.conn)) {
            if (window.sqlitePlugin) {
                this.conn = window.sqlitePlugin.openDatabase({
                    name: SU.dbproxies.config.Config.dbName + '.db',
                    location: 'default'
                });
            } else {
                this.conn = window.openDatabase(
                    SU.dbproxies.config.Config.dbName,
                    SU.dbproxies.config.Config.dbVersion,
                    SU.dbproxies.config.Config.dbDescription,
                    SU.dbproxies.config.Config.dbSize
                );
            }
        }
        return this.conn;
    }
});
