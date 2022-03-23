/**
 * Модель объектов загружаемых локализаций.
 *
 * Содержит определения полей:
 *
 * - id: идентификатор локализации ('en', 'ru', ...)
 *
 * - label: название локализации, отображаемое в SU.locale.LangSelect
 *
 * - url: адрес языкового пакета
 *
 * - propertiesClass: имя создаваемого класса языкового пакета ('Locales.en.Global', 'Locales.ru.Global', ...)
 *
 * @since 1.0.0.0
 */
Ext.define('SU.locale.model.LocaleModel', {
    extend: 'Ext.data.Model',

	config:{
		fields: [
			{name: 'id', type: 'string'},
			{name: 'label', type: 'string'},
			{name: 'url', type: 'string'},
			{name: 'propertiesClass', type: 'string'}
		]
	}

});
