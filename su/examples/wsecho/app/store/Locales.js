/**
 *
 */
Ext.define('WSEcho.store.Locales', {
    extend: 'SU.locale.store.LocalesStore',
    storeId: 'localesStore',

    data: [
        {
            id: 'en',
            label: 'English',
            url: 'resources/locale/locale-en.js',
            propertiesClass: 'WSEcho.en.Languages'
        },
        // {
        //     id: 'es',
        //     label: 'Spanish',
        //     url: 'resources/locale/locale-es.js',
        //     propertiesClass: 'WSEcho.en.Languages'
        // },
        {
            id: 'ru',
            label: 'Русский',
            url: 'resources/locale/locale-ru.js',
            propertiesClass: 'WSEcho.ru.Languages'
        }
    ]
});
