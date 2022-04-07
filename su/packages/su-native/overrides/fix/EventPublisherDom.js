/**
 *
 */
Ext.define('SU.native.overrides.fix.EventPublisherDom', {
    override: 'Ext.event.publisher.Dom',

    doDirectEvent: function (e, capture) {
        var me = this,
            currentTarget = e.currentTarget,
            timeStamp,
            el;

        e = new Ext.event.Event(e);

        timeStamp = e.time;

        if (me.isEventBlocked(e)) {
            return;
        }

        me.beforeEvent(e);

        Ext.frameStartTime = timeStamp;

        /* 
        FIX
        el = Ext.cache[currentTarget.id];
        */

        if (currentTarget) {
            el = Ext.cache[currentTarget.id];
        }

        // Element can be removed from the cache by this time, with the node
        // still lingering for some reason. This can happen for example when
        // load event is fired on an iframe that we constructed when submitting
        // a form for file uploads.
        if (el) {
            // Since natural DOM propagation has occurred, no emulated propagation is needed.
            // Simply dispatch the event on the currentTarget element
            me.reEnterCountAdjusted = false;
            me.reEnterCount++;
            me.fire(el, e.type, e, true, capture);

            // Gesture publisher deals with exceptions in recognizers
            if (!me.reEnterCountAdjusted) {
                me.reEnterCount--;
            }
        }

        me.afterEvent(e);
    }
});
