/**
 *
 */
Ext.define('FIV.view.dataview.IconsViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.app-iconsview',

    requires: ['FIV.util.CSSHelper', 'FIV.store.Icons'],

    data: {
        selection: null,
        search: null,
        sortProperty: 'name',
        sortDirection: 'ASC'
    },

    formulas: {
        usageSelection: function (get) {
            var selection = get('selection');
            var view = this.getView();
            var prefix = view.getPrefix();
            var baseCls = view.getBasePrefix() || 'x-' + prefix;
            return selection ? Ext.String.format("iconCls: '{0} {1}'", baseCls, selection.get('name')) : '';
        },

        iconStoreData: {
            get: function () {
                var view = this.getView();
                var prefix = view.getPrefix();
                var exp = new RegExp(['^.(', prefix, '-.*)::before'].join(''));
                var baseCls = view.getBasePrefix() || 'x-' + prefix;

                var data = FIV.CSSHelper.getFontIconClasses()
                    .filter(function (rule) {
                        return rule.name.match(exp);
                    })
                    .map(function (rule) {
                        return {
                            baseCls: baseCls,
                            name: rule.name.match(exp)[1],
                            content: rule.content
                        };
                    });
                return data;
            }
        },

        sortDirectionIcon: function (get) {
            return get('sortDirection') === 'ASC' ? 'x-mi mi-sort-ascending' : 'x-mi mi-sort-descending';
        }
    },

    stores: {
        iconsStore: {
            type: 'icons',
            data: '{iconStoreData}',
            filters: [
                {
                    property: 'name',
                    operator: 'like',
                    value: '{search}',
                    disabled: '{!search}'
                }
            ],
            sorters: [
                {
                    id: 'sort',
                    property: '{sortProperty}',
                    direction: '{sortDirection}'
                }
            ]
        }
    }
});
