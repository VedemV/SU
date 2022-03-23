# Структура ответа ядра на запрос или контролируемую команду

    {
        ANSW: {
            cmd: {@link String},	- соответствует cmd запроса
            seq: {@link Number},	- соответствует seq запроса
            <result>,		- результат выполнения запроса
            <fdefs>,		- массив, со списком получемых от ядра полей данных
            <records>		- массив, записей данных
        }
    }

#### &lt;result&gt; - результат выполнения запроса
    <result> =
    result: {
        code: {@link Number},	- код результата выполнения команды
        class: {@link String},	- (optional) класс ошибки
        text: {@link String},	- (optional) текст сообщения об ошибке, выданный ядром
    }

#### &lt;fdefs&gt; - массив, со списком получемых от ядра полей данных
    <fdefs> =
    fdefs: [
        <fdef>,
        ....,
        <fdef>
    ]

#### &lt;fdef&gt; - структура описания поля данных
    <fdef> = {
        name: {@link String}, - имя поля
        type: {@link String}, - тип поля
        size: {@link Number}, - размер данных (только для типа s)
    }
Параметр <tt>type</tt> принимает одно из значений:

- 'i' - {@link Number} (int64)
- 's' - {@link String}
- 'e' - null

#### &lt;records&gt; - массив, записей данных
    <records> =
    records: [
        <record>,
        ....,
        <record>
    ]

#### &lt;record&gt; - массив значений записи
    <record> = [
        value,
        ....,
        value
    ]
