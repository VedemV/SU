/*
 * Project    : SU Lib Core
 * File	      : Error.js
 * Created on : 29.04.2015 13:36:15
 */

/**
 * @class SU.Error
 *
 * Общий класс для ExtJS 4.2+ / Sencha Touch 2.3+
 *
 * Класс-оболочка для объекта Error JavaScript, который добавляет
 * несколько полезных возможностей для обработки ошибок в приложении.
 *
 * Полностью перекрывает существующий класс Ext.Error.
 *
 * При использовании Ext#raise из любого класса,
 * который использует систему классов Ext 4.2+ или ST,
 * автоматически добавляется класс источника и метод, в котором была ошибка.
 * Он также включает в себя логику для автоматического вывода ошибки на консоль,
 * с дополнительными метаданными об ошибке.
 *
 * SU.Error определяет глобальный метод обработки ошибки #handle,
 * который может быть изменен в целях обработки ошибки в одном месте на уровне приложения.
 * При необходимости можно использовать #ingnore для игнорирования обработки ошибок,
 * хотя в реальном приложении лучше переопределить функцию по обработке ошибок
 * и вести журнал отчета об ошибках.
 *
 * ## Примеры
 *
 * ### В самом простом варианте можно просто вызвать ошибку в виде строки из любого места кода:
 *
 *     @example
 *
 *     throw new SU.Error('Something bad happened!');
 *
 *
 * ### Ошибка в виде строки:
 *
 *      @example
 *
 *		Ext.raise('A simple string error message');
 *
 * ### Перехват ошибок:
 *
 *      @example
 *
 *		SU.Error.ignore = false;
 *		SU.Error.handle = function(e){
 *		    if(e.name === 'ReferenceError'){
 *		        alert(Ext.String.format('Name: {0},\nMessage: {1},\nDescription: {2}', e.name, e.message, e.description));
 *		        return true;
 *		    }
 *		    return SU.Error.ignore;
 *		}
 *		try{
 *		    err+1;
 *		} catch(e){
 *		    Ext.raise(e);
 *		}
 *
 *		Ext.raise('Not handled a simple string  error message');
 *
 * ### Ошибки с локализацией и параметрами:
 *
 *      @example
 *
 *		Ext.raise({
 *			etype: 'Ext.WebSocketError',
 *			msg: ['CAN_NOT_CONNECT', 'ws://example.com']
 *		});
 *
 * ### Использование `instanceof`:
 *
 *      @example
 *
 *		SU.Error.handle = function(e){
 *          alert(
 *              e.toString()+
 *              '\n'+
 *              e.description+
 *              '\nInstance of Error: '+(e instanceof Error)+                           // TRUE
 *              '\nInstance of SyntaxError: '+(e instanceof SyntaxError)+               // FALSE
 *              '\nInstance of Ext.Base: '+(e instanceof Ext.Base)+                     // FALSE
 *              '\nInstance of Ext.Error: '+(e instanceof Ext.Error)+                   // true
 *              '\nInstance of SU.Error: '+(e instanceof SU.Error)+                     // true
 *              '\nInstance of Ext.WebSocketError: '+(e instanceof Ext.WebSocketError)  // true | false
 *          );
 *		    return true;
 *		}
 *
 *      try {
 *          Ext.raise({
 *              etype: 'Ext.WebSocketError',
 *              msg: ['CAN_NOT_CONNECT', 'ws://example.com']
 *          });
 *      } catch(e) {
 *          Ext.raise(e);
 *      }
 *
 *      try {
 *          eval('for(');
 *      } catch(e) {
 *          Ext.raise(e);
 *      }
 *
 * Класс полностью поддерживает методику системы классов Sencha, но
 * его прототипом является класс Error JavaScript. Поддерживаются следующие
 * instanceof:
 *
 * - Error
 * - Ext.Error
 * - SU.Error
 * - классы наследники от SU.Error
 *
 * _Не является instanceof класса Ext.Base_
 *
 * @history 06.04.2018
 * Переписана обработка 'DOMException'. Раньше был AV.
 * 
 * @history 22.08.2017
 * Описание класса обернуто в самовызывающуюся функцию
 * для правильной работы в Sencha Touch
 *
 * @history 26.07.2017
 * Изменения в конфигурации при использовании
 * локализации ошибок
 *
 * @history 22.01.2017
 * Класс переписан, т.к. предыдущий вариант приводил
 * к ошибке загрузки в отладочном режиме.
 *
 * @history 29.04.2015
 * Создание модуля
 */
