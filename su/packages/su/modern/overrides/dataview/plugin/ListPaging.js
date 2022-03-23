
/**
 * Правим ошибку "Cannot read property 'getBox' of undefined" в doEnsureBufferZone
 */
Ext.define('SU.dataview.plugin.ListPaging', {
    override: 'Ext.dataview.plugin.ListPaging',

    privates: {

        doEnsureBufferZone: function () {
            var me = this,
                list = me.cmp,
                store = list.getStore(),
                scroller = list.getScrollable(),
                count = store && store.getCount(),
                bufferZone = me.getBufferZone(),
                item, box, y, index;

            if (!store || !count || !scroller || me.getLoading()) {
                return;
            }

            index = Math.min(Math.max(0, count - bufferZone), count - 1);
            item = list.mapToItem(store.getAt(index));

            // BUG
            //box = item && item.element.getBox();

            // FIX
            box = item && item.el.getBox();

            if (!box) {
                return;
            }

            // if bufferZone is 0, loading the next page should happen when reaching the end
            // of the list (the bottom of the last item), else, if bufferZone is greater than
            // 0, loading the next page should happen when the first row of pixels of the
            // leading buffer zone item appears in the view.
            y = bufferZone > 0 ? box.top + 1 : box.bottom;
            if (y > scroller.getElement().getBox().bottom) {
                return;
            }

            me.loadNextPage();
        }
    }
});

