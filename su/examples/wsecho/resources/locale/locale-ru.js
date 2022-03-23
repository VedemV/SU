
Ext.onReady(function () {

    if (Ext.Date) {
        Ext.Date.defaultFormat = 'd.m.Y';

        Ext.Date.monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

        Ext.Date.shortMonthNames = ["Янв", "Февр", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];

        Ext.Date.getShortMonthName = function (month) {
            return Ext.Date.shortMonthNames[month];
        };

        Ext.Date.monthNumbers = {
            'Янв': 0,
            'Фев': 1,
            'Мар': 2,
            'Апр': 3,
            'Май': 4,
            'Июн': 5,
            'Июл': 6,
            'Авг': 7,
            'Сен': 8,
            'Окт': 9,
            'Ноя': 10,
            'Дек': 11
        };

        Ext.Date.getMonthNumber = function (name) {
            return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        };

        Ext.Date.dayNames = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];

        Ext.Date.getShortDayName = function (day) {
            return Ext.Date.dayNames[day].substring(0, 3);
        };

        Ext.Date.firstDayOfWeek = 1;
    }

});
﻿
Ext.define("SU.locale.ru.Error", {
    override: "SU.Error",
    statics: {
        locales: {
            DOM_UNKNOWN: "Неизвестное исключение. Код ({0})",
            DOM_INDEX_SIZE_ERR: "Индекс или размер является отрицательным, или больше, чем допустимое значение.",
            DOM_STRING_SIZE_ERR: "Результирующая строка слишком длинная, чтобы поместиться в DOMString",
            DOM_HIERARCHY_REQUEST_ERR: "Узел не может быть вставлен в требуемое место",
            DOM_WRONG_DOCUMENT_ERR: "Узел принадлежит другому документу и не могут быть использован.",
            DOM_INVALID_CHARACTER_ERR: "Строка содержит недопустимый символ",
            DOM_NO_DATA_ALLOWED_ERR: "Данные указаны для узла, который не поддерживает данные.",
            DOM_NO_MODIFICATION_ALLOWED_ERR: "Сделана попытка модифицировать объект, который не может быть изменен.",
            DOM_NOT_FOUND_ERR: "Элемент не может быть найден",
            DOM_NOT_SUPPORTED_ERR: "Запрошенная операция не поддерживается.",
            DOM_INUSE_ATTRIBUTE_ERR: "Указанный атрибут уже используется в другом месте.",
            DOM_INVALID_STATE_ERR: "Указанный узел не принадлежит документу.",
            DOM_SYNTAX_ERR: "Указано недопустимое значение строки.",
            DOM_INVALID_MODIFICATION_ERR: "Невозможно изменить тип объекта",
            DOM_NAMESPACE_ERR: "Декларация пространства имен некорректна",
            DOM_INVALID_ACCESS_ERR: "Параметр или операция не поддерживается.",
            DOM_VALIDATION_ERR: "Операция примененная к узлу не проходит проверку.",
            DOM_TYPE_MISMATCH_ERR: "Тип узла несовместим с ожидаемым типом параметра.",
            DOM_SECURITY_ERR: "Операция не допускается в связи с ограничением политики безопасности.",
            DOM_NETWORK_ERR: "Ошибка в сети.",
            DOM_ABORT_ERR: "Операция прервана пользователем.",
            DOM_URL_MISMATCH_ERR: "Указанный URL не соответствует.",
            DOM_QUOTA_EXCEEDED_ERR: "Операция будет превышать пределы хранения."
        }
    }
});﻿
Ext.define("SU.locale.ru.WebSocketError", {
    override: "SU.WebSocketError",
    statics: {
        locales: {
            ALREADY_ESTABLISHED: "Соединение уже установлено.",
            NOT_CONNECTED: "Соединение не установлено.",
            CAN_NOT_CONNECT: "Невозможно установить соединение с {0}",
            DISCONNECT: "Соединение с {0} было прервано.",
            INVALID_SCHEME: "Неправильная схема '{0}' для WebSocket",
            INVALID_ADDRESS: "Неверный адрес '{0}' для WebSocket",
            LOGIN_NOT_DEFINED: "Не определен логин для автоматической авторизации пользователя.",
            LOGIN_ERROR: "Ошибка входа в систему ({0}).\n\n{1}",
            LOGIN_CUSTOM: "Неверный логин или пароль",
            LOGIN_UNKNOWN: "Имя пользователя или пароль неопознаны.",
            LOGIN_INV_METHOD: "Авторизация запрещена администратором системы.",
            AUTHORIZE_ERROR: "Ошибка выполнения запроса авторизации."
        }
    }
});
Ext.define("SU.locale.ru.data.validator.Bound", {
    override: "Ext.data.validator.Bound",
    config: {
        emptyMessage: "Должен присутствовать"
    }
});

