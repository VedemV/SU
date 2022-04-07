/**
 * Добавлена обработка toggleGroup
 */
Ext.define('SU.Button', {
    override: 'Ext.Button',

    config: {
        toggleGroup: null
    },

    updateToggleGroup: function (value, old) {
        var me = this;

        if (old) {
            me.un({
                pressedchange: me.onPressedChange,
                scope: me
            });
        }

        if (value) {
            me.on({
                pressedchange: me.onPressedChange,
                scope: me
            });
        }
    },

    onPressedChange: function (button, pressed) {
        var me = this,
            group = me.getToggleGroup(),
            //toggele = me.getEnableToggle(),
            //depressed = me.getAllowDepress(),
            CQ = Ext.ComponentQuery;

        if (!pressed) return;

        if (group) {
            CQ.query('button[toggleGroup=' + group + '][pressed]').forEach(function (btn) {
                if (btn === button) return;
                btn.suspendEvents();
                btn.setPressed && btn.setPressed(false);
                btn.resumeEvents(true);
            });
        }
    }
});
