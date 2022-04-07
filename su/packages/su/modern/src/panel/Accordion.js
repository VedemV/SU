/**
 *
 * Расширение панели для управления дочерними панелями в стиле аккордеона.
 *
 * _Примечание:_ Это расширение будет применено только к элементам типа `Ext.Panel` и его подклассам.
 * Все остальные элементы будут работать как обычно.
 *
 * По умолчанию только одна дочерняя панель может быть в развернутом виде.
 *
 *
 *     @example
 *     Ext.create({
 *         xtype: 'accordion',
 *         title: 'Accordion Panel',
 *         animationPanel: { duration: 150 },
 *         fullscreen: true,
 *
 *         defaults: {
 *             xtype: 'panel',
 *             bodyPadding: 10,
 *             scrollable: true,
 *             flex: 1,
 *             layout: 'fit'
 *         },
 *
 *         items: [{
 *             title: 'Panel 1',
 *             collapsed: false,
 *             html: 'Panel 1 content!'
 *         }, {
 *             title: 'Panel 2',
 *             html: 'Panel 2 content!'
 *         }, {
 *             title: 'Panel 3',
 *             html: 'Panel 3 content!'
 *         }]
 *     });
 *
 * Для включения множественного режима установите #collapseByDefault в `false`.
 *
 *
 *     @example
 *     Ext.create({
 *         xtype: 'accordion',
 *         title: 'Accordion Panel',
 *         fullscreen: true,
 *         collapseByDefault: false,
 *         scrollable: true,
 *
 *         defaults: {
 *             xtype: 'panel',
 *             bodyPadding: 10,
 *             layout: 'fit'
 *         },
 *
 *         items: [{
 *             title: 'Panel 1',
 *             html: 'Panel 1 content!'
 *         }, {
 *             title: 'Panel 2',
 *             html: 'Panel 2 content!'
 *         }, {
 *             title: 'Panel 3',
 *             html: 'Panel 3 content!'
 *         }, {
 *             title: 'Panel 4',
 *             html: 'Panel 4 content!'
 *         }]
 *     });
 *
 */
