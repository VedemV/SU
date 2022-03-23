/**
 * ������� ����� ��� {@link DBProxies.data.proxy.IndexedDB IndexedDB} � {@link DBProxies.data.proxy.Sql Sql} ������.
 * @private
 */
Ext.define('SU.dbproxies.data.proxy.Db', {
    extend: 'Ext.data.proxy.Client',

    config: {
        /**
         * @cfg {Boolean} cloud
         * ������� �� ������� ��������� �������� � ��������� ��������� �������� ������ ��� �������� � ������.
         * ��������, ��� ������ �� ������ ��� ���, ���� �� �� ����������� �������� �������, ����������� � ����� ������.
         */
        cloud: false,

        /**
         * @cfg {Boolean} implicitFields
         * ������� �� ����� ��������� ������� ���� � ������. 
         * ������� ���� - ��� ����, ������� �� ���� ���� ���������� � ������������ ����� ������, �� ���� ����������� � ������
         */
        implicitFields: false
    },

    /**
     * @cfg {Object} reader
     * �� ������������ � db-������
     * @hide
     */

    /**
     * @cfg {Object} writer
     * �� ������������ � db-������
     * @hide
     */

    setException: function (operation, error) {

        operation.setException(error);

    }

});
