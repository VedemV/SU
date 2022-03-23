/*
 * Project    : SU Lib Core
 * File	      : WebSocket.js
 * Created on : 29.04.2015 13:36:15
 */

//<debug>
/**
 *
 * @property {Boolean} DEBUG_CONNECTION=false
 * Включение отладочного вывода для WebSocket и Kernel.
 *
 * _Доступно только в отладочных режимах._
 */
if (!Ext.isDefined(window.DEBUG_CONNECTION)) window.DEBUG_CONNECTION = false;
//</debug>

/**
 * Общий класс для Sencha ExtJS 4.2+ / Sencha Touch 2.3+
 *
 * Обертка для `WebSocket` в формате `Sencha ExtJS` и `Sencha Touch`.
 *
 * Позволяет использовать протокол `WebSocket` для
 * двусторонней связи с удаленным хостом.
 *
 * Подробнее: [The WebSocket API](http://dev.w3.org/html5/websockets/#the-websocket-interface).
 *
 * Используется ассинхронный режим работы: при выполнении скрипта
 *
 *     var ws = {@link Ext#create}('Ext.WebSocket', {
 *         {@link #url}: 'ws://echo.websocket.org/'
 *     }
 *     ws.{@link #method-connect}();
 *     ws.{@link #method-send}( 'WebSocket echo message' );
 *
 * __будет сгенерировано исключение__ о невожможности отправки данных
 * на неактивное соединение при выполнении команды `ws.send( ... )`.
 *
 * Для обеспечения правильной работы в ассинхноом режиме 
 * перед отправкой данных
 * необходимо проверять состояние соединения вызовом #isConnected,
 * либо использовать обработчики событий #afterconnect или {@link #event-connect}.
 *
 * Echo example
 * ------------
 *     @example
 *     function addLog(text){
 *     	Ext.DomHelper.append( Ext.getBody(), {tag: 'div', style: 'margin:0 10px;', html: text});
 *     };

 *     var ws = Ext.create('Ext.WebSocket', {
 *     	url: 'ws://echo.websocket.org/',
 *     	listeners:{
 *     		changestate: function( conn, state ){
 *     			var states = ['INITIALIZE', 'CONNECTING', 'OPEN', 'CLOSING', 'CLOSED'];
 *     			addLog( 'Connection state: '+states[state & 0x0F] );
 *     		},
 *     		message: function(conn, data){
 *     			addLog( 'Response message: '+data);
 *     			ws.disconnect();
 *     		},
 *     		send: function(conn, data){
 *     			addLog( 'Send message: '+data);
 *     		},
 *     		connect: function(conn){
 *     			ws.send( 'WebSocket echo message' );
 *     		},
 *     		disconnect: function(conn, e){
 *     			addLog( 'Close state '+( !!e ? e.code : 0 ) );
 *     		}
 *     	}
 *     });
 *
 *     ws.connect();
 *
 * @aside example ws_echo
 *
 * @history 11.04.2017 Из события #message удален параметр json
 * @history 29.04.2015 Создание модуля
 *
 */
