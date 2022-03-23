/*
 * Project    : Lib Packages Common
 * File	      : utils/ShowEvents.js
 * Created on : 09.07.2015 17:47:43
 *
 */

// <debug>

/**
 * Выводит в консоль все события генерируемые компонентом.
 *
 * __Используется только в режиме отладки__
 *
 * @history 13.02.2017
 * Исправления в связи с неправильной обработкой событий с проверкой результата.
 *
 * Ранее не возвращался результат из обработчика.
 *
 * @history 09.07.2015
 * Создание модуля
 */
Ext.define('SU.utils.ShowEvents', {
	requires: ['Ext.util.Observable'],

	mixinConfig: {
		id: 'showevents'
	},

	/**
	 * `true` запрещает вывод сообщений
	 *
	 * @property {Boolean}
	 */
	disabledShowEvents: false,

	//
	onClassMixedIn: function (cls) {
		cls.prototype.fireEvent = function () {
			var me = this;
			if( !me.disabledShowEvents ){
				console.log('[SHOW EVENTS]', me.$className, arguments[0], arguments);
			}
			return Ext.util.Observable.prototype.fireEvent.apply(this, arguments);
		};
	}
});

// </debug>


