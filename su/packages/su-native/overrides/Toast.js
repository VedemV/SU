/**
 * Переопределение Ext.Toast для нативного вывода сообщений.
 * 
 * 
 *        Ext.toast({
 *            message: 'Text here',
 *            timeout: 1500, // short, long
 *            position: 'center', // top, center, bottom
 *            styling: {
 *                opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
 *                backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
 *                textColor: '#FFFF00', // Ditto. Default #FFFFFF
 *                textSize: 20.5, // Default is approx. 13.
 *                cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
 *                horizontalPadding: 20, // iOS default 16, Android default 50
 *                verticalPadding: 16 // iOS default 12, Android default 30
 *            }
 *        });
 *      
 * Требуется плагин [cordova-plugin-x-toast](https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin)
 * 
 */
Ext.define('SU.native.overrides.Toast', {
    override: 'Ext.Toast'
}, function(){
    
    var extToast = Ext.toast;
    var nativeToast = undefined;
    
    Ext.toast = function(message, timeout){
        
        var config = message;
        nativeToast = window.plugins && window.plugins.toast;
        
        if (Ext.isString(message)) {
            config = {
                message: message,
                timeout: timeout
            };
        }

        //<debug>
        if (!config) {
            throw new Error("Toast requires a message");
        }
        //</debug>

        if (config.timeout === undefined) {
            config.timeout = Ext.Toast.prototype.config.timeout;
        }
        if (config.timeout === 'short') {
            config.timeout = 2000;
        }
        if (config.timeout === 'long') {
            config.timeout = 4000;
        }
        
        if (config.position === undefined) {
            config.position = 'top';
        }
        
        config.duration = config.timeout;
        
        if(nativeToast){
            console.log('native toast');
            nativeToast.showWithOptions(config);            
        } else {
            console.log('ext toast');
            extToast.apply(Ext, [config]);
        }
    };
    
    Ext.onReady(function(){
        nativeToast = window.plugins && window.plugins.toast;
    });
    
});

