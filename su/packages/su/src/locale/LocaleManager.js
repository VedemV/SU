/* global Ext */

//<debug>
/**
 *
 * @property {Boolean} DEBUG_LOCALE=false
 * Включение отладочного вывода для локализации.
 *
 * _Доступно только в отладочных режимах._
 */
if( !Ext.isDefined(window.DEBUG_LOCALE) ) window.DEBUG_LOCALE = false;
//</debug>

/**
 * Общий класс для ExtJS 4.2+ / Sencha Touch 2.3+
 *
 * Обработчик локализации, позволяет переключать локаль,
 * обновлять локализацию зарегистрированных компонентов.
 *
 * Простейшее подключение менеджера в файле app.js для динамической локализации:
 *
 *     Ext.application({
 *         launch: function() {
 *              var lm = {@link SU.locale.LocaleManager};
 *				lm.{@link #mode} = 'dinamic';
 *
 *              // Подключение обработчиков (при необходимости)
 *              lm.{@link #addListener}('changelocales', this.changeLocalesEventHandler, this);
 *              lm.{@link #addListener}('changelocale', this.changeLocaleEventHandler, this);
 *              lm.{@link #addListener}('initialized', this.initializedEventHandler, this);
 *
 *              // Определение набора доступных языковых пакетов (файлов локализации)
 *              // и их подключение
 *              var locales = Ext.create('{@link SU.locale.store.LocalesStore}', {
 *                  data: [
 *                      {id: 'en', label: 'English', url: 'locale/lang-en.js', propertiesClass: 'Locales.en.Global'},
 *                      {id: 'es', label: 'Spanish', url: 'locale/lang-es.js', propertiesClass: 'Locales.es.Global'},
 *                      {id: 'ru', label: 'Русский', url: 'locale/lang-ru.js', propertiesClass: 'Locales.ru.Global'}
 *                  ]
 *              });
 *              lm.{@link #setLocales}(locales);
 *
 *              // Определение текущей локали
 *              var locale = lm.{@link #getPersistedLocale}();
 *              lm.{@link #setLocale}(locale);
 *         }
 *     }
 *
 * _Примечание:_ Перед использованием должен быть определен {@link Ext.Cookie#proxyId}.
 *
 * Для подключения менеджера в статическом режиме необходимо "отложить" создание
 * интерфейса до загрузки локализации
 *
 * __Sencha Touch__:
 *
 *		Ext.application({
 *			launch: function() {
 *				// Destroy the #appLoadingIndicator element
 *				Ext.fly('appLoadingIndicator').destroy();
 *				Ext.Cookie.setProxyId(this.getName()+'.cookies');
 *				this.initLocales();
 *			},
 *
 *			initLocales: function(){
 *				var me = this,
 *					lm = SU.locale.LocaleManager,
 *					lp = SU.locale.Persistence,
 *					locale,
 *					locales = Ext.create('store.locales', {
 *						data: [
 *							{id: 'en', label: 'English', url: 'resources/locale/locale-en.js', propertiesClass: me.getName()+'.en.Languages'},
 *							{id: 'es', label: 'Spanish', url: 'resources/locale/locale-es.js', propertiesClass: me.getName()+'.en.Global'},
 *							{id: 'ru', label: 'Русский', url: 'resources/locale/locale-ru.js', propertiesClass: me.getName()+'.ru.Languages'}
 *						]
 *					});
 *
 *				// Этот метод подключения подходит и для динамического режима
 *				//Ext.Language.mode = 'dinamic';
 *
 *				lm.setLocales(locales);
 *				lm.on({
 *					initialized: {
 *						fn: me.doInitLocales,
 *						single: true,
 *						scope: me
 *					}
 *				});
 *				// Определение текущей локали
 *				locale = lm.getPersistedLocale();
 *				lm.setLocale(locale);
 *			},
 *
 *			doInitLocales: function(){
 *				// Initialize the main view
 *				Ext.Viewport.add(Ext.create(me.getName()+'.view.Main'));
 *			},
 *		});
 *
 * __ExtJS__:
 *
 *		Ext.application({
 *			autoCreateViewport: false,
 *
 *			init: function() {
 *				Ext.Cookie.setProxyId(this.getName()+'.cookies');
 *				this.initLocales();
 *			},
 *
 *			initLocales: function(){
 *				var me = this,
 *					lm = SU.locale.LocaleManager,
 *					lp = SU.locale.Persistence,
 *					locale,
 *					locales = Ext.create('store.locales', {
 *						data: [
 *							{id: 'en', label: 'English', url: 'resources/locale/locale-en.js', propertiesClass: me.getName()+'.en.Languages'},
 *							{id: 'es', label: 'Spanish', url: 'resources/locale/locale-es.js', propertiesClass: me.getName()+'.en.Global'},
 *							{id: 'ru', label: 'Русский', url: 'resources/locale/locale-ru.js', propertiesClass: me.getName()+'.ru.Languages'}
 *						]
 *					});
 *
 *				// Этот метод подключения подходит и для динамического режима
 *				//Ext.Language.mode = 'dinamic';
 *
 *				lm.setLocales(locales);
 *				lm.on({
 *					initialized: {
 *						fn: me.doInitLocales,
 *						single: true,
 *						scope: me
 *					}
 *				});
 *				// Определение текущей локали
 *				locale = lm.getPersistedLocale();
 *				lm.setLocale(locale);
 *			},
 *
 *			doInitLocales: function(){
 *				this.setMainView('Main');
 *			},
 *		});

 * Локализация компонента:
 *
 *      {
 *          xtype: 'label',
 *          plugins: [
 *              { ptype: 'localization', method: 'setText', key: 'title' }
 *          ]
 *      }
 *
 * @singleton
 */