Ext.define('SU.WebSocket', {
    alternateClassName: ['Ext.WebSocket'],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    requires: [
        'SU.Error',
        'SU.WebSocketError'
    ],

    statics: {
        /**
         * @property {Number} [=0x00]
         * Состояние инициализации
         */
        INITIALIZE: 0,

        /**
         * @property {Number} [=0x01]
         * Состояние установки соединения
         */
        CONNECTING: 1 << 0,

        /**
         * @property {Number} [=0x02]
         * Активное состояние соединения
         */
        OPEN: 1 << 1,

        /**
         * @property {Number} [=0x04]
         * Состояние завершения соединения
         */
        CLOSING: 1 << 2,

        /**
         * @property {Number} [=0x08]
         * Установленное соединение закрыто
         */
        CLOSED: 1 << 3,

        /**
         * @property {Number} [=0x10]
         * Выполняется отправка данных
         */
        SENDING: 1 << 4,

        /**
         * @property {Number} [=0x20]
         * Выполняется прием данных
         */
        READING: 1 << 5
    },

    messageState: {
        state: 0,
        sending: 0,
        reading: 0,
        setSending: function () {
            this.sending++;
            this.state |= Ext.WebSocket.SENDING;
        },
        unsetSending: function () {
            this.sending--;
            !this.sending && (this.state ^= Ext.WebSocket.SENDING);
        },
        setReading: function () {
            this.reading++;
            this.state |= Ext.WebSocket.READING;
        },
        unsetReading: function () {
            this.reading--;
            !this.reading && (this.state ^= Ext.WebSocket.READING);
        },
        cleanup: function () {
            this.state = 0;
        }
    },

    config: {
        /**
         * @cfg {String} url
         * URL сервера к которому осуществляется подключение в формате
         * ( [__ws__://] | __wss__:// ) hostname [:port].
         *
         * URL должен соответствовать HTTP протоколам __`ws`__ или __`wss`__,
         * по умолчанию будет использован HTTP протокол __`ws`__.
         *
         * @accessor
         */
        url: null,

        /**
         * @cfg {String|Array} protocol
         * Строка с именем протокола обмена или массив строк с несколькими
         * именами протоколов обмена. Соединение будет устанавливаться только
         * если сервер сообщит, что он выбрал один из протоколов.
         *
         * Допустимо использование пустого массива, тогда протокол обмена
         * определяется на стороне сервера.
         *
         * @accessor
         */
        protocol: null,

        /**
         * @cfg {Number} timeout
         * Время ожидания выполнения контролируемых команд в миллисекундах.
         *
         * Параметр для использования в наследуемых классах с поддержкой
         * контролируемых команд (с использованием транзакций).
         *
         * @accessor
         */
        timeout: 30000
    },

    /**
     * @property {WebSocket} instance
     * Экземпляр объекта __`WebSocket`__.
     *
     * Подробнее: [The WebSocket API](http://dev.w3.org/html5/websockets/).
     * @private
     */

    /**
     * @param {Object} config Параметры конфигурации.
     */
    constructor: function (config) {
        // Правка для старых версий FF
        if (window.MozWebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        config = config || {};
        this.initConfig(config);
        this.callParent(arguments);
        this.mixins.observable.constructor.call(this);

        /**
         * @event changestate
         * Возникает при изменении состояния соединения.
         * @param {Ext.WebSocket} ws
         * @param {Number} state Текущее состояние соединения,
         * возвращаемое {@link #getReadyState}.
         */

        /**
         * @event exception
         *
         * @param {Ext.WebSocket} ws
         * @param {Ext.Error|String} exception {Ext.Error} или Текст сообщения
         * @param {Object} options (optional) Дополнительные параметры
         */

        /**
         * @event beforeconnect
         * Возникает перед установкой соединения с сервером для уточнения
         * параметров соединения.
         * @param {Ext.WebSocket} ws
         * @param {Object} options Параметры конфигурации переданной в метод {@link #method-connect}.
         * @preventable
         */

        /**
         * @event afterconnect
         * Возникает после установкой соединения с сервером.
         * @param {Ext.WebSocket} ws
         */

        /**
         * @event connect
         * Возникает после установки соединения с сервером.
         *
         * Позволяет в обработчике выполнить дополнительные действия сразу
         * после установки соединения.
         *
         * _В случае ассинхронных действий, таких как
         * выполнение инициализирующих запросов, обработчик должен вернуть `false`,
         * а после завершения ассинхронных действий вызвать метод #doConnect._
         * @param {Ext.WebSocket} ws
         * @preventable
         */

        /**
         * @event beforedisconnect
         * Возникает перед закрытием соединения с сервером.
         * @param {Ext.WebSocket} ws
         * @preventable
         */

        /**
         * @event disconnect
         * Возникает после завершения соединения с сервером.
         * @param {Ext.WebSocket} ws
         * @param {Ext.event.Event} event (optional) Событие завершения соединения.
         * Передается только при завершении соединения со стороны сервера
         * или разрыве соединения.
         * @param {Boolean} connecting (optional) Указывает, что разрыв произошел
         * при установке соединения.
         */

        /**
         * @event send
         * Возникает перед отправкой данных серверу.
         * @param {Ext.WebSocket} ws
         * @param {String} data
         */

        /**
         * @event message
         * Возникает при получении данных от сервера.
         * @param {Ext.WebSocket} ws
         * @param {String} data
         */
    },

    /**
     * Возвращает текущее состояние соединения.
     * При отсутствии {@link #instance} возвращает {@link #INITIALIZE}, иначе
     * возвращает состояния readyState WebSocket`а, увеличенные на 1.
     *
     * Подробнее: [WebSocket readyState](http://dev.w3.org/html5/websockets/#dom-websocket-readystate).
     *
     * Состояния соединения должны отслеживаться с маской 0x0F, при
     * использовании в наследуемых классах с поддержкой контролируемых
     * команд (с использованием транзакций) возможны дополнительные состояния
     * под маской 0xFFF0.
     * 
     * @return {Number} Текущее состояние соединения
     * 
     * @protected
     *
     */
    getReadyState: function () {
        var me = this;
        if (!me.instance) return me.statics().INITIALIZE;
        return 1 << me.instance.readyState | me.messageState.state;
    },

    /**
     * Сброс установленного соединения.
     * @protected
     */
    cleanup: function () {
        var me = this;
        /**
         * Указывает, что выполняется установка соединения. Нужно лишь для анализа
         * причины разрыва соединения в событии {@link #event-disconnect}
         * и обработчике {@link #handleInstanceError}.
         *
         * @property
         * @private
         */
        me.connecting = false;

        //Ext.destroy(this.instance);
        me.instance = undefined;
        me.messageState.cleanup();
        me.changeState();
    },

    /**
     * Указывает установлено ли соединение с удаленным хостом.
     * @return {Boolean} .
     */
    isConnected: function () {
        return (this.getReadyState() & this.statics().OPEN) !== 0;
    },

    /**
     * Устанавливает соединение с сервером.
     *
     * _Используется ассинхронный режим_.
     * Результат указывает лишь на результат начала соединения.
     * Проверка завершения установки соединения производится
     * в методе #handleInstanceOpen или по событиям #afterconnect и
     * {@link #event-connect}, при успешном соединении.
     *
     * @param {Object} options (optional)
     * Определяет параметры соединения с удаленным хостом:
     *
     * @param {String} options.url (optional) URL сервера к которому
     * осуществляется подключение, подробнее см. параметр конфигурации #url.
     *
     * __Значение параметра конфигурации `#url` заменяется на новое.__
     * _При отсутствии параметра будет использовано текущее значение
     * параметра конфигурации `#url`._
     *
     * @param {String | Array} options.protocol (optional)
     * Строка или массив строк с именами протоколов обмена.
     *
     * __Значение параметра конфигурации `#protocol` заменяется на новое.__
     * _При отсутствии параметра будет использовано текущее значение
     * параметра конфигурации `#protocol`._
     *
     * @return {Boolean} .
     *
     * @fires beforeconnect
     * @fires connect
     * @fires afterconnect
     * @fires exception
     * @fires disconnect
     */
    connect: function (options) {
        var me = this,
            url,
            protocol;

        try {
            if (me.getReadyState() !== me.statics().INITIALIZE)
                Ext.Error.raise({
                    etype: 'Ext.WebSocketError',
                    msg: 'ALREADY_ESTABLISHED'
                });

            options = options || {};
            url = me.applyUrl(options.url || me.getUrl());
            protocol = options.protocol || me.getProtocol() || [];

            if (me.fireEvent('beforeconnect', me, options) !== false) {

                me.setUrl(url);
                me.setProtocol(protocol);
                me.connecting = true;
                me.instance = new WebSocket(me.getUrl(), me.getProtocol());

                if (me.instance) {
                    me.bindEvents(true);
                    me.changeState();
                }
            }
        } catch (e) {
            this.doException(this, e, options);
            me.handleInstanceClose({ code: 1001 });
        }
        return !!me.instance;
    },

    /**
     * Отправляет событие об изменении состояния соединения.
     * @private
     */
    changeState: function () {
        this.fireEvent('changestate', this, this.getReadyState(true));
    },

    /**
     * Разрывает соединение с сервером по инициативе клиента.
     */
    disconnect: function () {
        var me = this,
            state = me.getReadyState();

        if (!!me.instance && (state !== me.statics().INITIALIZE && (state & me.statics().CLOSED) === 0)) {

            if (me.fireEvent('beforedisconnect', me) !== false) {
                me.bindEvents();
                me.instance.close(1000);
                me.handleInstanceClose({ code: 1000 });
            }

        } else {
            me.cleanup();
        }
    },

    /**
     * Отправляет данные удаленному хосту.
     *
     * Подробнее см. [метод send WebSocket](http://dev.w3.org/html5/websockets/#dom-websocket-send).
     *
     * TODO: Проанализировать обработку исключений
     * @param {String} data 
     * Отправляемые данные
     * 
     * @return {Boolean} .
     */
    send: function (data) {
        try {
            if (!!this.instance && (this.getReadyState() & this.statics().OPEN) !== 0) {
                //this.changeState();
                this.fireEvent('send', this, data);
                //<debug>
                if (window.DEBUG_CONNECTION) console.log('[WebSocket] send: ' + data);
                //</debug>
                this.instance.send(data);
                //this.changeState();
                return true;
            }
            Ext.Error.raise({
                etype: 'Ext.WebSocketError',
                msg: 'NOT_CONNECTED'
            });
        } catch (e) {
            this.doException(this, e, null);
            //this.changeState();
            return false;
        }
    },

    /**
     * Отправка команды в формате протокола обмена.
     * Абстрактный метод, который может быть переопределен для использования
     * в наследуемых классах с поддержкой определенного {@link #protocol протокола обмена}.
     * 
     * @param {Object} options 
     * Отправляемая команда
     * 
     * @return {Boolean} .
     * @abstract
     */
    sendCommand: function (options) { },

    /**
     * Отправка команд с контролем ответа.
     *
     * Абстрактный метод, который может быть переопределен для использования
     * в наследуемых классах с поддержкой контролируемых команд
     * (с использованием транзакций).
     * 
     * @param {Object} options 
     * Отправляемая команда
     * 
     * @return {Object|Boolean}
     * Объект, содержащий параметры транзакции
     * при успешной отправке команды или false при ошибке отправки команды.
     * 
     * @abstract
     */
    sendControlledComand: function (options) { },

    /**
     * Отправка контролируемого запроса.
     *
     * Абстрактный метод, который может быть переопределен для использования
     * в наследуемых классах с поддержкой контролируемых команд
     * (с использованием транзакций).
     * 
     * @param {Object} options
     * Параметры запроса
     * 
     * @return {Object|Boolean} 
     * Объект, содержащий параметры транзакции
     * при успешной отправке команды или false при ошибке отправки команды.
     * 
     * @abstract
     */
    request: function (options) { },

    /**
     * Прерывание выполнения контролируемого запроса.
     *
     * Абстрактный метод, который может быть переопределен для использования
     * в наследуемых классах с поддержкой контролируемых команд
     * (с использованием транзакций).
     * 
     * @param {Object} request 
     * Запрос из списка контролируемых запросов (транзакций).
     * 
     * @abstract
     */
    abort: function (request) { },

    /**
     * Назначение / снятие обработчиков обратного вызова для {@link #instance}.
     * 
     * @param {Boolean} set
     * - true - назначение собственных обработчиков
     * [onopen](http://dev.w3.org/html5/websockets/#handler-websocket-onopen),
     * [onclose](http://dev.w3.org/html5/websockets/#handler-websocket-onclose),
     * [onmessage](http://dev.w3.org/html5/websockets/#handler-websocket-onmessage),
     * [onerror](http://dev.w3.org/html5/websockets/#handler-websocket-onerror);
     * - false - освобождение обработчиков.
     * 
     * @private
     */
    bindEvents: function (set) {
        if (this.instance) {
            this.instance.onopen = !!set ? Ext.bind(this.handleInstanceOpen, this) : undefined;
            this.instance.onclose = !!set ? Ext.bind(this.handleInstanceClose, this) : undefined;
            this.instance.onmessage = !!set ? Ext.bind(this.handleInstanceMessage, this) : undefined;
            this.instance.onerror = !!set ? Ext.bind(this.handleInstanceError, this) : undefined;
        }
    },

    /**
     * Предварительная обработка события установки соединения
     * [onopen WebSocket](http://dev.w3.org/html5/websockets/#handler-websocket-onopen).
     *
     * @param {Ext.event.Event} e 
     * Событие WebSocket
     *
     * @fires connect
     * @fires changestate
     *
     * @protected
     */
    handleInstanceOpen: function (e) {
        var me = this;
        me.changeState();
        me.fireAction('connect', [me], 'doConnect', me);
    },

    /**
     * Предварительная обработка события
     * [onclose WebSocket](http://dev.w3.org/html5/websockets/#handler-websocket-onclose).
     * 
     * @param {Ext.event.Event} e 
     * [Событие close WebSocket](http://dev.w3.org/html5/websockets/#closeevent)
     * 
     * @fires disconnect
     * 
     * @protected
     */
    handleInstanceClose: function (e) {
        var me = this;
        me.changeState();
        me.bindEvents(false);
        this.fireAction('disconnect', [this, e, this.connecting], 'doDisconnect', this);
    },

    /**
     * Обработка события onerror WebSocket.
     * 
     * @param {Ext.event.Event} event 
     * Событие WebSocket
     * 
     * @protected
     */
    handleInstanceError: function (event) {
        var me = this,
            msg = [me.connecting ? 'CAN_NOT_CONNECT' : 'DISCONNECT', me.getUrl()];

        //<debug>
        if (window.DEBUG_CONNECTION) {
            // eslint-disable-next-line no-console
            console.log('[WebSocket] handleInstanceError', event, event.target.readyState, !!me.connecting);
        }
        //</debug>

        //me.bindEvents(false);
        me.handleInstanceClose({ code: 1001 });
        me.changeState();

        try {
            Ext.Error.raise({
                etype: 'Ext.WebSocketError',
                msg: msg
            });
        } catch (e) {
            this.doException(this, e, null);
        }
    },

    /**
     * Обработка события onmessage WebSocket.
     * @param {Ext.event.Event} e Событие WebSocket
     * @protected
     */
    handleInstanceMessage: function (e) {
        var me = this;
        me.fireEvent('message', me, e.data);
    },

    /**
     * Проверка значения строки адреса сервера в формате
     * ( [__ws__://] | __wss__:// ) hostname [:port].
     * 
     * @param {String} value 
     * URL сервера
     * 
     * @return {String}
     * Валидный URL сервера
     * 
     * @private
     */
    applyUrl: function (value) {

        if (value) {

            var parts = new RegExp('^(([^:/\\?#]+)://)?((([^:/\\?#]*)(?::([^/\\?#]*))?))?([^\\?#]*)(\\?([^#]*))?(#(.*))?$')
                    .exec(value),
                purl = {
                    href: parts[0] || '',
                    protocol: (parts[2] || '').toLowerCase(),
                    host: parts[4] || '',
                    hostname: parts[5] || '',
                    port: parts[6] || '',
                    pathname: parts[7] || '/',
                    search: parts[8] || '',
                    hash: parts[10] || ''
                };

            // Проверка соответствия протокола (должен быть 'ws' или 'wss')
            if (purl.protocol === '') purl.protocol = 'ws';
            if (!(purl.protocol !== 'ws' || purl.protocol !== 'wss')) {
                Ext.Error.raise({
                    etype: 'Ext.WebSocketError',
                    msg: ['INVALID_SCHEME', value]
                });
            }

            // Проверка наличия хоста и проверка номера порта
            if (!purl.hostname || isNaN(purl.port - 0)) {
                Ext.Error.raise({
                    etype: 'Ext.WebSocketError',
                    msg: ['INVALID_ADDRESS', value]
                });
            }

            return [
                purl.protocol,
                '://',
                purl.hostname,
                ((purl.port === '') ? '' : (':' + purl.port)),
                purl.pathname,
                purl.search,
                purl.hash
            ].join('');
        }

        return value;
    },

    /**
     * Окончательная обработка установки соединения.
     *
     * @param {Ext.WebSocket} ws .
     * 
     * @protected
     */
    doConnect: function (ws) {
        var me = this;
        me.connecting = false;
        me.fireEvent('afterconnect', me);
    },

    /**
     * Окончательная обработка разрыва соединения.
     * @param {Ext.WebSocket} ws .
     * 
     * @param {Ext.event.Event} event 
     * [Событие close WebSocket](http://dev.w3.org/html5/websockets/#closeevent)
     * 
     * @protected
     */
    doDisconnect: function (ws, event) {
        var me = this;
        this.abort();
        me.cleanup();
    },

    doException: function (sender, exception, options) {
        var me = this;
        me.fireEvent('exception', sender || me, new Ext.Error(exception), options);
    }
});