Ext.define('SU.panel.Accordion', function (Accordion) {
    if (Ext.versions.extjs.gtEq('7.0')) {
        return {
            extend: 'Ext.panel.Accordion'
        };
    }

    return {
        extend: 'Ext.Panel',
        xtype: 'accordion',

        mixins: ['Ext.mixin.Bufferable'],

        requires: ['Ext.layout.VBox', 'Ext.panel.Collapser'],

        config: {
            /**
             * @cfg {Boolean} collapseByDefault
             * Флаг, указывающий, должны ли сворачиваться все оставшиеся панели
             * при открытии одной из них
             */
            collapseByDefault: true,

            /**
             * @cfg {String} defaultPanelUI
             * {@link Ext.Widget#ui ui} по умолчанию для назначения свертываемым панелям.
             */
            defaultPanelUI: 'accordion',

            /**
             * @cfg {Boolean} headerPanelClickable
             * Свертывние / развертывание панели по клику на заголовке
             */
            headerPanelClickable: true,

            /**
             * @cfg {Boolean/Object}
             * @inheritdoc Ext.panel.Collapser#animation
             */
            animationPanel: false
        },

        layout: {
            type: 'vbox'
        },

        bufferableMethods: {
            syncState: 'asap'
        },

        /**
         * @property {String}
         * CSS класс элемента #bodyEl
         */
        accordionCls: Ext.baseCSSPrefix + 'layout-accordion',

        /**
         * @property {String}
         * Селектор выборки панелей, участвующих в выравнивании
         * @protected
         */
        accordionSelector: '> [isPanel][collapsible][isInner]',

        //prioritySeed: 0,

        initialize: function () {
            var me = this;

            me.callParent(arguments);

            me.on({
                scope: me,
                delegate: me.accordionSelector,
                priority: -1000,

                beforecollapse: 'onPanelBeforeCollapse',
                beforeexpand: 'onPanelBeforeExpand',
                beforehiddenchange: 'onBeforePanelHiddenChange',

                collapse: 'onPanelCollapse',
                expand: 'onPanelExpand',
                hiddenchange: 'onPanelHiddenChange'
            });

            me.getRenderTarget().addCls(me.accordionCls);
            me.syncStateNow();
        },

        onItemAdd: function (item, index) {
            var me = this,
                initialItemConfig = item.initialConfig,
                startCollapsed = initialItemConfig.collapsed,
                animationPanel = me.getAnimationPanel(),
                collapsible;

            if (item.isPanel && item.isInnerItem()) {
                collapsible = item.getCollapsible();

                if (collapsible !== false) {
                    // Ставим обработчик клика на заголовке
                    if (me.getHeaderPanelClickable()) {
                        me.bindHeaderEvent(item, true);
                    }

                    // ui на панель
                    if (!item.getUi() && !initialItemConfig.ui) {
                        item.$accordionUI = me;
                        item.setUi(me.getDefaultPanelUI());
                    }

                    // Настраиваем collapsible
                    if (collapsible) {
                        collapsible.setUseDrawer(false);
                        collapsible.setAnimation(animationPanel);
                        collapsible.setDynamic(true);
                    } else {
                        // Если collapsible явно не определен
                        // нужно смотреть настройку initialItemConfig.collapsed
                        // что бы настроить его,
                        // по умолчанию панель свернута
                        item.setCollapsible({
                            collapsed: Ext.isDefined(startCollapsed) ? startCollapsed : true,
                            animation: animationPanel,
                            dynamic: true,
                            useDrawer: false
                        });
                    }

                    // Посчитаем приоритеты
                }
            }

            me.callParent([item, index]);
        },

        onItemRemove: function (item, index, destroying) {
            var me = this,
                collapsible;

            // Очищаем UI складной панели (но не другие вещи, такие как пристыкованные элементы).
            if (item.$accordionUI === me && item.getUi() === me.getDefaultPanelUI()) {
                item.$accordionUI = null;
                item.setUi(null);
            }

            if (item.isPanel && item.isInnerItem()) {
                collapsible = item.getCollapsible();

                if (collapsible !== false) {
                    // Снимаем обработчик клика на заголовке
                    if (me.getHeaderPanelClickable()) {
                        me.bindHeaderEvent(item, false);
                    }
                }
            }

            me.syncState();

            me.callParent([item, index, destroying]);
        },

        updateCollapseByDefault: function (value) {
            this.syncStateNow();
        },

        updateHeaderPanelClickable: function (value) {
            var me = this,
                panels = me.query(me.accordionSelector);

            panels.forEach(function (item) {
                me.bindHeaderEvent(item, value);
            });
        },

        // @ignore
        privates: {
            // Установка/снятие обработчика клика на заголовке
            bindHeaderEvent: function (panel, set) {
                var me = this,
                    header = panel.getHeader();

                fn = set ? 'on' : 'un';

                header[fn].call(header, {
                    scope: me,
                    click: 'onPanelHeaderClick',
                    element: 'element'
                });
            },

            /**
             * @return {Array}
             * @private
             */
            getAccordionPanels: function () {
                var me = this,
                    items = me.query(me.accordionSelector),
                    expanded = [],
                    n = items.length,
                    i,
                    item;

                //items.sort(me._sortFn);

                for (i = 0; i < n; ++i) {
                    item = items[i];

                    if (item.getHidden()) {
                        items.splice(i, 1);
                        --n;
                        --i;
                    } else if (!item.getCollapsed()) {
                        expanded.push(item);
                    }
                }

                items.$expanded = expanded;

                return items;
            },

            onPanelBeforeCollapse: function (panel) {
                var me = this,
                    panels,
                    index;

                // В процессе анимации никаких действий, пока не закончится
                if (panel.$animating) return false;

                if (!me.getCollapseByDefault()) {
                    panel.$animating = true;
                    return true;
                }

                panels = me.getAccordionPanels();
                index = panels.indexOf(panel);

                if (panels.$expanded.length === 1) {
                    if (index === panels.length - 1) {
                        panel = panels[index - 1];
                    } else {
                        panel = panels[index + 1];
                    }

                    panel && panel.expand();
                    return false;
                }

                // Включаем индикатор процесса анимации
                panel.$animating = true;
            },

            onPanelBeforeExpand: function (panel) {
                // В процессе анимации никаких действий, пока не закончится
                if (panel.$animating) return false;

                // Включаем индикатор процесса анимации
                panel.$animating = true;
            },

            onPanelCollapse: function (panel) {
                delete panel.$animating;
            },

            onPanelExpand: function (panel) {
                var me = this;

                delete panel.$animating;

                if (me.getCollapseByDefault()) {
                    me.getAccordionPanels().forEach(function (child) {
                        if (panel !== child) {
                            child.collapse();
                        }
                    });
                }
            },

            onBeforePanelHiddenChange: function (panel, hidden) {
                if (hidden) {
                    this.syncState();
                }
            },

            onPanelHiddenChange: function (panel, hidden) {
                if (!hidden) {
                    // eslint-disable-next-line vars-on-top
                    var panels = this.getAccordionPanels();

                    Ext.Array.remove(panels.$expanded, panel);

                    if (panels.$expanded.length) {
                        this.collapsePanelNoAnim(panel, true);
                    }
                }
            },

            onPanelHeaderClick: function (event) {
                var cmp = Ext.fly(event.delegatedTarget).component.ownerCmp;

                if (cmp.getCollapsed()) {
                    cmp.expand();
                } else {
                    cmp.collapse();
                }
            },

            /**
             *
             * @param {Ext.panel.Panel} panel
             * @param {Boolean} collapsed
             * @private
             */
            collapsePanelNoAnim: function (panel, collapsed) {
                var ev = 'before' + (collapsed ? 'collapse' : 'expand');

                panel.suspendEvent(ev);

                if (panel.getCollapsible().unanimated) {
                    panel.getCollapsible().unanimated(function (collapser) {
                        collapser.setCollapsed(collapsed);
                    });
                } else {
                    console.log('collapsePanelNoAnim', panel.$className);
                    panel.setCollapsed(collapsed);
                }

                panel.resumeEvent(ev);
            },

            /**
             *
             * @param {Object} info
             * @private
             */
            doSyncState: function (info) {
                var me = this,
                    panels = me.query(me.accordionSelector),
                    expanded = me.query(me.accordionSelector + '[collapsed=false]'),
                    item;

                if (!expanded.length && me.getCollapseByDefault()) {
                    item = panels.pop();

                    if (item) {
                        me.collapsePanelNoAnim(item, false);
                    }
                } else {
                    // оставим пока как есть
                }
            },

            /**
             *
             * @param {Object} info
             * @private
             */
            syncStateNow: function (info) {
                this.cancelSyncState();
                this.doSyncState(info);
            }
        }
    };
});
