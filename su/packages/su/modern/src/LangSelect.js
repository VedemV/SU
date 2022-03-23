/**
 * 
 * @history 28.08.2018
 * Убран callParent в #onChange
 * 
 * @history 17.12.2016
 * Правки по результатам selenium тестов
 */
Ext.define('SU.LangSelect', {
    extend: 'Ext.field.Select',
	alias: 'widget.languagefield',
	alternateClassName: ['Ext.field.LangSelect', 'Ext.form.LangSelect'],

    config: {
		// @protected
		valueField: 'id',
		// @protected
		displayField: 'label',
		// @protected
		usePicker: false,
		// @protected
		autoSelect: false
    },

	/**
	 * Инициализация списка.
	 *
	 * Список доступных локализаций устанавливается из {@link Ext.Language#getLocales},
	 * текущее значение из {@link Ext.Language#getPersistedLocale}.
	 *
	 * @private
	 */
	initialize: function(){
		var me = this;
		me.callParent();
		me.setStore( Ext.Language.getLocales() );
		me.setValue( Ext.Language.getPersistedLocale( true ) );
        Ext.Language.on({
            changelocale: me.doLocaleChange,
            failurelocale: me.doLocaleFailure,
            scope: me
        });
	},

    destroy: function(){
        var me = this;
        Ext.Language.un({
            changelocale: me.doLocaleChange,
            failurelocale: me.doLocaleFailure,
            scope: me
        });
        me.callParent();
    },

    doLocaleChange: function(){
        this.setValue( Ext.Language.getLocale() );
    },
    doLocaleFailure: function(){
        this.setValue( Ext.Language.getPersistedLocale( true ) );
    },

	/**
	 * Реакция на изменение выбранной локализации в зависимости от
	 * {@link Ext.Language#mode}.
	 *
	 * @param {Ext.Component} component
	 * @param {Mixed} newValue
	 * @param {Mixed} oldValue
	 * @private
	 */
	onChange: function(component, newValue, oldValue){
		var me = this;
		try{
			var locale = me.getValue();
            //me.callParent(arguments);
			if( locale !== Ext.Language.getLocale() ){
				if( Ext.Language.mode === 'static' ){
					var params = Ext.urlDecode(window.location.search.substring(1));
					params.lang = locale;
					window.location.search = Ext.urlEncode(params);
				} else {
					Ext.Language.setLocale( locale );
				}
			}
		} catch(e){
			// <debug>
			console.error(e);
			// </debug>
		}
	}
});

