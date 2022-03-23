
Ext.define("SU.locale.ru.form.field.Date", {
    override: "Ext.form.field.Date",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    minText: "Дата в этом поле должна быть позже {0}",
    maxText: "Дата в этом поле должна быть раньше {0}",
    invalidText: "{0} не является правильной датой - дата должна быть указана в формате {1}",
    format: "d.m.y",
    altFormats: "d.m.y|d/m/Y|d-m-y|d-m-Y|d/m|d-m|dm|dmy|dmY|d|Y-m-d"
});
