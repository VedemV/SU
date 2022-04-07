/**
 * Модель объектов данных о динамической локализации компонент.
 *
 * Содержит определения полей:
 *
 * - client: Экземпляр компонента
 *
 * - method: Имя метода или метод выполняющий обновление
 *
 * - key: Ключ значения локализации
 *
 * @since 1.0.0.0
 */
Ext.define('SU.locale.model.ClientModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'client' },
            { name: 'method' },
            { name: 'key', type: 'string' },
            { name: 'allowEmpty', type: 'boolean', defaultValue: false }
        ]
    }
});
