/**
 *
 */
Ext.define('SU.grid.TextAreaCellEditor', {
    extend: 'Ext.grid.CellEditor',
    alias: 'widget.textareacelleditor',

    field: {
        xtype: 'textareafield'
    },

    onSpecialKey: function (field, event) {
        var me = this;

        if (event.getKey() === event.TAB && !event.shiftKey) {
            event.stopEvent();
            var el = field.inputElement.dom;
            if (el.setSelectionRange) {
                var withIns = el.value.substring(0, el.selectionStart) + '    ';
                var pos = withIns.length;
                el.value = withIns + el.value.substring(el.selectionEnd, el.value.length);
                el.setSelectionRange(pos, pos);
            } else if (document.selection) {
                document.selection.createRange().text = '    ';
            }
            return false;
        }

        if (event.getKey() === event.ENTER && event.shiftKey) {
            event.stopPropagation();
            return false;
        }

        me.callParent(arguments);
    }
});