Ext.define("SU.locale.ru.data.validator.Email", {
    override: "Ext.data.validator.Email",
    config: {
        message: "Недействительный адрес электронной почты"
    }
});

Ext.define("SU.locale.ru.data.validator.Exclusion", {
    override: "Ext.data.validator.Exclusion",
    config: {
        message: "Значение, которое было исключено"
    }
});

Ext.define("SU.locale.ru.data.validator.Format", {
    override: "Ext.data.validator.Format",
    config: {
        message: "Неправильный формат"
    }
});

Ext.define("SU.locale.ru.data.validator.Inclusion", {
    override: "Ext.data.validator.Inclusion",
    config: {
        message: "Нет в списке допустимых значений"
    }
});

Ext.define("SU.locale.ru.data.validator.Length", {
    override: "Ext.data.validator.Length",
    config: {
        minOnlyMessage: "Длина должна быть не менее {0}",
        maxOnlyMessage: "Длина должна быть не более {0}",
        bothMessage: "Длина должна быть между {0} и {1}"
    }
});

Ext.define('SU.locale.ru.data.validator.Phone', {
    override: 'Ext.data.validator.Phone',

    config: {
        message: 'Не верный номер телефона'
    }
});

Ext.define("SU.locale.ru.data.validator.Presence", {
    override: "Ext.data.validator.Presence",
    config: {
        message: "Должен присутствовать"
    }
});

Ext.define("SU.locale.ru.data.validator.Range", {
    override: "Ext.data.validator.Range",
    config: {
        minOnlyMessage: "Должно быть не менее {0}",
        maxOnlyMessage: "Должно быть не более {0}",
        bothMessage: "Должно быть между {0} и {1}",
        nanMessage: "Должно быть числом"
    }
});

Ext.define('SU.locale.ru.data.validator.Url', {
    override: 'Ext.data.validator.Url',

    config: {
        message: 'Недействительный URL'
    }
});

Ext.onReady(function () {

    if (Ext.util && Ext.util.Format) {
        Ext.apply(Ext.util.Format, {
            thousandSeparator: ' ', // &nbsp;
            decimalSeparator: ',',
            currencySign: '\u0440\u0443\u0431',
            // Russian Ruble
            dateFormat: 'd.m.Y'
        });
    }
});


Ext.define("SU.locale.ru.form.Basic", {
    override: "Ext.form.Basic",
    waitTitle: "Пожалуйста, подождите..."
});


Ext.define("SU.locale.ru.form.CheckboxGroup", {
    override: "Ext.form.CheckboxGroup",
    blankText: "Вы должны выбрать хотя бы один элемент в этой группе"
});
Ext.define("SU.locale.ru.form.RadioGroup", {
    override: "Ext.form.RadioGroup",
    blankText: "Вы должны выбрать один элемент в этой группе"
});
Ext.define("SU.locale.ru.form.field.Base", {
    override: "Ext.form.field.Base",
    invalidText: "Значение в этом поле неверное"
});

