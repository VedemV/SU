/**
 *
 */
Ext.define('SU.data.validator.Phone', {
	override: 'Ext.data.validator.Phone',

	config: {
		matcher: /^ *(?:\+?(\d{1,3})[- .]?)?(?:(?:(\d{3})|\((\d{3})\))?[- .]?)(?:(\d{3})[- .]?)(\d{2}[- .]?\d{2})(?: *(?:e?xt?) *(\d*))? *$/
	}
});
