Ext.define('WSEcho.controller.Main', {
    extend: 'Ext.app.Controller',

	views: ['Main'],

	refs: [{
		ref: 'main',
		selector: 'app-main'
	},{
		ref: 'btnConnect',
        selector: 'toolbar[dock=top] button[action=connect]'
	},{
		ref: 'btnDisconnect',
        selector: 'toolbar[dock=top] button[action=disconnect]'
	},{
		ref: 'btnSend',
        selector: 'button[action=send]'
	},{
		ref: 'fieldUrl',
        selector: 'toolbar[dock=top] textfield[action=url]'
	},{
		ref: 'fieldText',
        selector: 'textareafield[action=text]'
	},{
		ref: 'status',
        selector: 'toolbar[dock=bottom] tbtext'
	}],

	init: function(){
		var me = this;
		// <debug>
		console.log('WSEcho.controller.Main.init');
		// </debug>
		me.control({
			'toolbar[dock=top] button[action=connect]': {
				click: me.connect
			},
			'toolbar[dock=top] button[action=disconnect]': {
				click: me.disconnect
			},
			' button[action=send]': {
				click: me.send
			}
		});
	},

	onLaunch: function(){
		// <debug>
		console.log('WSEcho.controller.Main.onLaunch');
		// </debug>
		var me = this,
			ws = me.getWebSocket();
		ws.on({
			changestate: me.wsHandlerChangeState,
			beforeconnect: me.wsHandlerBeforeConnect,
			connect: me.wsHandlerConnect,
			afterconnect: me.wsHandlerAfterConnect,
			beforedisconnect: me.wsHandlerBeforeDisconnect,
			disconnect: me.wsHandlerDisconnect,
			send: me.wsHandlerSend,
			message: me.wsHandlerMessage,
			exception: me.wsHandlerException,
			scope: me
		});
	},

	getWebSocket: function(){
		var me = this;
		if( !me.ws ){
			me.ws = new SU.WebSocket({
				//url: 'ws://echo.websocket.org/'
			});
		}
		return me.ws;
	},

	setDisabledControl: function( options ){
		var me = this,
			i, getter, item;
		for( i in options ){
			getter = me[Ext.app.Controller.getGetterName(i, '')];
			item = !!getter && getter.call(me);
			!!item && item.setDisabled(options[i]);
		}
	},

	addLog: function( text, state ){
		var me = this,
			view = me.getMain();
		view.add( Ext.create( 'Ext.Component', {
			html: text,
			style: {
				color: state==='error'?'red':(state==='warn'?'blue':'#000000'),
				margin: '5px 0'
			}
		}));
	},

	connect: function(){
		var me = this,
			ws = me.getWebSocket(),
			url = me.getFieldUrl();
		if( !ws ) return;
		me.setDisabledControl({
			'field.url': true,
			'field.text': true,
			'btn.connect': true,
			'btn.disconnect': true,
			'btn.send': true
		});
		me.addLog('Start connecting');
		ws.connect({
			url: url.getValue()
		});
	},

	disconnect: function(){
		var me = this,
			ws = me.getWebSocket();
		ws.disconnect();
	},

	send: function(){
		var me = this,
			text = me.getFieldText(),
			msg = !!text && text.getValue(),
			ws = me.getWebSocket();
		if( !!msg ){
			me.addLog('Send: "'+msg+'"');
			ws.send(msg);
			text.setValue('');
		}
	},


	wsHandlerChangeState: function( ws, state ){
		var me = this,
			main = me.getMain(),
			status = me.getStatus(),
			states = [
				'&#160;',
				'CONNECTING',
				'OPEN',
				'CLOSING',
				'CLOSED'
			];
		me.addLog('[WebSocket event] "changestate": '+state);
		!!status && status.setText(states[state]);
		main.updateTitle();
	},

	wsHandlerBeforeConnect: function( ws, options ){
		var me = this,
			i, s = ['[WebSocket event] "beforeconnect":<ul>'];
		for( i in options ){
			s.push('<li>'+i+': '+options[i]+'</li>');
		}
		s.push('</ul>');
		me.addLog(s.join(''), 'warn');
	},

	wsHandlerAfterConnect: function(){
		var me = this;
		me.addLog('[WebSocket event] "afterconnect"', 'warn');
	},

	wsHandlerConnect: function(){
		var me = this,
			text = me.getFieldText();
		me.addLog('[WebSocket event] "connect"', 'warn');
		me.setDisabledControl({
			'field.url': true,
			'field.text': false,
			'btn.connect': true,
			'btn.disconnect': false,
			'btn.send': false
		});
	},

	wsHandlerBeforeDisconnect: function(){
		var me = this;
		me.addLog('[WebSocket event] "beforedisconnect"', 'warn');
		return confirm(Ext.Language.getProperty('messages.closeConfirm') || 'Закрыть соединение?');
	},

	wsHandlerDisconnect: function( ws, e, connecting){
		var me = this;
		me.addLog('[WebSocket event] "disconnect" '+( !!e ? e.code : 0 ), 'warn');
		me.setDisabledControl({
			'field.url': false,
			'field.text': true,
			'btn.connect': false,
			'btn.disconnect': true,
			'btn.send': true
		});
	},

	wsHandlerSend: function( ws, data ){
		var me = this;
		me.addLog('[WebSocket event] "send"<br>"'+data+'"', 'warn');
	},

	wsHandlerMessage: function( ws, data ){
		var me = this;
		me.addLog('[WebSocket event] "message"<br>"'+data+'"', 'warn');
	},

	wsHandlerException: function( ws, e ){
		var me = this,
			s = ['[WebSocket event] "exception":<ul>'];
		s.push('<li>message: '+e.message||e.msg+'</li>');
		s.push('<li>description: '+e.description+'</li>');
		s.push('</ul>');
		me.addLog(s.join(''), 'warn');
		Ext.errorMessage(e);
		//console.warn('EXCEPTION', e);
	}
});
