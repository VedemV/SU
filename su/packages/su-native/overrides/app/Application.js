/**
 *
 */
Ext.define('SU.native.overrides.app.Application', {
    override: 'Ext.app.Application',

    /**
     * @inheritdoc
     * @localdoc
     * Придерживает запуск приложения до инициализации ExtJS
     * и готовности устройства при использовании нативной поддержки
     */
    init: function () {
        var me = this;

        if (window.cordova) {
            var profilesReady = me.onProfilesReady,
                nativeRady = false,
                extRady = false;

            function mayBeRady() {
                if (nativeRady && extRady) {
                    profilesReady.call(me);
                }
            }

            me.onProfilesReady = function () {
                extRady = true;
                mayBeRady();
            };

            document.addEventListener('deviceready', function () {
                nativeRady = true;
                mayBeRady();
            });
        }

        me.callParent(arguments);
    }
});
