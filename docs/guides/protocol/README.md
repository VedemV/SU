# Протокол обмена "PalladaWSData".

## Общие сведения

Протокол <tt>"PalladaWSData"</tt> позволяет

- [выполнять запросы к базе данных](#query)
- [выполнять команды VSP](#cmd)
- передавать файл ядру
- получать файл от ядра
- [получать сообщения по инициативе ядра](#event)

Обмен данными происходит в формате <tt>JSON</tt> с поддержкой следующих структур данных:

###### структуры данных при выполнении запроса к базе:

- [структура запроса](#query_request)
- [структура ответа ядра на запрос](#query_answer)

##### структуры данных при выполнении команды VSP:

- [структура команды](#cmd_request)
- [структура ответа ядра на выполнение команды](#cmd_answer)

##### структуры данных сообщений ядра:

- [структура сообщения ядра](#event_struct)

##### runtime данные конференций:



## Запросы к базе
<a name="query"></a>

### Структура запроса
<a name="query_request"></a>

	{
		"dst": {{@link String}},
		"lng": {{@link String}},
		"cmd": "query" {{@link String}},
		"seq": {{@link Number}},
		"query": <query> {{@link Object}}
	}

Где:

- __dst__ {{@link String}} (опционально) - подсистема в которую передается запрос, равен
__<tt>'std'</tt>__ или __<tt>'vsp'</tt>__. _Если параметр не указан,
предполагается значение <tt>'std'</tt>._

_При использовании {@link Pallada.lib.Kernel} значение устанавливается из
{@link Pallada.lib.Kernel#defaultDST}._

- __lng__ {{@link String}} (опционально) - локализация сообщений ядра, принимает значения двухбуквенного
кода локализации ('ru' или 'en'). _Если параметр не указан, предполагается
значение <tt>'ru'</tt>._

_При использовании {@link Pallada.lib.Kernel} значение устанавливается из
{@link Pallada.lib.Kernel#defaultLNG}._

- __seq__ {{@link Number}} - номер транзакции (выданной команды) или 0 для команд без транзакции.

_При использовании {@link Pallada.lib.Kernel} очередной номер транзакции
может быть получен вызовом {@link Pallada.lib.Kernel#getTransactionNo}._

_При выполнении запросов методами {@link Pallada.lib.Kernel#sendControlledComand}
или {@link Pallada.lib.Kernel#request} с неуказанным параметром,
значение будет установлено автоматически._

- __cmd__ {{@link String}} - для запросов к базе всегда равен __<tt>"query"</tt>__ и указывает,
что будет выполняться запрос к базе данных, а в структуре будет
присутствовать блок данных [__&lt;query&gt;__](#query_request_block_query).
<p></p>

- __query__ {{@link Object}} - содержит данные запроса к базе в структуре [__&lt;query&gt;__](#query_request_block_query).




##### Структура блока &lt;query&gt; запроса к базе данных
<a name="query_request_block_query"></a>

		"query": {
			"name": {{@link String}},
			"params": {
				param_name: param_value {{@link String}},
				...
				param_name: param_value {{@link String}},
			}
		}

- __name__ {{@link String}} - имя запроса
- __params__ {{@link Object}} - параметры запроса в виде объекта содержащего в качестве свойств
объекта имена параметров, а в качестве значений свойств - значения параметров.

<i>__Примечание:__ все значения параметров передаются в виде строки!</i>



##### Пример структуры отправляемой ядру при выполнении запроса

>
> запрос <tt>qThreads</tt>
>
> параметры
>
> - <tt>HOST_ID = 1</tt>
> - <tt>PARENT_THREAD_ID = 2</tt>

	{
		"cmd":"query",
		"seq": 1,
		"query":{
			"name": "qThreads",
			"params":{
				"iHOST_ID":"1",
				"iPARENT_THREAD_ID":"2"
			}
		}
	}
>


### Структура ответа ядра на запрос
<a name="query_answer"></a>

    {
        "ANSW": {
            "cmd": {{@link String}},
            "seq": {{@link Number}},
            "result": <result>,
			"fdefs": [
				<fdef>,
				....,
				<fdef>
			],
			"records": [
				<record>,
				....,
				<record>
			]
        }
    }

- __cmd__ {{@link String}} - для запросов к базе всегда равен __<tt>"query"</tt>__,
соответствует <tt>cmd</tt> [исходной команды](#query_request)

- __seq__ {{@link Number}} - номер транзакции, соответствует <tt>seq</tt> [запроса](#query_request)

- __result__ {{@link Object}} - результат выполнения запроса в структуре
[__<tt>&lt;result&gt;</tt>__](#query_answer_result).

- __fdefs__ {{@link Array}} - массив, содержащий блоки [__<tt>&lt;fdef&gt;</tt>__](#query_answer_fdef)
с описанием полей данных

- __records__ {{@link Array}} - массив блоков [__<tt>&lt;fdef&gt;</tt>__](#query_answer_fdef)
с данными результирующих записей

##### Структура блока __<tt>&lt;result&gt;</tt>__ ответа ядра на запрос к базе данных
<a name="query_answer_result"></a>

Содержит результат выполнения запроса

	result: {
		"code": {{@link Number}},
		"class": {{@link String}},
		"text": {{@link String}},
	},

- __code__ {{@link Number}} - [код](#result_query) результата выполнения запроса к базе
- __class__ {{@link String}} (опционально) - класс ошибки
- __text__ {{@link String}} (опционально) - текст сообщения об ошибке, выданный ядром


##### &lt;fdef&gt; - структура описания поля данных в ответе ядра на запрос
<a name="query_answer_fdef"></a>

    <fdef> = {
        "name": {{@link String}},
        "type": {{@link String}},
        "size": {{@link Number}},
    }

- name {{@link String}} - имя поля
- type {{@link String}} - тип поля принимает одно из значений:
	- <tt>'i'</tt> - указывает, что это {@link Number числовое поле} (int64)
	- <tt>'s'</tt> - указывает, что это {@link String строковое поле}
	- <tt>'e'</tt> - указывает на пустое поле не содержащее данных
- size {{@link Number}} - размер данных (только для типа s)


##### &lt;record&gt; - строка данных
<a name="query_answer_record"></a>

Содержит массив значений записи, где индекс значения соответствует
индексу описания поля данных в [__fdefs__](#query_answer_fdef):

    <record> = [
        value {{@link String}},
        ....,
        value {{@link String}}
    ]

##### Пример структуры ответа ядра при выполнении запроса <tt>qThreads</tt>

	{
		"ANSW":{
			"cmd": "query",
			"seq": 1,
			"result": {
				"class": "db",
				"code": 0
			},
			"fdefs": [{
				"name": "HOST_ID",
				"type": "i"
			},{
				"name": "ID",
				"type": "i"
			},{
				"name": "TYPE_ID",
				"type": "i"
			},{
				"name": "NAME",
				"type": "s"
				"size": 50
			},{
				"name": "PARENT_THREAD_ID",
				"type": "i"
			},{
				"name": "IS_ENABLED",
				"type": "i"
			},{
				"name": "ORDER_NO",
				"type": "i"
			}],
			"records": [
				["1",	"3",	"3",	"ISEServer",	"2",	"1",	"1"],
				["1",	"4",	"4",	"DBThread",		"2",	"1",	"2"]
			]
		}
	}


### Коды результата выполнения запроса к базе
<a name="result_query"></a>

<table>
<tr><th>Класс ошибки</th><th>Код ошибки</th><th>Значение</th><th>Описание</th></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td>db</td>	<td></td>											<td>0</td>			<td>Ok</td></tr>
<tr><td></td>	<td>RTDBE_D_FIELD_CANT_BE_NULL</td>					<td>0x00000001</td>	<td>Field can't be null</td></tr>
<tr><td></td>	<td>RTDBE_D_FIELD_NOT_FOUND</td>					<td>0x00000002</td>	<td>Field not found</td></tr>
<tr><td></td>	<td>RTDBE_D_NO_PRIMARY_KEY</td>						<td>0x00000003</td>	<td>No primary key</td></tr>
<tr><td></td>	<td>RTDBE_D_UNKNOWN_FIELD_TYPE</td>					<td>0x00000004</td>	<td>Unknown field type</td></tr>
<tr><td></td>	<td>RTDBE_D_NO_STRING_LIMIT</td>					<td>0x00000005</td>	<td>No string limit</td></tr>
<tr><td></td>	<td>RTDBE_D_PRIMARY_KEY_SYNTAX</td>					<td>0x00000006</td>	<td>Primary key syntax error</td></tr>
<tr><td></td>	<td>RTDBE_D_UNIQUE_KEY_SYNTAX</td>					<td>0x00000007</td>	<td>Unique key syntax error</td></tr>
<tr><td></td>	<td>RTDBE_D_UNKNOWN_CONSTRAINT</td>					<td>0x00000008</td>	<td>Unknown constraint</td></tr>
<tr><td></td>	<td>RTDBE_D_NO_UNIQUE_KEY_NAME</td>					<td>0x00000009</td>	<td>No unique key name</td></tr>
<tr><td></td>	<td>RTDBE_D_FIELD_OF_KEY_NOT_EXISTS</td>			<td>0x00000010</td>	<td>Field of key not exists</td></tr>
<tr><td></td>	<td>RTDBE_D_DUPLICATE_TABLE_NAME</td>				<td>0x00000011</td>	<td>Duplicate table name</td></tr>
<tr><td></td>	<td>RTDBE_D_DUPLICATE_KEY</td>						<td>0x00000012</td>	<td>Duplicate key</td></tr>
<tr><td></td>	<td>RTDBE_D_FOREIGN_KEY_SYNTAX</td>					<td>0x00000013</td>	<td>Foreign key syntax error</td></tr>
<tr><td></td>	<td>RTDBE_D_NO_FOREIGN_KEY_NAME</td>				<td>0x00000014</td>	<td>No foreign key name</td></tr>
<tr><td></td>	<td>RTDBE_D_FIELD_OF_FOREIGN_KEY_NOT_EXISTS</td>	<td>0x00000015</td>	<td>Field of foreign key not exists</td></tr>
<tr><td></td>	<td>RTDBE_D_REFERENCED_TABLE_NOT_FOUND</td>			<td>0x00000016</td>	<td>Referenced table not found</td></tr>
<tr><td></td>	<td>RTDBE_D_REFERENCED_KEY_NOT_FOUND</td>			<td>0x00000017</td>	<td>Referenced key not found</td></tr>
<tr><td></td>	<td>RTDBE_D_FOREIGN_KEY_INCOMPATIBLE</td>			<td>0x00000018</td>	<td>Foreign key is incompatible with referenced key</td></tr>
<tr><td></td>	<td>RTDBE_D_FK_KEY_NOT_FOUND</td>					<td>0x00000019</td>	<td>Key value not found for a foreign key</td></tr>
<tr><td></td>	<td>RTDBE_D_FK_KEY_VIOLATION</td>					<td>0x0000001A</td>	<td>Foreign key violation</td></tr>
<tr><td></td><td></td><td></td><td></td></tr>

<tr><td></td>	<td>RTDBE_Q_EMPTY_QUERY</td>						<td>0x00000001</td>	<td>query is empty</td></tr>
<tr><td></td>	<td>RTDBE_Q_INTERNAL_ERROR</td>						<td>0x00000002</td>	<td>internal error</td></tr>
<tr><td></td>	<td>RTDBE_Q_UNPAIRED_BRACKETS</td>					<td>0x00000003</td>	<td>unpaired brackets</td></tr>
<tr><td></td>	<td>RTDBE_Q_TABLE_SYNTAX_ERROR</td>					<td>0x00000004</td>	<td>table syntax error or not found</td></tr>
<tr><td></td>	<td>RTDBE_Q_UNKNOWN_WORD</td>						<td>0x00000005</td>	<td>unknown word</td></tr>
<tr><td></td>	<td>RTDBE_Q_TOO_FEW_OPREANDS</td>					<td>0x00000006</td>	<td>operator have too few operands</td></tr>
<tr><td></td>	<td>RTDBE_Q_NO_QUERY_TYPE</td>						<td>0x00000007</td>	<td>no query type defined</td></tr>
<tr><td></td>	<td>RTDBE_Q_INVALID_SELECT_SYNTAX</td>				<td>0x00000008</td>	<td>invalid SELECT syntax</td></tr>
<tr><td></td>	<td>RTDBE_Q_ON_RESULT_MUST_BE_INT</td>				<td>0x00000009</td>	<td>ON result must be integer</td></tr>
<tr><td></td>	<td>RTDBE_Q_INCOMPATIBLE_OPERANDS</td>				<td>0x0000000A</td>	<td>incompatible operands</td></tr>
<tr><td></td>	<td>RTDBE_Q_DIVIDE_BY_ZERO</td>						<td>0x0000000B</td>	<td>divide by zero</td></tr>
<tr><td></td>	<td>RTDBE_Q_STATEMENT_IS_NOT_PREPARED</td>			<td>0x0000000C</td>	<td>statement is not prepared</td></tr>
<tr><td></td>	<td>RTDBE_Q_STATEMENT_IS_NOT_EXECUTED</td>			<td>0x0000000D</td>	<td>statement is not executed</td></tr>
<tr><td></td>	<td>RTDBE_Q_INCORRECT_INTO_SYNTAX</td>				<td>0x0000000E</td>	<td>incorrect INTO syntax</td></tr>
<tr><td></td>	<td>RTDBE_Q_INTO_TABLE_NOT_FOUND</td>				<td>0x0000000F</td>	<td>INTO table not found</td></tr>
<tr><td></td>	<td>RTDBE_Q_INCORRECT_VALUES_SYNTAX</td>			<td>0x00000010</td>	<td>incorrect VALUES syntax</td></tr>
<tr><td></td>	<td>RTDBE_Q_INVALID_INSERT_SYNTAX</td>				<td>0x00000011</td>	<td>invalid INSERT syntax</td></tr>
<tr><td></td>	<td>RTDBE_Q_INCOMPATIBE_FIELD_COUNT</td>			<td>0x00000012</td>	<td>Incompatible field count</td></tr>
<tr><td></td>	<td>RTDBE_Q_INCOMPATIBLE_TYPES</td>					<td>0x00000013</td>	<td>Incompatible types</td></tr>
<tr><td></td>	<td>RTDBE_Q_MODIFYING_ALIAS_NOT_FOUND</td>			<td>0x00000014</td>	<td>Modifying alias not found</td></tr>
<tr><td></td>	<td>RTDBE_Q_DELETE_SYNTAX_ERROR</td>				<td>0x00000015</td>	<td>Delete syntax error</td></tr>
<tr><td></td>	<td>RTDBE_Q_UPDATE_SYNTAX_ERROR</td>				<td>0x00000016</td>	<td>Update syntax error</td></tr>
<tr><td></td>	<td>RTDBE_Q_UPDATE_SET_CLAUSE_ERROR</td>			<td>0x00000017</td>	<td>Update set clause error</td></tr>
<tr><td></td>	<td>RTDBE_Q_PARAM_NOT_FOUND</td>					<td>0x00000018</td>	<td>Paremeter not found</td></tr>
<tr><td></td>	<td>RTDBE_Q_PARAM_NOT_SET</td>						<td>0x00000019</td>	<td>Query parameter not set</td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td>query_disp</td><td></td><td>1</td><td>Query Not Found</td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
</table>

## Команды VSP.
<a name="cmd"></a>

### Структура команды
<a name="cmd_request"></a>

	{
		"dst": {{@link String}},
		"lng": {{@link String}},
		"cmd": {{@link String}},
		"seq": {{@link Number}},
		"obj": {{@link String}},
		"params": {
			param_name: param_value {{@link String}},
			...
			param_name: param_value {{@link String}}
		}
	}

- __dst__ {{@link String}} (опционально) - подсистема в которую передается запрос, равен
__<tt>'std'</tt>__ или __<tt>'vsp'</tt>__. _Если параметр не указан,
предполагается значение <tt>'std'</tt>._

_При использовании {@link Pallada.lib.Kernel} значение устанавливается из
{@link Pallada.lib.Kernel#defaultDST}._

- __lng__ {{@link String}} (опционально) - локализация сообщений ядра, принимает значения двухбуквенного
кода локализации ('ru' или 'en'). _Если параметр не указан, предполагается
значение <tt>'ru'</tt>._

_При использовании {@link Pallada.lib.Kernel} значение устанавливается из
{@link Pallada.lib.Kernel#defaultLNG}._

- __seq__ {{@link Number}} - номер транзакции (выданной команды) или 0 для команд без транзакции.

_При использовании {@link Pallada.lib.Kernel} очередной номер транзакции
может быть получен вызовом {@link Pallada.lib.Kernel#getTransacionNo}._

_При выполнении запросов методами {@link Pallada.lib.Kernel#sendControlledComand}
или {@link Pallada.lib.Kernel#request} с неуказанным параметром,
значение будет установлено автоматически._

- __cmd__ {{@link String}} - команда VSP выполняемая в одном из адресатов, заданных в __<tt>obj</tt>__.
<p></p>

<a name="cmd_request_obj"></a>

- __obj__ {{@link String}} - адресат в VSP, принимает одно из значений:
	- <tt>'cd'</tt> - диспетчер конференций
	- <tt>'conf'</tt> - конференция
	- <tt>'nd'</tt> - диспетчер оповещений
	- <tt>'notify'</tt> - оповещение
<p></p>

<a name="cmd_request_params"></a>

- __params__ {{@link Object}} - параметры команды в виде объекта содержащего в качестве свойств
объекта имена параметров, а в качестве значений свойств - значения параметров.

			"params": {
				param_name: param_value {{@link String}},
				...
				param_name: param_value {{@link String}}
			}

<i>__Примечание:__ все значения параметров передаются в виде строки!</i>



### Структура ответа ядра на выполнение команды
<a name="cmd_answer"></a>

	{
		ANSW: {
			"cmd": {{@link String}},
			"seq": {{@link Number}},
			"obj": {{@link String}},
			"result": <result> {{@link Object}}
		}
	}

- __cmd__ {{@link String}} - команда VSP, соответствует <tt>cmd</tt> [исходной команды](#cmd_request)

- __seq__ {{@link Number}} - номер транзакции, соответствует <tt>seq</tt> [исходной команды](#cmd_request)

- __obj__ {{@link String}} - адресат в VSP, соответствует <tt>obj</tt> [исходной команды](#cmd_request)

- __result__ {{@link Object}} - результат выполнения команды в структуре
[__<tt>&lt;result&gt;</tt>__](#cmd_answer_result).

##### Структура блока __<tt>&lt;result&gt;</tt>__ ответа ядра на выполнение команды
<a name="cmd_answer_result"></a>

Содержит результат выполнения команды и, при необходимости, runtime данные

	result: {
		"code": {{@link Number}},
		...
	},

- __code__ {{@link Number}} - код результата выполнения команды
- в зависимости от значений <tt>obj</tt> и <tt>cmd</tt> [исходной команды](#cmd_request)
могут присутствовать блоки runtime данных.

## Сообщения ядра
<a name="event"></a>

### Структура сообщения ядра
<a name="event_struct"></a>

	{
		EVT:{
			"evt": {{@link String}},
			"obj": {{@link String}},
			"evttype": {{@link String}}, (optional)
			"result": <time> | <instantmsg> | <changed> | <webrtc> {{@link Object}}
		}
	}

- __evt__ {{@link String}} - указывает на тип сообщения и принимает одно из значений:
	- <tt>'time'</tt>			- текущее время ядра
	- <tt>'changed'</tt>		- изменение состояния конференции или оповещения
	- <tt>'instantmsg'</tt>		- сообщение чата конференции
	- <tt>'webrtc'</tt>			- сообщение для WebRTC

- __obj__ {{@link String}} - источник в VSP инициировавший сообщение:
	- <tt>'cd'</tt>		- диспетчер конференций
	- <tt>'conf'</tt>	- конференция
	- <tt>'nd'</tt>		- диспетчер оповещений
	- <tt>'notify'</tt>	- оповещение
	- <tt>'time'</tt>	- текущее время ядра

- <a name="event_struct_evttype"></a>__evttype__ {{@link String}} - (опционально) существует только для <tt>EVT.evt = 'webrtc'</tt>
и указывает на тип сообщения для WebRTC и принимает одно из значений:
	- [<tt>'servdesc'</tt>](#!/guide/vsp_event-section-conf.webrtc.servdesc)		- адрес TURN сервера, имя и пароль для входа
	- [<tt>'servufrag'</tt>](#!/guide/vsp_event-section-conf.webrtc.servufrag)		- имя и пароль для входа на STUN, порт, fingerprint
	- [<tt>'Disconnected'</tt>](#!/guide/vsp_event-section-conf.webrtc.disconnected)	- завершение сеанса WebRTC

- __result__ {{@link Object}} может быть одной из структур в зависимости
от значения типа сообщения (<tt>EVT.evt</tt>):
	- __[&lt;time&gt;](#!/guide/vsp_event-section-timer.time)__ {{@link Object}} - структура с текущим временем ядра для <tt>EVT.evt = 'time'</tt>
	- __[&lt;instantmsg&gt;](#!/guide/vsp_event-section-conf.instantmsg)__ {{@link Object}} - структура с сообщением чата конференции  для <tt>EVT.evt = 'instantmsg'</tt>
	- __[&lt;webrtc&gt;](#event_webrtc)__ {{@link Object}} - содержит runtime данные для <tt>EVT.evt = 'webrtc'</tt>
	- __&lt;changed&gt;__ {{@link Object}} - содержит runtime данные для <tt>EVT.evt = 'changed'</tt>.
В зависимости от вида источника в VSP (<tt>EVT.obj</tt>) является одной из структур
[&lt;confchanged&gt;](#event_confchanged) или [&lt;notifychanged&gt;](#event_notifychanged)

##### &lt;webrtc&gt; - структура runtime данных для соединения браузера с ядром по WebRTC
<a name="event_webrtc"></a>

    webrtc: {
        "ClusterID": {{@link Number}},
        "ID": {{@link Number}},
        "PartyID": {{@link Number}},
        "EvtData": {{@link Object}} (optional)
    }

, где

- __ClusterID__ {{@link Number}} содержит ID кластера

- __ID__ {{@link Number}} содержит ID конференции

- __PartyID__ {{@link Number}} содержит ID участника конференции (супервизора)

- __EvtData__ {{@link Object}} - структура данных в зависимости от [EVT.evttype](#event_struct_evttype).
Для <tt>EVT.evttype = 'Disconnected'</tt> структура отсутствует.


##### &lt;confchanged&gt;
<a name="event_confchanged"></a>

    <confchanged> = {
        "ClusterID": {{@link Number}},
        "ID": {{@link Number}},
        "confdata": <confdata> {{@link Object}},
        "delParties": {{@link Object}} (optional) {
			"ID": {{@link Number}}, - ID участника
			"index": {{@link Number}} - index участника
		},
        "addParties": <confpartydata> {{@link Object}}, - (optional) добавленные участники
        "updParties": <confpartydata> {{@link Object}} - (optional) измененные участники
    }

, где

- __ClusterID__ {{@link Number}} содержит ID кластера

- __ID__ {{@link Number}} содержит ID конференции

- __confdata__ {{@link Object}} (optional) содержит данные конференции #lt;confdata#gt;, если были изменения по конференции



##### &lt;notifychanged&gt;
<a name="event_notifychanged"></a>

	<notifychanged> = {
		"ClusterID": {{@link Number}}, - ID кластера
		"ID": {{@link Number}}, - ID оповещения
		   "notifydata": <notifydata> {{@link Object}}, - (optional) данные оповещения, если были изменения по оповещению
		   "delParties": {{@link Object}} (optional) {
				"ID": {{@link Number}}, - ID участника
				"index": {{@link Number}} - index участника
			},
		   "addParties": <notifypartydata> {{@link Object}}, - (optional) добавленные участники
		   "updParties": <notifypartydata> {{@link Object}} - (optional) измененные участники
	}

, где

- __ClusterID__ {{@link Number}} содержит ID кластера

- __ID__ {{@link Number}} содержит ID конференции

- notifydata {{@link Object}} (optional) содержит данные оповещения #lt;notifydata#gt;, если были изменения по оповещению


END
====================================================================================================




Примерный вид:


##### &lt;fdownload&gt; - структура для получения файлов
<a name="queryDownload"></a>
Существует только при <tt>[&lt;base&gt;](#queryBase).cmd = 'fdownload'</tt>:

    <fdownload> =
    fdownload: {
        fSession: {{@link String}}	- ID сессии
    }

##### &lt;fupload&gt; - структура для передачи файлов
<a name="queryUpload"></a>
Существует только при <tt>[&lt;base&gt;](#queryBase).cmd = 'fupload'</tt>:

    <fupload> =
    fupload: {
        fSession: {{@link String}}	- ID сессии
        dataB64: {{@link String}}	- Данные base64 encoded
    }

##### &lt;params&gt; - структура параметров
<a name="queryParams"></a>
Содержит параметры команды VSP в структуре [контролируемой команды](#query)
в случае когда <tt>[&lt;base&gt;](#queryBase).cmd</tt> является командой VSP
или параметры запроса в структуре [&lt;query&gt;](#queryQuery)

    <params> =
    params: {
        param_name: value
        ...
        param_name: value
    }

<i>__Примечание:__ все значения параметров передаются в виде строки!</i>

## Структура ответа ядра на запрос или контролируемую команду
<a name="answer"></a>

Структура

    {
        ANSW: {
            cmd: {@link String},	// соответствует cmd запроса
            seq: {@link Number},	// соответствует seq запроса
            <result>,
            <fdefs>,
            <records>
        }
    }

Содержит блоки

- __[&lt;result&gt;](#answResult)__ - результат выполнения запроса
- __[&lt;fdefs&gt;](#answFdefs)__ - описание полей данных
- __[&lt;records&gt;](#answRecords)__ - данные

##### &lt;result&gt; - результат выполнения запроса
<a name="answResult"></a>

    <result> =
    result: {
        code: {@link Number},	// код результата выполнения команды
        class: {@link String},	// (optional) класс ошибки
        text: {@link String},	// (optional) текст сообщения об ошибке, выданный ядром
    }

##### &lt;fdefs&gt; - описание полей данных
<a name="answFdefs"></a>
Является массивом, содержащим блоки [&lt;fdef&gt;](#answFdef) с описанием полей данных

    <fdefs> =
    fdefs: [
        <fdef>,
        ....,
        <fdef>
    ]

##### &lt;fdef&gt; - структура описания поля данных
<a name="answFdef"></a>

    <fdef> = {
        name: {@link String}, // имя поля
        type: {@link String}, // тип поля
        size: {@link Number}, // размер данных (только для типа s)
    }

Параметр <tt>type</tt> принимает одно из значений:

- <tt>'i'</tt> - указывает, что это {@link Number числовое поле} (int64)
- <tt>'s'</tt> - указывает, что это {@link String строковое поле}
- <tt>'e'</tt> - указывает на пустое поле не содержащее данных

##### &lt;records&gt; - массив записей данных
<a name="answRecords"></a>

Содержит блоки [&lt;record&gt;](#answRecord) строк данных

    <records> =
    records: [
        <record>,
        ....,
        <record>
    ]

##### &lt;record&gt; - строка данных
<a name="answRecord"></a>

Содержит массив значений записи, где индекс значения соответствует
индексу описания поля данных в [&lt;fdefs&gt;](#answFdefs):

    <record> = [
        value,
        ....,
        value
    ]

## Структура сообщения ядра
<a name="event"></a>

    {
        EVT:{
            evt: {@link String},
            obj: {@link String},
            result: <time> | <instantmsg> | <changed>
        }
    }

- __evt__ указывает на - тип сообщения и принимает одно из значений:

	- <tt>'time'</tt>			- текущее время ядра
	- <tt>'changed'</tt>		- изменение состояния конференции или оповещения
	- <tt>'instantmsg'</tt>	- сообщение чата конференции

- __obj__ - источник в VSP инициировавший сообщение:

	- <tt>'cd'</tt>		- диспетчер конференций
	- <tt>'conf'</tt>	- конференция
	- <tt>'nd'</tt>		- диспетчер оповещений
	- <tt>'notify'</tt>	- оповещение
	- <tt>'time'</tt>	- текущее время ядра

- __result__ может быть одной из структур в зависимости от типа сообщения (<tt>EVT.evt</tt>)

	- __[&lt;time&gt;](#eventTime)__ - структура с текущим временем ядра для <tt>EVT.evt = 'time'</tt>

	- __[&lt;instantmsg&gt;](#eventInstantMsg)__ - структура с сообщением чата конференции  для <tt>EVT.evt = 'instantmsg'</tt>

	- __&lt;changed&gt;__ для <tt>EVT.evt = 'changed'</tt> является одной из структур
[&lt;confchanged&gt;](#eventChangedConf) или [&lt;notifychanged&gt;](#eventChangedNotify)
в зависимости от вида источника в VSP (<tt>EVT.obj</tt>)


##### &lt;time&gt; - структура с текущим временем ядра
<a name="eventTime"></a>

    <time> =
    time: {
        t: {@link Number}
    }

- __t__ - текущее время ядра ( в секундах от 01.01.1970 )


##### &lt;instantmsg&gt; - структура с сообщением чата конференции
<a name="eventInstantMsg"></a>

    <instantmsg> =
    instantmsg: {
        ClusterID: {@link Number},
        ID: {@link Number},
        username: {@link String},
        msg: {@link String},
        color: {@link Number},
        time: {@link Number}
    }

- __ClusterID__ содержит ID кластера

- __ID__ содержит ID конференции

- __username__ - имя пользователя, отправившего сообщение

- __msg__ - текст сообщения

- __color__ - цвет для вывода сообщения

- __time__ - время отправки сообщения ( в секундах от 01.01.1970 )


##### &lt;confchanged&gt;
<a name="eventChangedConf"></a>

    <confchanged> = {
        ClusterID: {@link Number}, - ID кластера
        ID: {@link Number}, - ID конференции
        confdata: <confdata>, - (optional) данные конференции, если были изменения по конференции
        delParties: (optional)
            {
                ID: {@link Number}, - ID участника
                index: {@link Number} - index участника
            }
        addParties: <confpartydata>, - (optional) добавленные участники
        updParties: <confpartydata>, - (optional) измененные участники
    }

##### &lt;notifychanged&gt;
<a name="eventChangedNotify"></a>

            <notifychanged> = {
                ClusterID: {@link Number}, - ID кластера
                ID: {@link Number}, - ID оповещения
			       notifydata: <notifydata>, - (optional) данные оповещения, если были изменения по оповещению
			       delParties: (optional)
			           {
			               ID: {@link Number}, - ID участника
			               index: {@link Number} - index участника
			           }
			       addParties: <notifypartydata>, - (optional) добавленные участники
			       updParties: <notifypartydata>, - (optional) измененные участники
            }

##### &lt;confdata&gt;
    <confdata> Runtime данные конференции
    {
        "ClusterID":int,
        "ID":int,
        "State":int,
        "SubState":int,
        "StartWay":int,
        "StarterID":int,
        "CHNeeded":int,
        "CHUsed":int,
        "DSPNeeded":int,
        "DSPUsed":int,
        "ActionsMask":int,
        "NP_MAX_CH":int,
        "NP_MAX_DSP":int,
        "DIAL_POINT_ID":int,
    }

##### &lt;partydata&gt;
    <partydata> Runtime данные участника конференции
    {
        "PARTY_ID":int,
        "Index":int,
        "OldIndex":int, --[Присутствует только в <confchanged>.<updParties>. При обработке изменившихся участников – поиск осуществлять по OldIndex, подставлять Index
        "layer":int,
        "State":int,
        "SubState":int,
        "bMicOn":int,
        "bAckWord":int,
        "bInterrupter":int,
        "bInterrupted":int,
        "bActive":int,
        "ConnectWay":int,
        "DialPhoneAttempt":int,
        "DialPartyCycle":int,
        "bDirectCNC":int,
        "IS_ENABLED":int,
        "bMicOnOnStart":int,
        "ActionsMask":int,
        --------------------------------------------[Далее, если "layer">1
        "CurrentAddr":str,
        --------------------------------------------[Далее, если "layer">2
        "NAME":str,
        "DESCRIPTION":str,
        "SUBSCRIBER_ID":int,
        "ONCE_SGROUP_ID":int,
        "B_ANONYMOUS":int,
        "bDial":int,
        "bCanComeInFromPhone":int,
        "SubscriberAttemptsNumber":int,
        "PhoneAttemptsNumber":int
    }

##### &lt;partydata&gt;
    <partydata> Runtime данные участника оповещения
    {
        "PARTY_ID":int,
        "NAME":str,
        "DESCRIPTION":str,
        "SUBSCRIBER_ID":int,
        "State":int,
        "SubState":int,
        "IS_ENABLED":int,
        "ONCE_SGROUP_ID":int,
        "CurrentAddr":str,
        "PhoneAttemptsCount":int,
        "SeanceCycle":int,
        "SubscriberAttemptsNumber":int,
        "PhoneAttemptsNumber":int,
        "ActionsMask":int
    }


