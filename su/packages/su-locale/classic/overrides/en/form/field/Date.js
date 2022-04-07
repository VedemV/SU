Ext.define('SU.locale.en.form.field.Date', {
    override: 'Ext.form.field.Date',
    disabledDaysText: 'Disabled',
    disabledDatesText: 'Disabled',
    minText: 'The date in this field must be after {0}',
    maxText: 'The date in this field must be before {0}',
    invalidText: '{0} is not a valid date - it must be in the format {1}',
    format: 'm/d/y',
    altFormats: 'm/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d'
});
