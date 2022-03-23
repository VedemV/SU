/**
 * Класс для чтения/сохранения последнего загруженного идентификатора локали из
 * {@link SU.locale.Persistence локального хранилища}.
 *
 * @singleton
 */
Ext.define('SU.locale.Persistence', {
    singleton: true,

	requires:[
		'SU.storage.LocalStorageCookie'
	],

    /**
     * Возвращает идентификатор локали из
	 * {@link Ext.Cookie локального хранилища}.
	 *
	 * При отсутствии, выполняет поиск подходящего идентификатора в переменных браузера.
     *
	 * @param {Boolean} [ignoreLocation=false] true - не получать
	 * идентификатор локали из строки адреса.
	 *
     * @return {String}
     */
    getLocale: function( ignoreLocation ){
		var lang;
		if( ignoreLocation !== true ) lang = this.getLocationLanguage();
		//<debug>
        if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Getting persisted locale id from location: ' + lang, ignoreLocation);
		//</debug>
		if( !lang ){
			lang = Ext.Cookie.get('language');
			//<debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Getting persisted locale id from cookie: ' + lang);
			//</debug>
		}
		if( !lang ){
			lang = this.getBrowserLanguage();
			//<debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Getting persisted locale id: ' + lang);
			//</debug>
		}
        return lang;
    },

    /**
     * Сохраняет идентификатор локали в
	 * {@link Ext.Cookie локальном хранилище}.
     *
     * @param {String} value
	 * Идентификатор локали
     */
    setLocale: function(value) {
		//<debug>
        if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Persisting locale save id: ' + value);
		//</debug>
		Ext.Cookie.set('language', value);
		//<debug>
        if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Persisting locale saved id: ' + Ext.Cookie.get('language'));
		//</debug>
    },

	/**
	 * Получает язык из переменных браузера.
	 *
	 * @returns {String}
	 */
	getBrowserLanguage: function(){
		var na = navigator,
			locale = na.userAgent.match(/[a-z]{2}-[a-z]{2}/);
		if( !!locale ) locale = locale[0];
		locale = locale || na.language || na.userLanguage;
		//<debug>
        if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Getting persisted locale id from userAgent: ' + locale);
		//</debug>
		return locale.split("-")[0];
	},

	/**
	 * Получает идентификатор локали из строки адреса.
	 *
	 * @returns {String}
	 */
	getLocationLanguage: function(){
		var params = Ext.urlDecode(window.location.search.substring(1));
		//<debug>
        if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Persistence - Getting persisted locale id from location: ' + params.lang);
		//</debug>
		return params.lang;
	}

});