Ext.define("SU.locale.ru.form.field.ComboBox", {
    override: "Ext.form.field.ComboBox",
    valueNotFoundText: undefined
}, function () {
    Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
        loadingText: "Загрузка..."
    });
});

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

Ext.define("SU.locale.ru.form.field.File", {
    override: "Ext.form.field.File",
    buttonText: "Обзор..."
});

Ext.define("SU.locale.ru.form.field.HtmlEditor", {
    override: "Ext.form.field.HtmlEditor",
    createLinkText: 'Пожалуйста, введите адрес:'
}, function () {
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
});


Ext.define("SU.locale.ru.form.field.Number", {
    override: "Ext.form.field.Number",
    minText: "Значение этого поля не может быть меньше {0}",
    maxText: "Значение этого поля не может быть больше {0}",
    nanText: "{0} не является числом",
    negativeText: "Значение не может быть отрицательным"
});

Ext.define("SU.locale.ru.form.field.Text", {
    override: "Ext.form.field.Text",
    minLengthText: "Минимальная длина этого поля {0}",
    maxLengthText: "Максимальная длина этого поля {0}",
    blankText: "Это поле обязательно для заполнения",
    regexText: "",
    emptyText: null
});

Ext.define("SU.locale.ru.form.field.Time", {
    override: "Ext.form.field.Time",
    minText: "Время в этом поле должно быть больше или равно {0}",
    maxText: "Время в этом поле должно быть меньше или равно {0}",
    invalidText: "{0} не является действительным временем",
    format: "H:i",
    altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
});
Ext.define("SU.locale.ru.form.field.VTypes", {
    override: "Ext.form.field.VTypes",
    emailText: 'Это поле должно содержать адрес электронной почты в формате "user@example.com"',
    urlText: 'Это поле должно содержать URL в формате "http:/' + '/www.example.com"',
    alphaText: 'Это поле должно содержать только латинские буквы и символ подчеркивания "_"',
    alphanumText: 'Это поле должно содержать только латинские буквы, цифры и символ подчеркивания "_"'
});

Ext.define("SU.locale.en.grid.BooleanColumn", {
    override: "Ext.grid.BooleanColumn",
    trueText: "true",
    falseText: "false",
    undefinedText: '&#160;'
});

Ext.define("SU.locale.ru.grid.DateColumn", {
    override: "Ext.grid.DateColumn",
    format: 'd.m.Y'
});

Ext.define("SU.locale.ru.grid.GroupingFeature", {
    override: "Ext.grid.feature.Grouping",
    emptyGroupText: '(Пусто)',
    groupByText: 'Группировать по этому полю',
    showGroupsText: 'Отображать по группам'
});

Ext.define("SU.locale.ru.grid.NumberColumn", {
    override: "Ext.grid.NumberColumn",
    format: '0,000.00'
});

Ext.define("SU.locale.ru.grid.PropertyColumnModel", {
    override: "Ext.grid.PropertyColumnModel",
    nameText: "Название",
    valueText: "Значение",
    dateFormat: "d.m.Y"
});

Ext.define("SU.locale.ru.grid.filters.Filters", {
    override: "Ext.grid.filters.Filters",
    menuFilterText: "Фильтры"
});


Ext.define("SU.locale.ru.grid.filters.filter.Boolean", {
    override: "Ext.grid.filters.filter.Boolean",
    yesText: "Да",
    noText: "Нет"
});


Ext.define("SU.locale.ru.grid.filters.filter.Date", {
    override: "Ext.grid.filters.filter.Date",
    fields: {
        lt: { text: 'До' },
        gt: { text: 'После' },
        eq: { text: 'Во время' }
    },
    // Defaults to Ext.Date.defaultFormat
    dateFormat: null
});


Ext.define("SU.locale.ru.grid.filters.filter.List", {
    override: "Ext.grid.filters.filter.List",
    loadingText: "Загрузка..."
});



