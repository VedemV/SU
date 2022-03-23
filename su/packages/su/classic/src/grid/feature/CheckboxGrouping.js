/**
 * 
 */
Ext.define('SU.grid.feature.CheckboxGrouping', {
    extend: 'Ext.grid.feature.Grouping',
    alias: 'feature.checkboxgrouping',

    /** @property */
    checkDataIndex: 'isChecked',
    /** @property */
    startCollapsed: true,
    /** @property */
    injectCheckbox: 0,
    /** @property */
    checkOnly: false,

    headerWidth: 24,

    /**
     * @private
     */
    checkerOnCls: Ext.baseCSSPrefix + 'grid-hd-checker-on',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-special ' + Ext.baseCSSPrefix + 'selmodel-column',
    targetCls: 'group-checkbox',


    init: function (grid) {
        var store = grid.getStore(),
            view = grid.getView();

        view.on({
            beforerender: 'beforeViewRender',
            selectionchange: 'changeViewSelection',
            select: 'onViewSelect',
            deselect: 'onViewDeselect',
            scope: this
        });

        //this.groupHeaderTpl = '<input class="' + this.targetCls + '" {[values.record && (values.record.selected ? "checked" : "")]} type="checkbox"> {name}';
        this.groupHeaderTpl = '<input class="' + this.targetCls + '" {[values.isChecked ? "checked" : ""]} type="checkbox"> {name}';

        this.callParent(arguments);
    },

    beforeViewRender: function (view) {
        var me = this,
            selModel = view.grid.selModel,
            ownerLockable = view.grid.ownerLockable,
            isLocked = selModel.locked;

        if (me.injectCheckbox !== false) {
            if (ownerLockable && !me.lockListeners) {
                me.lockListeners = ownerLockable.mon(ownerLockable, {
                    lockcolumn: me.onColumnLock,
                    unlockcolumn: me.onColumnUnlock,
                    scope: me,
                    destroyable: true
                });
            }

            if (!ownerLockable || (view.isLockedView && (me.hasLockedHeader() || isLocked)) || (view.isNormalView && !me.column)) {
                me.addCheckbox(view);
                me.mon(view.ownerGrid, {
                    beforereconfigure: me.onBeforeReconfigure,
                    reconfigure: me.onReconfigure,
                    scope: me
                });
            }
        }

        me.dataSource.on('groupchange', me.onGroupChange, me);
    },

    // —крываем checkbox при отсутствии группировки
    onGroupChange: function (store, group) {
        var me = this,
            sm = me.grid.selModel;

        if (me.column) {
            me.column.setHidden(!group);
        }

        sm.suspendEvents();
        sm.deselectAll();
        sm.resumeEvents();

        me.callParent(arguments);
    },

    hasLockedHeader: function () {
        var columns = this.grid.getVisibleColumnManager().getColumns(),
            len = columns.length, i;

        for (i = 0; i < len; i++) {
            if (columns[i].locked) {
                return true;
            }
        }
        return false;
    },

    onColumnUnlock: function (lockable, column) {
        var me = this,
            checkbox = me.injectCheckbox,
            lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();

        if (lockedColumns.length === 1 && lockedColumns[0] === me.column) {
            if (checkbox === 'first') {
                checkbox = 0;
            } else if (checkbox === 'last') {
                checkbox = lockable.normalGrid.visibleColumnManager.getColumns().length;
            }
            lockable.unlock(me.column, checkbox);
        }
    },

    onColumnLock: function (lockable, column) {
        var me = this,
            checkbox = me.injectCheckbox,
            lockedColumns = lockable.lockedGrid.visibleColumnManager.getColumns();

        if (lockedColumns.length === 1) {
            if (checkbox === 'first') {
                checkbox = 0;
            } else if (checkbox === 'last') {
                checkbox = lockable.lockedGrid.visibleColumnManager.getColumns().length;
            }
            lockable.lock(me.column, checkbox);
        }
    },

    /**
     * @param {Ext.panel.Table} grid
     * @param {Ext.data.Store} store
     * @param {Object[]} columns
     * @private
     */
    onBeforeReconfigure: function (grid, store, columns /*, oldStore, oldColumns*/) {
        var column = this.column,
            headerCt = column.ownerCt;

        if (columns && headerCt) {
            headerCt.remove(column, false);
        }
    },

    /**
     * @param {Ext.panel.Table} grid
     * @param {Ext.data.Store} store
     * @param {Object[]} columns
     * @private
     */
    onReconfigure: function (grid, store, columns, oldStore, oldColumns) {
        var me = this,
            view = grid.getView();

        if (columns) {
            if (grid.lockable) {
                if (grid.lockedGrid.isVisible()) {
                    grid.lock(me.column, 0);
                } else {
                    grid.unlock(me.column, 0);
                }
            } else {
                me.addCheckbox(view);
            }
            view.refreshView();
        }

        if (oldStore) {
            store.un('update', me.onStoreUpdate, me);
        }
        if (store) {
            store.on('update', me.onStoreUpdate, me);
        }

    },

    addCheckbox: function (view) {
        var me = this,
            checkboxIndex = me.injectCheckbox,
            headerCt = view.headerCt;

        if (checkboxIndex !== false) {
            if (checkboxIndex === 'first') {
                checkboxIndex = 0;
            } else if (checkboxIndex === 'last') {
                checkboxIndex = headerCt.getColumnCount();
            }
            Ext.suspendLayouts();
            me.column = headerCt.add(checkboxIndex, me.column || me.getHeaderConfig());
            Ext.resumeLayouts();
        }
    },

    getHeaderConfig: function () {
        var me = this,
            //htmlEncode = Ext.String.htmlEncode,
            config;

        config = {
            xtype: 'checkcolumn',
            dataIndex: me.checkDataIndex,
            headerCheckbox: false,
            isCheckerHd: false,
            ignoreExport: true,
            text: me.headerText,
            width: me.headerWidth,
            sortable: false,
            draggable: false,
            resizable: false,
            hideable: false,
            hidden: true,
            menuDisabled: true,
            checkOnly: me.checkOnly,
            checkboxAriaRole: 'presentation',
            tdCls: Ext.baseCSSPrefix + 'selmodel-checkbox ' + me.tdCls,
            cls: Ext.baseCSSPrefix + 'selmodel-column',
            locked: me.hasLockedHeader(),
            //editRenderer: function () { return '&#160;'; },
            setRecordCheck: function (record, recordIndex, checked, cell) {
                record.beginEdit();
                record.set(this.dataIndex, checked, { dirty: false });
                record.endEdit();
            },
            //isRecordChecked: Ext.bind(me.isRowSelected, me)
        };

        if (!me.checkOnly) {
            config.tabIndex = undefined;
            config.ariaRole = 'presentation';
            config.focusable = false;
        }
        else {
            //config.useAriaElements = true;
            //config.ariaLabel = htmlEncode(me.headerAriaLabel);
            //config.headerSelectText = htmlEncode(me.headerSelectText);
            //config.headerDeselectText = htmlEncode(me.headerDeselectText);
            //config.rowSelectText = htmlEncode(me.rowSelectText);
            //config.rowDeselectText = htmlEncode(me.rowDeselectText);
        }

        return config;
    },

    setupRowData: function (record, idx, rowValues) {
        var me = this,
            field = me.getGroupField();

        me.callParent(arguments);
        if (field) {
            //groupInfo.record = me.getParentRecord(record.get(field));
            rowValues.isChecked = me.groupRenderInfo.isChecked = this.getMetaGroup(record.get(field)).isChecked;
        }
    },

    /**
     * This method will only run once... on the initial load of the view... this
     * is so we can check the store for the grouped item's children... if they're
     * all checked, then we need to set the private variable to checked
     */
    checkAllGroups: function (groupName) {
        var store = this.view.getStore();
        var groupField = this.getGroupField();

        if (store) {
            var groups = store.getGroups();
            if (groups) {
                groups.each(function (groupRec) {
                    var allChecked = true;
                    var groupKey = groupRec.getGroupKey();
                    var checkGroup = true;
                    if (groupName) {
                        if (groupKey !== groupName) {
                            checkGroup = false;
                        }
                    }
                    if (checkGroup) {
                        groupRec.each(function (rec) {
                            allChecked = rec.get(this.checkDataIndex);
                            groupName = rec.get(groupField);
                            if (allChecked === false) {
                                return false;
                            }
                        }, this);
                        //store.suspendEvents();
                        this.updateParentRecord(groupName, allChecked);
                        //store.resumeEvents();
                    }
                }, this);
            }
        }
    },

    updateParentRecord: function (groupName, checked) {
        var me = this,
            parentRecord = this.getParentRecord(groupName);
        var metaGroup = this.getMetaGroup(groupName);

        if (metaGroup.isChecked !== checked) {
            metaGroup.isChecked = checked;
            if (!me.updatingRecords) {
                me.refreshView(groupName);
            }
            //Ext.defer(function () {
            //    me.refreshView(groupName);
            //}, 0);
        }
        //var me = this,
        //    parentRecord = this.getParentRecord(groupName);

        //if (parentRecord) {
        //    if (parentRecord.selected !== selected) {
        //        parentRecord.selected = selected;
        //        Ext.defer(function () {
        //            me.refreshView(groupName);
        //        }, 0);
        //    }
        //}
    },

    getParentRecord: function (groupName) {
        var parentRecord;
        var metaGroup;
        // For Ext JS 6 and 5.1.1
        if (this.getMetaGroup) {
            metaGroup = this.getMetaGroup(groupName);
        }
        // For Ext JS 5.1-
        else {
            metaGroup = this.groupCache[groupName];
        }
        if (metaGroup) {
            parentRecord = metaGroup.placeholder;
        }
        return parentRecord;
    },

    /**
     * TODO: This might break... we're using a private variable here... but this
     * is the only way we can refresh the view without breaking any sort of
     * scrolling... I'm not sure how to only refresh the group header itself, so
     * I'm keeping the groupName as a param passing in... might be able to figure
     * this out later
     * @param {String} groupName
     */
    refreshView: function (groupName) {
        var view = this.view;
        if (view) {
            view.refreshView();
        }
    },

    changeViewSelection: function (selModel, records) {
    },

    onViewSelect: function (selModel, record) {
        var me = this;
        var groupField = this.getGroupField();
        var selection = selModel.getSelection();

        if (!groupField) return;
        //if (me.updatingRecords) return;
        if (this.chacheSelection && Ext.Array.equals(this.chacheSelection, selection)) return;
        if (this.grid.ownerLockable.lockedGrid !== this.grid) return;

        var groupName = record.get(groupField);
        //var parentRecord = this.getParentRecord(groupName);
        var groupRecord = this.getRecordGroup(record);

        var selected = true;

        groupRecord.each(function (rec) {
            if (!~selection.indexOf(rec)) {
                selected = false;
                return false;
            }
        });

        this.updateParentRecord(groupName, selected);

        this.chacheSelection = selection;
    },

    onViewDeselect: function (selModel, record) {
        var groupField = this.getGroupField();
        var selection = selModel.getSelection();

        if (!groupField) return;
        if (this.chacheSelection && Ext.Array.equals(this.chacheSelection, selection)) return;
        if (this.grid.ownerLockable.lockedGrid !== this.grid) return;

        //var groupName = record.get(groupField);
        //var parentRecord = this.getParentRecord(groupName);
        //var groupRecord = this.getRecordGroup(record);

        this.updateParentRecord(record.get(groupField), false);

        this.chacheSelection = selection;
    },

    onStoreUpdate: function (store, record, operation, modifiedFieldNames, details, eOpts) {
        console.log('update');
        var grid = this.grid;
        if (!this.updatingRecords && grid && record) {
            var groupName = record.get(this.getGroupField());
            this.checkAllGroups(groupName);
            //grid.setSelection(record);
            this.refreshView(groupName);
        }
    },

    setRecordChecked: function (rec, checked) {
        //this.grid.selModel[checked ? 'doSelect' : 'doDeselect']([rec]);
        //rec.beginEdit();
        //rec.set(this.checkDataIndex, checked, { dirty: false });
        //rec.endEdit(true);
    },

    onGroupClick: function (grid, node, group, event, eOpts) {
        if (event && grid) {
            var me = this,
                sm = me.grid.selModel,
                target = event.getTarget('.' + me.targetCls),
                store = grid.getStore(),
                groupRecord = me.getRecordGroup(event.record);

            if (target && store && groupRecord) {
                var checked = target.checked;

                me.updatingRecords = true;
                //store.suspendEvents();
                //groupRecord.each(function (rec, index) {
                //    me.setRecordChecked(rec, checked);
                //});
                if (checked) {
                    sm.doSelect(Ext.Array.clone(groupRecord.items), true, true);
                } else {
                    sm.doDeselect(Ext.Array.clone(groupRecord.items), true);
                }
                me.updateParentRecord(group, checked);
                me.updatingRecords = false;
                //store.resumeEvents();
            } else {
                this.callParent(arguments);
            }
        }
    }
});
