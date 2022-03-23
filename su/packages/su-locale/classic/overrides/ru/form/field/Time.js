
Ext.define("SU.locale.ru.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "Время в этом поле должно быть больше или равно {0}",
    maxText: "Время в этом поле должно быть меньше или равно {0}",
    invalidText: "{0} не является действительным временем",
    format: "H:i",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});