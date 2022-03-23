/**
 *
 */
Ext.define('SU.LangSelect', {
    extend: 'Ext.form.ComboBox',
	alias: 'widget.languagefield',
	alternateClassName: ['Ext.field.LangSelect', 'Ext.form.LangSelect'],

	//autoSelect: false,
	//triggerAction: 'all',

	/**
	 * @cfg
	 * @inheritdoc
	 */
	valueField: 'id',

	/**
	 * @cfg
	 * @inheritdoc
	 */
	displayField: 'label',

	/**
	 * @cfg
	 * @inheritdoc
	 */
	usePicker: false,

	/**
	 * @cfg
	 * @inheritdoc
	 */
	submitValue: false,

	/**
	 * @cfg
	 * @inheritdoc
	 */
	forceSelection: true,

	/**
	 * @cfg
	 * @inheritdoc
	 */
	queryMode: 'local',

	/**
	 * @cfg
	 * @inheritdoc
	 */
	editable: false,

	initComponent: function(){
		var me = this;
		me.callParent();
		me.setStore( Ext.Language.getLocales() );
		me.setValue( Ext.Language.getPersistedLocale( true ) );
//		Ext.Language.on({
//			initialized: {
//				fn: function(){
//					me.setValue( Ext.Language.getPersistedLocale( true ) );
//				},
//				single: true
//			}
//		});
	},

	onChange: function( newValue, oldValue ){
		var me = this;
		try{
			var locale = me.getValue();
			if( locale !== Ext.Language.getLocale() ){
				if( Ext.Language.mode === 'static' ){
					var params = Ext.urlDecode(window.location.search.substring(1));
					params.lang = locale;
					window.location.search = Ext.urlEncode(params);
				} else if( !!Ext.Language.initialized ){
					var cbChange = function(){
							me.self.superclass.onChange.call(me, newValue, oldValue);
							Ext.Language.un({
								changeLocale: cbChange,
								failureLocale: cbFailure
							});
						},
						cbFailure = function(){
							me.setValue( Ext.Language.getPersistedLocale( true ) );
							Ext.Language.un({
								changeLocale: cbChange,
								failureLocale: cbFailure
							});
						};
					Ext.Language.on({
						changeLocale: cbChange,
						failureLocale: cbFailure
					});
					Ext.Language.setLocale( locale );
				}
			}
		} catch(e){
			// <debug>
			alert('onChange '+e);
			// </debug>
		}
	}
});

