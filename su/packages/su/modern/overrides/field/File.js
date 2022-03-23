/**
 * Bug: Ext.field.File ошибочно использует конфигурацию `proxyConfigs` для
 * 
 * - accept
 * - capture
 * - multiple
 * 
 * На самом деле должен быть `proxyConfig`
 */
Ext.define('SU.field.File', {
    override: 'Ext.field.File'

}, function (Cls) {

    var proxyConfig = Cls.prototype.proxyConfigs;

    Ext.mixin.ConfigProxy.processClass(Cls, proxyConfig);

});
