
Ext.define("SU.locale.en.data.validator.Length", {
    override: "Ext.data.validator.Length",
    config: {
        minOnlyMessage: "Length must be at least {0}",
        maxOnlyMessage: "Length must be no more than {0}",
        bothMessage: "Length must be between {0} and {1}"
    }
});
