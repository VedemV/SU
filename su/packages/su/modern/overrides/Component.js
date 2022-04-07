/**
 * Добавлено свойство конфигурации #formBind
 */
Ext.define('SU.Component', {
    override: 'Ext.Component',

    config: {
        /**
         * @cfg {Boolean} [formBind=false]
         * When inside FormPanel, any component configured with `formBind: true` will
         * be enabled/disabled depending on the validity state of the form.
         * See {@link Ext.field.Panel} for more information and example.
         */
        formBind: false
    }
});
