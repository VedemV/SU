
Ext.define("SU.locale.ru.data.validator.Range", {
    override: "Ext.data.validator.Range",
    config: {
        minOnlyMessage: "Должно быть не менее {0}",
        maxOnlyMessage: "Должно быть не более {0}",
        bothMessage: "Должно быть между {0} и {1}",
        nanMessage: "Должно быть числом"
    }
});
