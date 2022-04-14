/**
 *
 */
Ext.define('MIcons.util.CSSHelper', {
    alternateClassName: ['MIcons.CSSHelper'],
    singleton: true,

    /**
     * Выборка всех стилей документа типа CSSStyleRule
     * @returns {CSSStyleRule[]}
     */
    getStyleSheets: function () {
        return Array.prototype.concat
            .apply(
                [],
                Array.prototype.slice
                    .call(document.styleSheets)

                    .map(function (sheet) {
                        if (!sheet || !sheet.cssRules) return null;
                        return Array.prototype.concat.apply([], Array.prototype.slice.call(sheet.cssRules));
                    })
            )
            .filter(function (rule) {
                return rule.style && rule.selectorText;
            });
    },

    /**
     * Выборка всех CSSStyleRule содержащих content в before
     * @returns {CSSStyleRule[]}
     */
    getBeforeContentStyleSheets: function () {
        return this.getStyleSheets().filter(function (rule) {
            var content = rule.style.content && rule.style.content.replaceAll('"', '').trim();
            return rule.selectorText.indexOf('::before') !== -1 && content;
        });
    },

    /**
     * CSSStyleRule с разбивкой алиасов определений
     * @param {CSSStyleRule[]} rules
     * @returns {CSSStyleRule[]}
     */
    getSingleStyleSheets: function (rules) {
        return Array.prototype.concat.apply(
            [],
            Array.prototype.slice.call(
                rules.map(function (rule) {
                    var selectors = rule.selectorText.split(',').map(function (selector) {
                        return selector.trim();
                    });

                    return selectors.map(function (selector) {
                        return Object.assign(rule, { selectorText: selector });
                    });
                })
            )
        );
    },

    /**
     * Преобразование CSSStyleRule в простой объект вида
     *
     *    {
     *        content: {string},  // с преобразованием единственного символа в HEX-код
     *        name: {string}      // имя CSS класса
     *    }
     *
     * @param {CSSStyleRule[]} rules
     * @returns {Object[]}
     */
    convertStyleSheetsToModel: function (rules) {
        return rules.map(function (rule) {
            var content = rule.style.content.replaceAll('"', '').trim();
            var code =
                content.length === 1 ? content.replaceAll('"', '').charCodeAt().toString(16).toUpperCase() : content;
            return { content: code, name: rule.selectorText };
        });
    },

    /**
     * Уникальный cписок CSS классов
     * @returns {Object[]}
     */
    getFontIconClasses: function () {
        var classes = {};
        return this.convertStyleSheetsToModel(this.getSingleStyleSheets(this.getBeforeContentStyleSheets())).filter(
            function (style) {
                return !classes[style.name] && (classes[style.name] = true);
            }
        );
    }
});
