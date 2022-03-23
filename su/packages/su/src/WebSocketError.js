/*
 * Project    : SU Lib Core
 * File	      : WebSocketError.js
 * Created on : 29.04.2015 13:36:15
 */

/* global Ext */

/**
 * Общий класс для ExtJS 4.2+ / Sencha Touch 2.3+
 *
 * Класс обработки ошибок SU.WebSocket.
 *
 * @history 26.07.2017
 * Изменения локализации, связанные с изменениями SU.Error
 *
 * @history 29.04.2015
 * Создание модуля
 */
Ext.define('SU.WebSocketError', {
	alternateClassName: ['Ext.WebSocketError'],

	extend: 'SU.Error',
	name: 'WebSocketError',

	constructor: function (config) {
		config = config || {};
		config.name = config.name || this.name;
		this.callParent(arguments);
	},

	statics: {
		/**
		 * @inheritdoc SU.Error#locales
		 * @localdoc Локализация исключений Ext.WebSocket.
		 *
		 * @property {Object} [locales={}]
		 * @property {String} locales.ALREADY_ESTABLISHED
		 * @property {String} locales.NOT_CONNECTED
		 * @property {String} locales.CAN_NOT_CONNECT
		 * @property {String} locales.INVALID_SCHEME
		 * @property {String} locales.INVALID_ADDRESS
		 * @property {String} locales.LOGIN_NOT_DEFINED
		 * @property {String} locales.LOGIN_ERROR
		 * @property {String} locales.LOGIN_CUSTOM
		 * @property {String} locales.LOGIN_UNKNOWN
		 * @property {String} locales.LOGIN_INV_METHOD
		 * @property {String} locales.AUTHORIZE_ERROR
		 *
		 * @protected
		 */
		locales: {
			ALREADY_ESTABLISHED: 'The connection is already established.',
			NOT_CONNECTED: 'The connection is not established.',
			CAN_NOT_CONNECT: 'Can not connect to {0}',
			DISCONNECT: 'Connecting to {0} has been interrupted.',
			INVALID_SCHEME: 'Invalid schema \'{0}\' for WebSocket',
			INVALID_ADDRESS: 'Invalid address \'{0}\' for WebSocket',
			LOGIN_NOT_DEFINED: 'Not defined for automatic login user authorization.',
			LOGIN_ERROR: 'Login failed (Code {0}).\n\n{1}',
			LOGIN_CUSTOM: 'Invalid username or password.',
			LOGIN_UNKNOWN: 'Username or password unidentified.',
			LOGIN_INV_METHOD: 'Authorization is prohibited by the system administrator.',
			AUTHORIZE_ERROR: 'Runtime error authorization request.'

			//ALREADY_ESTABLISHED		: 'Соединение уже установлено.',
			//NOT_CONNECTED				: 'Соединение не установлено.',
			//CAN_NOT_CONNECT			: 'Невозможно установить соединение с {0}',
			//DISCONNECT				: 'Соединение с {0} было прервано.',
			//INVALID_SCHEME			: 'Неверная схема \'{0}\' для WebSocket',
			//INVALID_ADDRESS			: 'Неверный адрес \'{0}\' для WebSocket',
			//LOGIN_NOT_DEFINED			: 'Не определен логин для автоматической авторизации пользователя.',
			//LOGIN_ERROR				: 'Ошибка входа в систему ({0}).\n\n{1}',
			//LOGIN_CUSTOM				: 'Неверный логин или пароль',
			//LOGIN_UNKNOWN				: 'Имя пользователя или пароль неопознаны.',
			//LOGIN_INV_METHOD			: 'Авторизация запрещена администратором системы.',
			//AUTHORIZE_ERROR			: 'Ошибка выполнения запроса авторизации.'
		}
	}

});
