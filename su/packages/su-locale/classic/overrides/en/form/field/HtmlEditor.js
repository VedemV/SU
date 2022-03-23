
Ext.define("SU.locale.en.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Please enter the URL for the link:'
}, function () {
    Ext.apply(Ext.form.field.HtmlEditor.prototype, {
        buttonTips: {
            bold: {
                title: 'Bold (Ctrl+B)',
                text: 'Make the selected text bold.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            italic: {
                title: 'Italic (Ctrl+I)',
                text: 'Make the selected text italic.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            underline: {
                title: 'Underline (Ctrl+U)',
                text: 'Underline the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            increasefontsize: {
                title: 'Grow Text',
                text: 'Increase the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            decreasefontsize: {
                title: 'Shrink Text',
                text: 'Decrease the font size.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            backcolor: {
                title: 'Text Highlight Color',
                text: 'Change the background color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            forecolor: {
                title: 'Font Color',
                text: 'Change the color of the selected text.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyleft: {
                title: 'Align Text Left',
                text: 'Align text to the left.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifycenter: {
                title: 'Center Text',
                text: 'Center text in the editor.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            justifyright: {
                title: 'Align Text Right',
                text: 'Align text to the right.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertunorderedlist: {
                title: 'Bullet List',
                text: 'Start a bulleted list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            insertorderedlist: {
                title: 'Numbered List',
                text: 'Start a numbered list.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            createlink: {
                title: 'Hyperlink',
                text: 'Make the selected text a hyperlink.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            },
            sourceedit: {
                title: 'Source Edit',
                text: 'Switch to source editing mode.',
                cls: Ext.baseCSSPrefix + 'html-editor-tip'
            }
        }
    });
});

