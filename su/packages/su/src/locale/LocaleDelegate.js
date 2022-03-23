/**
 * Класс загрузки файла языкового пакета.
 *
 */
Ext.define('SU.locale.LocaleDelegate', {
    requires: [
        'Ext.Ajax'
    ],

    /**
     * Метод, вызываемый при успешной загрузке файла языкового пакета.
     * @type {Function}
	 * @param {String} responseText Строка, содержащая текст ответа.
     * @private
     */
    success: undefined,

    /**
     * Метод, вызываемый при проблемах в загрузке файла языкового пакета.
     * @type {Function}
	 * @param {Object} response Объект XMLHttpRequest, содержащий данные ответа.
     * @private
     */
    failure: undefined,

    /**
     * Область видимости при вызове методов {@link #success} и {@link #failure}.
     *
     * @private
     */
    scope: undefined,

    /**
     * @param {Function} success
     * @param {Function} failure
     * @param {Object} scope
     */
    constructor: function(success, failure, scope) {
        this.callParent(arguments);

        this.success = success;
        this.failure = failure;
        this.scope = scope;
    },

    /**
     * Загрузка файла языкового пакета по указанной ссылке.
     *
     * @param {String} url - Адрес файла для загрузки
     */
    loadPropertiesFile: function(url) {
        if(!this.success || !this.scope)
            return;

        Ext.Ajax.request({
            url: url,
            success: this.ajaxSuccess,
            failure: this.ajaxFailure,
            scope: this
        });
    },

    /**
     * Обработчик успешного вызова AJAX
     *
     * @private
     * @param {Object} response
     */
    ajaxSuccess: function(response) {
        this.success.call( this.scope, response.responseText );
    },

    /**
     * Обработчик ошибок при вызове AJAX
     *
     * @private
     * @param {Object} response
     */
    ajaxFailure: function(response) {
		this.failure.call( this.scope, response );
    }
});