Ext.define('SU.locale.LocaleManager', {
	singleton: true,
	alternateClassName: 'Ext.Language',

	mixins: {
		observable: 'Ext.util.Observable'
	},

	requires:[
		//'SU.LocalStorageCookie',
		'SU.locale.LocalePlugin',
		'SU.locale.Persistence',
		'SU.locale.LocaleDelegate',
		'SU.locale.store.LocalesStore'
	],

	/**
	 * @event initialized
	 *
	 */
	/**
	 * @event changelocales
	 *
	 */
	/**
	 * @event loadinglocale
	 *
	 */
	/**
	 * @event changelocale
	 *
	 */
	/**
	 * @event failurelocale
	 *
	 */

	/**
	 * Указывает, что есть хотя бы один файл локализации.
	 */
	initialized: false,

	/**
	 * Массив экземпляров SU.locale.model.ClientModel, содержащих
	 * компоненты зарегистрированных для обновления локализации.
	 *
	 * @private
	 */
	clients: [],

	/**
	 * Набор доступных языковых пакетов.
	 * При отсутствии идентификатора во время
	 * {@link #setLocale установки текущей локализации} языка,
	 * будет выбираться первая запись из набора.
	 * @type {SU.locale.store.LocalesStore}
	 *
	 * @private
	 */
	locales: null,

	/**
	 * Режим загрузки локализации:
	 *
	 * - static: статическая загрузка, при изменении локализации выполняется
	 * перезагрузка страницы
	 *
	 * - dinamic: динамическая загрузка, при изменении локализации выполняется
	 * загрузка файла локализации и обновление компонентов
	 * через плагин SU.locale.LocalePlugin.
	 *
	 * @property {'static'|'dinamic'}
	 */
	mode: 'static',

	/**
	 * Возвращает набор доступных языковых пакетов.
	 *
	 * @return {SU.locale.store.LocalesStore}
	 */
	getLocales: function() {
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - get locales:', this.locales);
		//</debug>
		return this.locales;
	},

	/**
	 * Устанавливает набор доступных языковых пакетов.
	 *
	 * @param {SU.locale.store.LocalesStore} value
	 * SU.locale.store.LocalesStore используемый LocaleManager
	 */
	setLocales: function(value) {
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - set locales:', value);
		//</debug>
		this.locales = value;
		this.fireEvent('changelocales', {});
	},

	/**
	 * Идентификатор текущей локализации.
	 *
	 * @private
	 */
	locale: '',

	/**
	 * Возвращает идентификатор текущей локализации.
	 *
	 * @return {String}
	 */
	getLocale: function(){
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - get locale: '+this.locale);
		//</debug>
		return this.locale;
	},

	/**
	 * Устанавливает {@link #locale идентификатор текущей локализации}.
	 * Загружает файл локализации и обновляет зарегистрированные компоненты.
	 *
	 * @param {String} value Идентификатор локализации
	 */
	setLocale: function( value ){
		var me = this;
		me.fireEvent('loadinglocale', {});
		me.locale = value;
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - set locale: '+value);
		//</debug>
		me.loadPropertiesFile();
	},

	/**
	 * Экземпляр загруженного класса локализации.
	 *
	 * @private
	 */
	properties: null,

	/**
	 * Возвращает значение локализации по ключу.
	 *
	 * @param {String}  key Ключ для поиска значения
	 * @return {Object}
	 */
	getProperty: function(key) {
		try{
			// <debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - get property: '+key);
			// </debug>
			var res = this.properties && eval('this.properties.' + key);
			// <debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - property["'+key+'"]: '+res);
			// </debug>
			return res;
		}catch(e){
			// <debug>
			console.log(key, this.properties);
			console.error(e);
			// </debug>
			return null;
		}
	},

	/**
	 * Возвращает значение локализации по ключу `key`.
	 * При отсутствии значения возвращает `defaults`.
	 *
	 * @param {String}  key Ключ для поиска значения
	 * @param {Mixed}  defaults Значение по умолчанию
	 * @return {Object}
	 */
	getDefProperty: function(key, defaults) {
		return this.getProperty(key) || defaults;
	},

	/**
	 * Получает идентификатор локализации вызывая
	 * SU.locale.Persistence#getLocale.
	 *
	 * Если локализация не найдена, то выбирается первая запись из набора #locales.
	 *
	 * @param {Boolean} ignoreLocation
	 *
	 * @return {String}
	 */
	getPersistedLocale: function( ignoreLocation ){
		var me = this;
		ignoreLocation = ignoreLocation || me.mode !== 'static';
		var locale = SU.locale.Persistence.getLocale( ignoreLocation );
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - getPersistedLocale:', locale);
		//</debug>
		return this.locales.find('id', locale) !== -1 ? locale : me.locales.getAt(0).get('id');
	},

	/**
	 * @constructor
	 * @param {Object} config
	 */
	constructor: function(config) {
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] Constructing LocaleManager');
		//</debug>

		this.mixins.observable.constructor.call(this, config);
		this.callParent( arguments );
	},

	/**
	 * Вызов {@link SU.locale.LocaleDelegate загрузчика} языкового файла
	 * с адресом, указанным в {@link #locales} для {@link #locale текущей локализации}.
	 *
	 * @private
	 */
	loadPropertiesFile: function() {
		var me = this,
			rec = me.locales.findRecord('id', me.locale),
			fd = Ext.create(
				'SU.locale.LocaleDelegate',
				me.loadPropertiesFileResultHandler,
				me.loadPropertiesFileFaultHandler,
				me
			),
			url = rec.get('url');

		fd.loadPropertiesFile(url);
	},

	/**
	 * Обработчик успешного вызова загрузчика языкового файла.
	 *
	 * @private
	 * @param {String} result
	 */
	loadPropertiesFileResultHandler: function(result) {
		var me = this,
			head = document.getElementsByTagName("head")[0],
			script = document.createElement('script');

		if( !!this.script ) Ext.removeNode(this.script);
		script.type = 'text/javascript';
		script.innerHTML = result;
		head.appendChild(script);
		this.script = script;
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Properties file loaded: ' + me.locales.findRecord('id', me.locale).get('url'));
		//</debug>
		delete me.loadingDefault;

		setTimeout(function() {
			var rec = me.locales.findRecord('id', me.locale);
			try{
				me.properties = Ext.create(rec.get('propertiesClass'), {});
			} catch(e){

			}
			me.updateClients();
			if( me.properties.setLocalization ){
				me.properties.setLocalization();
			}
			SU.locale.Persistence.setLocale(me.locale);
			me.fireEvent('changelocale', {});
			if( !me.initialized ){
				//<debug>
				if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Locale Manager Initialized');
				//</debug>
				me.initialized = true;
				me.fireEvent('initialized', {});
			}
		}, 300);
	},

	/**
	 * Обработчик ошибки вызова загрузчика языкового файла.
	 *
	 * @private
	 */
	loadPropertiesFileFaultHandler: function() {
		var me = this;
		me.locale = me.getPersistedLocale( true );
		me.fireEvent( 'failurelocale', {} );
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] ERROR: LocaleManager - Failure loading properties file');
		//</debug>
		if( !me.initialized ){
			if( !me.loadingDefault ){
				me.loadingDefault = true;
				me.loadPropertiesFile();
				return;
			}
			delete me.loadingDefault;
			//<debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Locale Manager Initialized');
			//</debug>
			me.initialized = true;
			me.fireEvent('initialized', {});
		}
	},

	/**
	 * Обновляет все локализованные компоненты в приложении зарегистрированные в
	 * {@link #clients}.
	 *
	 * @private
	 */
	updateClients: function() {
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Updating Clients');
		//</debug>

		var len = this.clients.length-1;
		for(var i=len; i>-1; i--) {
			this.updateClient(this.clients[i]);
		}
	},

	/**
	 * Обновляет локализованный компонент в приложении.
	 * Вызывает метод компонента передавая ему значение локализации.
	 * Зачением является результат вызова {@link #getProperty} при определенном
	 * ключе и найденном значении или весь {@link #properties экземпляр загруженного класса локализации}.
	 *
	 * @private
	 * @param {SU.locale.model.ClientModel} clientModel
	 * Объект модели компонетов локализации.
	 */
	updateClient: function( clientModel ){
		var client = clientModel.get('client'),
			method = clientModel.get('method'),
			key = clientModel.get('key'),
			allowEmpty = clientModel.get('allowEmpty');

		try {
			var prop;
			if( key ){
//				var global = this.getProperty(key);
//				prop = global ? global : this.properties;
				prop = this.getProperty(key);
			} else {
				prop = this.properties;
			}
			if( !!prop || allowEmpty ){
				if( typeof(method) === 'string' ){
					client[method].call( client, prop );
				} else if( typeof(method) === 'function' ){
					method.call( client, prop );
				}
			}
		} catch(e){
			//<debug>
			if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] ERROR: LocaleManager - Error updating client [client: ' + client.getId() + ', method: ' + method + ', key: ' + key + '] - error: ' + e);
			//</debug>
		}
	},

	/**
	 * Регистрация компонента. Сохраняет объект
	 * {@link SU.locale.model.ClientModel модели компонетов локализации}
	 * в {@link #clients}.
	 *
	 * @param {SU.locale.model.ClientModel} clientModel
	 * Объект модели компонетов локализации.
	 */
	registerClient: function( clientModel ){
		var me = this;
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Registering client component [client: ' + clientModel.get('client').getId() + ', method: ' + clientModel.get('method') + ', key: ' + clientModel.get('key') + clientModel.get('allowEmpty') + ']');
		//</debug>

		me.clients.push(clientModel);
		var client = clientModel.get('client');
		client.on('destroy', function(){
			me.unregisterClient(clientModel);
		});
		if( me.properties ){
			me.updateClient(clientModel);
		}
	},

	unregisterClient: function( clientModel ){
		var me = this,
			clients = me.clients;
		//<debug>
		if( !!window.DEBUG_LOCALE ) console.log('[LOCALE] LocaleManager - Unregistering client component [client: ' + clientModel.get('client').getId() + ', method: ' + clientModel.get('method') + ', key: ' + clientModel.get('key') + clientModel.get('allowEmpty') + ']');
		//</debug>
		for( var i in clients ){
			if( !clients.hasOwnProperty(i) ) continue;
			if( clients[i] === clientModel ){
				clients.splice(i, 1);
				return;
			}
		}
	},

	updateByClient: function( client ){
		var me = this,
			len = me.clients.length-1,
			model;
		for( var i=len; i>-1; i-- ){
			model = me.clients[i];
			if( model && model.get('client') === client ){
				me.updateClient(model);
			}
		}

	}
});

