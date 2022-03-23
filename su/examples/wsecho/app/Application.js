/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('WSEcho.Application', {
    extend: 'Ext.app.Application',

    requires: [
		//'Ext.plugin.Viewport',
		'SU.storage.LocalStorageCookie',
		'WSEcho.view.Viewport',
		'WSEcho.controller.Main',
		'SU.locale.LocaleManager'
    ],

    name: 'WSEcho',
    quickTips: true,

	views: [
		//'WSEcho.view.Viewport'
	],

	controllers: [
		'Main'
	],

	init: function(){
		var me = this;
		// <debug>
		console.log('WSEcho.application.init');
		// </debug>
		Ext.Cookie.setProxyId(me.getName()+'.cookies');
		this.initLocales();
	},

	launch: function(){
		// <debug>
		console.log('WSEcho.application.launch');
		// </debug>
		//this.setMainView('Main');
	},

	initLocales: function () {
		var me = this,
			lm = SU.locale.LocaleManager,
			//lp = SU.locale.Persistence,
			locale,
			locales = Ext.create('store.locales', {
				data: [
					{ id: 'en', label: 'English', url: 'resources/locale/locale-en.js', propertiesClass: me.getName() + '.en.Languages' },
					{ id: 'es', label: 'Spanish', url: 'resources/locale/locale-es.js', propertiesClass: me.getName() + '.en.Global' },
					{ id: 'ru', label: 'Русский', url: 'resources/locale/locale-ru.js', propertiesClass: me.getName() + '.ru.Languages' }
				]
			});
		// <debug>
		console.log('WSEcho.application.initLocales');
		// </debug>
		Ext.Language.mode = 'dinamic';
		lm.setLocales(locales);
		lm.on({
			initialized: {
				fn: me.doInitLocales,
				single: true,
				scope: me
			}
		});
		// Определение текущей локали
		locale = lm.getPersistedLocale();
		lm.setLocale(locale);
	},

	doInitLocales: function () {
		this.setMainView('Main');
	},

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