Ext.define("SU.locale.ru.grid.filters.filter.Number", {
    override: "Ext.grid.filters.filter.Number",
    emptyText: "Введите число..."
});




Ext.define("SU.locale.ru.grid.filters.filter.String", {
    override: "Ext.grid.filters.filter.String",
    emptyText: "Введите текст..."
});

Ext.define("SU.locale.ru.grid.header.Container", {
    override: "Ext.grid.header.Container",
    sortAscText: "Сортировать по возрастанию",
    sortDescText: "Сортировать по убыванию",
    lockText: "Закрепить столбец",
    unlockText: "Снять закрепление столбца",
    columnsText: "Столбцы"
});

Ext.define("SU.locale.ru.grid.plugin.DragDrop", {
    override: "Ext.grid.plugin.DragDrop",
    dragText: "{0} выбранных строк"
});

Ext.define("SU.locale.ru.panel.Panel", {
    override: "Ext.panel.Panel",

    closeToolText: 'Закрыть',
    collapseToolText: 'Свернуть',
    expandToolText: 'Развернуть'

});

Ext.define("SU.locale.ru.picker.Date", {
    override: "Ext.picker.Date",
    todayText: "Сегодня",
    minText: "Эта дата раньше минимальной даты",
    maxText: "Эта дата позже максимальной даты",
    disabledDaysText: "Недоступно",
    disabledDatesText: "Недоступно",
    nextText: 'Следующий месяц (Control+Вправо)',
    prevText: 'Предыдущий месяц (Control+Влево)',
    monthYearText: 'Выбор месяца (Control+Вверх/Вниз для выбора года)',
    todayTip: "{0} (Пробел)",
    format: "d.m.y",
    startDay: 1
});

Ext.define("SU.locale.ru.picker.Month", {
    override: "Ext.picker.Month",
    okText: "&#160;OK&#160;",
    cancelText: "Отмена"
});

Ext.define("SU.locale.ru.tab.Tab", {
    override: "Ext.tab.Tab",
    closeText: "Закрыть эту вкладку"
});

Ext.define("SU.locale.ru.toolbar.Paging", {
    override: "Ext.PagingToolbar",
    beforePageText: "Страница",
    afterPageText: "из {0}",
    firstText: "Первая страница",
    prevText: "Предыдущая страница",
    nextText: "Следующая страница",
    lastText: "Последняя страница",
    refreshText: "Обновить",
    displayMsg: "Отображаются записи с {0} по {1}, всего {2}",
    emptyMsg: 'Нет данных для отображения'
});

// changing the msg text below will affect the LoadMask
Ext.define("SU.locale.ru.view.AbstractView", {
    override: "Ext.view.AbstractView",
    loadingText: "Загрузка..."
});

Ext.define("SU.locale.ru.view.MultiSelector", {
    override: 'Ext.view.MultiSelector',
    emptyText: 'Ничего не выбрано',
    removeRowTip: 'Удалить элемент',
    addToolText: 'Поиск элементов для добавления'
});

Ext.define("SU.locale.ru.view.MultiSelectorSearch", {
    override: 'Ext.view.MultiSelectorSearch',
    searchText: 'Поиск...'
});


Ext.define("SU.locale.ru.view.View", {
    override: "Ext.view.View",
    emptyText: ""
});

Ext.define("SU.locale.ru.window.MessageBox", {
    override: "Ext.window.MessageBox",
    buttonText: {
        ok: "OK",
        cancel: "Отмена",
        yes: "Да",
        no: "Нет"
    }
});

if( !Ext.ClassManager.classes['WSEcho.ru.Languages'] ){
	Ext.define('WSEcho.ru.Languages', {
		messages:{
			closeConfirm: 'Закрыть соединение?'
		}
	});
}

Ext.define('WSEcho.ru.view.Main', {
    override: 'WSEcho.view.Main',
    titleDefault: 'Тест WebSocket Echo'
});
