/**
 * @inheritdoc
 * @localdoc
 * Лечилки в режиме `multy` выбора
 *
 * - для утерянного события `selectionchange` при #deselect
 * [BUG EXTJS-16164](https://www.sencha.com/forum/showthread.php?295764)
 *
 * - введен запрет на изменеие выбора при простом перемещении
 * указателя текущей записи
 *
 */
Ext.define('SU.dataview.selection.Model', {
    override: 'Ext.dataview.selection.Model',

    selectWithEventMulti: function (record, e, isSelected) {
        var me = this,
            shift = e.shiftKey,
            ctrl = e.ctrlKey,
            key = e.getKey(),
            start = shift ? me.selectionStart : null;

        if (shift && start) {
            me.selectRange(start, record, ctrl);
        } else {
            //запрет на выбор при перемещении указателя
            if (~[33, 34, 35, 36, 37, 38, 39, 40].indexOf(key) && !shift && !ctrl) return;

            //было
            //me[isSelected ? 'deselect' : 'select'](record, true);

            //стало
            isSelected ? me.deselect(record) : me.select(record, true);
        }
    }
});