Ext.define('SU.Error', (function(){

    function toString(formated){
        var me = this,
            cls = me.sourceClass,
            method = me.sourceMethod,
            msg = me.message || me.msg,
			crlf = formated ? '\n    ' : ' ';

        if (method) {
            if (msg) {
                method += '()'+crlf;
                method += msg;
            } else {
                method += '()';
            }
        }

        if (cls) {
            method = method ? (cls + '::' + method) : cls;
        }

        return (formated ? ('['+me.name+']') : (me.name+':'))
			+crlf + ( method || msg || '' );
    };

    return {


        /**
         * @cfg {String/Array} msg
         * @inheritdoc #cfg-message
         * @localdoc альтернатива для {@link #cfg-message}
         */

        /**
         * Имя класса ошибки
         */
        name: 'SUError',

        /**
         * @cfg {String/Array} message (required)
         * Текст сообщения об ошибке или массив для форматирования сообщения.
         *
         * @localdoc В массиве первый элемент используется для формата сообщения,
         * остальные элементы - параметры сообщения.
         *
         * Строковые значения могут являтся ключом локализации и будут заменены
         * соответствующими значениями.
         */
        message: 'Empty message',

        /**
         * @cfg {String/Array/Boolean} description (optional)
         * Описание ошибки в виде строки или массива для форматирования. Формирование
         * описания такое же как и для {@link #cfg-message}.
         *
         * При значении `false` описание ошибки не создается.
         *
         * По умолчанию описание ошибки соответствует вызову #toString.
         *
         */
        description: undefined,

        /**
         * Локализация и форматирование сообщений
         * @param {String/Array} message Сообщение
         * @returns {String} Форматированное сообщение
         * @protected
         */
        format: function( message ){
            var me = this;
            if( message ){
                if( !Ext.isArray(message) ) message = [message];
                for( var i = 0, ln = message.length; i < ln; i++ ){
                    try{
                        if( Ext.isString(message[i]) ){
                            var o = me, m = null;
                            while( !!o && !m ){
                                m=o.self.locales && o.self.locales[message[i]];
                                o=o.superclass;
                            }
                            message[i] = m || message[i];
                        }
                    } catch (e) {
                        //
                    }
                }
                return Ext.String.format.apply( me, message );
            }
            return message;
        },

        constructor: function( config ){
            var me = this,
                statics = me.statics(),
                options = config;

            if( config instanceof SU.Error ){
                // Была перекрыта своя ошибка - ее и вернем
				Ext.apply(this, config);
                return;

            } else if( Ext.isString(config) ){
				// В конфигурации только сообщение
                options = new Error(config);
				options.name = me.name || 'ExtError';
				options.msg = config;

            } else if( config instanceof DOMException ){
                // Перекрыта ошибка DOMException - пробуем локализовать,
				// в описании оригинальное исключение
                options = Ext.applyIf({
                    name: config.name || this.name,
                    message: [SU.Error.DOMExceptions[config.code || 0] || 'DOM_UNKNOWN', config.code || 0],
                    description: toString.call(config)
                }, config);

            } else if( config instanceof Error ){
                // Перекрыта ошибка JavaScript,
				// в описании оригинальное исключение
                options.name = config.name || me.name;
                options.message = config.msg || config.message;
                options.description = Ext.isDefined(config.description)
					? config.description
					: toString.call(config, true);

            } else {
				//
                options.name = config.name || me.name;
                options.description = Ext.isDefined(config.description)
					? config.description
					: toString.call(config, true);
//                options.description = me.description !== false
//					? ( config.description || toString.call(config, true) )
//					: config.description;
			}

            // локализация и форматирование сообщений и описания
            options.msg = me.format( options.msg || options.message );
            options.description = me.format( options.description );

            Error.call(this, options.msg);

            if( Ext.isObject(config) ){
				// Возможные дополнительные параметры
                Ext.apply(this, config);
            }

			// Присваивание значений
			// !!!!
			// Ext.apply использовать нельзя, т.к. у прототипа Error
			// на некоторые свойства закрыто enumerable
			//
            me.name = options.name || me.name || 'ExtError';
			me.message = options.msg || options.message || me.message;
			if( options.description !== false && me.description !== false ){
                me.description = options.description || toString.call(me, true);
			}

			me.lineNumber	= me.lineNumber || options.lineNumber;
			me.columnNumber	= me.columnNumber || options.columnNumber;
			me.fileName		= me.fileName || options.fileName;

			me.stack = me.stack || options.stack;

			// Для тех кто не выдает стек
			if( !me.stack ){
				if (Error.captureStackTrace) {
					Error.captureStackTrace(me, me.constructor);
				} else {
					me.stack = (new Error()).stack;
				}
			}

            if( me.stack ){
				// В FireFox свой чудный стек
				var stack = me.stack.split('\n');
				Ext.iterate(stack, function(item, index, array){
					var line = item.split('@');
					line && line[1] && (line[1] = '('+line[1]+')');
					item = line.join(' ');
					array[index] = item.trim();
				});
                me.stack = stack.join('\n    ');

				// Сведения о месте падения есть не у всех - добавим что сможем
				if( !me.fileName && !me.lineNumber ){
					stack = me.stack.split('\n');
					var line = stack.shift();
					if( !/:\d+:\d+\)$/.test(line) ){
						line = stack.shift();
					}
					var math = /[\(](.+):(\d+):(\d+)/ig.exec(line);
					me.fileName = math && math[1];
					me.lineNumber = math && parseInt(math[2]);
					me.columnNumber = math && parseInt(math[3]);
				}
            }

        },

		/**
		 * Возвращает сообщение об ошибке.
		 *
		 * @method
		 * @return {String} сообщение об ошибке
		 * @protected
		 */
		toString: function(){
			return toString.call(this);
		},

		/**
		 * Возвращает форматированное сообщение об ошибке с переводами сторки и отступами.
		 *
		 * @method
		 * @return {String} сообщение об ошибке
		 * @protected
		 */
		toFormatedString: function(){
			return toString.call(this, true);
		},

        statics:{

            /**
             * Флаг, который может быть использован для глобального
             * отключения сообщений об ошибках если установлен в `TRUE`.
             *
             * В большинстве случаев предпочтительнее установить пользовательскую
             * функцию #handle для обработки ошибки.
             */
            ignore: false,

            /**
             * Создает исключение JavaScript включающее в себя дополнительные данные
             * о методе и классе в котором возникла ошибка.
             *
             * Может быть переданана строка сообщения об ошибке, либо
             * объект с атрибутом `msg` или `message`, который будет
             * использоваться в качестве сообщения об ошибке, либо
             * перехваченное исключение JavaScript.
             *
             * Ошибка в виде строки:
             *
             *		SU.Error.raise('A simple string error message');
             *
             * Перехват исключения JavaScript:
             *
             *		SU.Error.ignore = false;
             *		SU.Error.handle = function(e){
             *			console.warn('Name: %s,\nMessage: %s,\nDescription: %s', e.name, e.message, e.description);
             *		}
             *		try{
             *			err+1;
             *		} catch(e){
             *			SU.Error.raise(e);
             *		}
             *
             * Исключение с локализацией и параметрами:
             *
             *		SU.Error.raise({
             *			etype: 'Ext.WebSocketError',
             *			msg: ['CAN_NOT_CONNECT', 'ws://example.com']
             *		});
             *
             * @param {String/Object} error Описание ошибки
			 *
             * @param {String} [error.etype=SU.Error] (optional)
             * тип создаваемого исключения
			 *
             * @param {String} error.message
			 * Сообщение об ошибке
			 *
             * @param {String} [error.msg]
			 * Алиас error.message
			 *
             * @param {String} [error.description]
			 * Дополнительное описание
             *
             * @static
             * @deprecated 6.0.0 Use Ext#raise instead.
             */
            raise: function(error) {
                var me = this,
                    method = me.raise.caller,
                    msg, name, etype, exception;
                error = error || {};
                if( Ext.isString(error) ){
                    error = { msg: error };
                }

                if (method === Ext.raise) {
                    method = method.caller;
                }
                if (method) {
                    if (!error.sourceMethod && (name = method.$name)) {
                        error.sourceMethod = name;
                    }
                    if (!error.sourceClass && (name = method.$owner) && (name = name.$className)) {
                        error.sourceClass = name;
                    }
                }

                etype = error.etype || 'SU.Error';
                delete error.etype;
                exception = Ext.create( etype, error );

                if( me.handle(exception) !== true ){
                    msg = toString.call(exception);
                    //<debug>
                    console.error( msg );
                    //</debug>
                    throw exception;
                }
            },

            /**
             *
             * Глобальный обработчик ошибок, созданных методом {@link #raise}.
             *
             * Возможна индивидуальная обработка различных ошибок.
             *
             * Для продолжения выполнения сценария без создания исключения
             * обработчик должен вернуть `true`.
             *
             *     Ext.Error.handle = function(err) {
             *         if (err.someProperty == 'NotReallyAnError') {
             *             // например, логгирование ошибок
             *             return true;
             *         }
             *         if (err.name == 'WebSocket.Error'){
             *             // например, логгирование ошибок при отладке
             *             // без генерации исключений
             *             //<debug>
             *             console.warn('Name: %s,\nMessage: %s,\nDescription: %s', e.name, e.message, e.description);
             *             return true;
             *             //</debug>
             *         }
             *         // Все прочие ошибки приведут к созданию исключения
             *     }
             *
             * @param {SU.Error} err Объект SU.Error
             * 
             * @return {Boolean} Результат обработки ошибки
             * 
             * @template
             */
            handle: function( err ){
                return this.ignore;
            },

            /**
             * Коды исключений для DOMException
             * @protected
             */
            DOMExceptions: [
                'DOM_UNKNOWN',
                'DOM_INDEX_SIZE_ERR',
                'DOM_STRING_SIZE_ERR',
                'DOM_HIERARCHY_REQUEST_ERR',
                'DOM_WRONG_DOCUMENT_ERR',
                'DOM_INVALID_CHARACTER_ERR',
                'DOM_NO_DATA_ALLOWED_ERR',
                'DOM_NO_MODIFICATION_ALLOWED_ERR',
                'DOM_NOT_FOUND_ERR',
                'DOM_NOT_SUPPORTED_ERR',
                'DOM_INUSE_ATTRIBUTE_ERR',
                'DOM_INVALID_STATE_ERR',
                'DOM_SYNTAX_ERR',
                'DOM_INVALID_MODIFICATION_ERR',
                'DOM_NAMESPACE_ERR',
                'DOM_INVALID_ACCESS_ERR',
                'DOM_VALIDATION_ERR',
                'DOM_TYPE_MISMATCH_ERR',
                'DOM_SECURITY_ERR',
                'DOM_NETWORK_ERR',
                'DOM_ABORT_ERR',
                'DOM_URL_MISMATCH_ERR',
                'DOM_QUOTA_EXCEEDED_ERR'
            ],

            /**
             * Локализация исключений DOMException.
             *
             * @property {Object} [locales={}]
             * @property {String} locales.DOM_UNKNOWN
             * @property {String} locales.DOM_INDEX_SIZE_ERR
             * @property {String} locales.DOM_STRING_SIZE_ERR
             * @property {String} locales.DOM_HIERARCHY_REQUEST_ERR
             * @property {String} locales.DOM_WRONG_DOCUMENT_ERR
             * @property {String} locales.DOM_INVALID_CHARACTER_ERR
             * @property {String} locales.DOM_NO_DATA_ALLOWED_ERR
             * @property {String} locales.DOM_NO_MODIFICATION_ALLOWED_ERR
             * @property {String} locales.DOM_NOT_FOUND_ERR
             * @property {String} locales.DOM_NOT_SUPPORTED_ERR
             * @property {String} locales.DOM_INUSE_ATTRIBUTE_ERR
             * @property {String} locales.DOM_INVALID_STATE_ERR
             * @property {String} locales.DOM_SYNTAX_ERR
             * @property {String} locales.DOM_INVALID_MODIFICATION_ERR
             * @property {String} locales.DOM_NAMESPACE_ERR
             * @property {String} locales.DOM_INVALID_ACCESS_ERR
             * @property {String} locales.DOM_VALIDATION_ERR
             * @property {String} locales.DOM_TYPE_MISMATCH_ERR
             * @property {String} locales.DOM_SECURITY_ERR
             * @property {String} locales.DOM_NETWORK_ERR
             * @property {String} locales.DOM_ABORT_ERR
             * @property {String} locales.DOM_URL_MISMATCH_ERR
             * @property {String} locales.DOM_QUOTA_EXCEEDED_ERR
             * @protected
             */
            locales: {
                DOM_UNKNOWN: "Unknown Exception Code ({0})",
                DOM_INDEX_SIZE_ERR: "Index out of bounds",
                DOM_STRING_SIZE_ERR: "The resulting string is too long to fit in a DOMString",
                DOM_HIERARCHY_REQUEST_ERR: "The Node can not be inserted at this location",
                DOM_WRONG_DOCUMENT_ERR: "The source and the destination Documents are not the same",
                DOM_INVALID_CHARACTER_ERR: "The string contains an invalid character",
                DOM_NO_DATA_ALLOWED_ERR: "This Node / NodeList does not support data",
                DOM_NO_MODIFICATION_ALLOWED_ERR: "This object cannot be modified",
                DOM_NOT_FOUND_ERR: "The item cannot be found",
                DOM_NOT_SUPPORTED_ERR: "This implementation does not support function",
                DOM_INUSE_ATTRIBUTE_ERR: "The Attribute has already been assigned to another Element",
                DOM_INVALID_STATE_ERR: "The object is no longer usable",
                DOM_SYNTAX_ERR: "An invalid or illegal string was specified",
                DOM_INVALID_MODIFICATION_ERR: "Cannot change the type of the object",
                DOM_NAMESPACE_ERR: "The namespace declaration is incorrect",
                DOM_INVALID_ACCESS_ERR: "The object does not support this function",
                DOM_VALIDATION_ERR: "The operation would cause the node to fail validation.",
                DOM_TYPE_MISMATCH_ERR: "The node type is incompatible with the expected parameter type.",
                DOM_SECURITY_ERR: "The operation is not allowed due to same origin policy restriction.",
                DOM_NETWORK_ERR: "A network error occurred.",
                DOM_ABORT_ERR: "The user aborted an operation.",
                DOM_URL_MISMATCH_ERR: "The specified URL does not match.",
                DOM_QUOTA_EXCEEDED_ERR: "The operation would exceed storage limits."

                //DOM_UNKNOWN						: "Неизвестное исключение. Код ({0})",
                //DOM_INDEX_SIZE_ERR				: "Индекс или размер является отрицательным, или больше, чем допустимое значение.",
                //DOM_STRING_SIZE_ERR				: "Результирующая строка слишком длинная, чтобы поместиться в DOMString",
                //DOM_HIERARCHY_REQUEST_ERR		: "Узел не может быть вставлен в требуемое место",
                //DOM_WRONG_DOCUMENT_ERR			: "Узел принадлежит другому документу и не могут быть использован.",
                //DOM_INVALID_CHARACTER_ERR		: "Строка содержит недопустимый символ",
                //DOM_NO_DATA_ALLOWED_ERR			: "Данные указаны для узла, который не поддерживает данные.",
                //DOM_NO_MODIFICATION_ALLOWED_ERR	: "Сделана попытка модифицировать объект, который не может быть изменен.",
                //DOM_NOT_FOUND_ERR				: "Элемент не может быть найден",
                //DOM_NOT_SUPPORTED_ERR			: "Запрошенная операция не поддерживается.",
                //DOM_INUSE_ATTRIBUTE_ERR			: "Указанный атрибут уже используется в другом месте.",
                //DOM_INVALID_STATE_ERR			: "Указанный узел не принадлежит документу.",
                //DOM_SYNTAX_ERR					: "Указано недопустимое значение строки.",
                //DOM_INVALID_MODIFICATION_ERR	: "Невозможно изменить тип объекта",
                //DOM_NAMESPACE_ERR				: "Декларация пространства имен некорректна",
                //DOM_INVALID_ACCESS_ERR			: "Параметр или операция не поддерживается.",
                //DOM_VALIDATION_ERR				: "Операция примененная к узлу не проходит проверку.",
                //DOM_TYPE_MISMATCH_ERR			: "Тип узла несовместим с ожидаемым типом параметра.",
                //DOM_SECURITY_ERR				: "Операция не допускается в связи с ограничением политики безопасности.",
                //DOM_NETWORK_ERR					: "Ошибка в сети.",
                //DOM_ABORT_ERR					: "Операция прервана пользователем.",
                //DOM_URL_MISMATCH_ERR			: "Указанный URL не соответствует.",
                //DOM_QUOTA_EXCEEDED_ERR			: "Операция будет превышать пределы хранения."
            }

        }
    };

})(), function(){
    var proto = this.prototype;
    this.prototype = Object.create(Error.prototype);
    Ext.apply(this.prototype, proto);
});

Ext.Error = SU.Error;

/**
 * @member Ext
 * @method raise
 * @alias SU.Error#raise
 * @inheritdoc SU.Error#raise
 */
Ext.raise = function () {
    SU.Error.raise.apply(SU.Error, arguments);
};

