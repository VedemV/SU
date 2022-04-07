Ext.define(
    'SU.locale.ru.form.field.HtmlEditor',
    {
        override: 'Ext.form.field.HtmlEditor',
        createLinkText: 'Пожалуйста, введите адрес:'
    },
    function () {
        Ext.apply(Ext.form.field.HtmlEditor.prototype, {
            buttonTips: {
                bold: {
                    title: 'Полужирный (Ctrl+B)',
                    text: 'Применение полужирного начертания к выделенному тексту.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                italic: {
                    title: 'Курсив (Ctrl+I)',
                    text: 'Применение курсивного начертания к выделенному тексту.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                underline: {
                    title: 'Подчёркнутый (Ctrl+U)',
                    text: 'Подчёркивание выделенного текста.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                increasefontsize: {
                    title: 'Увеличить размер',
                    text: 'Увеличение размера шрифта.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                decreasefontsize: {
                    title: 'Уменьшить размер',
                    text: 'Уменьшение размера шрифта.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                backcolor: {
                    title: 'Заливка',
                    text: 'Изменение цвета фона для выделенного текста или абзаца.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                forecolor: {
                    title: 'Цвет текста',
                    text: 'Измение цвета текста.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifyleft: {
                    title: 'Выровнять текст по левому краю',
                    text: 'Вырaвнивание текста по левому краю.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifycenter: {
                    title: 'По центру',
                    text: 'Вырaвнивание текста по центру.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                justifyright: {
                    title: 'Выровнять текст по правому краю',
                    text: 'Вырaвнивание текста по правому краю.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                insertunorderedlist: {
                    title: 'Маркеры',
                    text: 'Начать маркированный список.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                insertorderedlist: {
                    title: 'Нумерация',
                    text: 'Начать нумернованный список.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                createlink: {
                    title: 'Вставить гиперссылку',
                    text: 'Создание ссылки из выделенного текста.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                },
                sourceedit: {
                    title: 'Исходный код',
                    text: 'Переключиться на исходный код.',
                    cls: Ext.baseCSSPrefix + 'html-editor-tip'
                }
            }
        });
    }
);
