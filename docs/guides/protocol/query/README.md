
# Протокол обмена "PalladaWSData".

Протокол <tt>"PalladaWSData"</tt> предполагает обмен в формате JSON с поддержкой
следующих структур данных:

- [структура запроса или контролируемой команды](#query)
- [структура ответа ядра на запрос или контролируемую команду](#answer)
- [структура сообщения ядра](#event)

## Структура запроса или контролируемой команды.
<a name="query"></a>

- [&lt;base&gt;](#queryBase), - обязательные параметры запроса
- [&lt;obj&gt;](#queryObj),  - (optional) aдресат в VSP
- [&lt;query&gt;](#queryQuery), - (optional) структура для запросов
- [&lt;fdownload&gt;](#queryDownload) - (optional) структура для получения файлов при <base>.cmd = 'fdownload'
- [&lt;fupload&gt;](#queryUpload) - (optional) структура для передачи файлов при <base>.cmd = 'fupload'
- [&lt;params&gt;](#queryParams) - (optional) параметры команды VSP при <base>.cmd != 'query'|'fdownload'|'fupload'
, где

#### &lt;base&gt; - обязательные параметры запроса:
<a name="queryBase"></a>

    <base> =
        dst : {{@link String}},	- (optional) подсистема в которую передается запрос
        lng : {{@link String}},	- (optional) локализация сообщений ядра
        seq : {{@link Number}},	- номер транзакции
        cmd : {{@link String}},	- команда

- __dst__ - подсистема в которую передается запрос, равен 'std' или 'vsp'.
Если параметр не указан, предполагается значение 'std'.

<i>При использовании {@link Pallada.lib.Kernel} значение устанавливается
из {@link Pallada.lib.Kernel#defaultDST}.</i>

- __lng__ - локализация сообщений ядра, принимает значения двухбуквенного кода локализации ('ru' или 'en').
Если параметр не указан, предполагается значение 'ru'.

<i>При использовании {@link Pallada.lib.Kernel} значение устанавливается
из {@link Pallada.lib.Kernel#defaultLNG}.</i>

- __seq__ - номер транзакции или 0 для команд без транзакции.

<i>При использовании {@link Pallada.lib.Kernel} очередной номер транзакции
может быть получен вызовом {@link Pallada.lib.Kernel#getTransacionNo}.
При выполнении запросов методами {@link Pallada.lib.Kernel#sendControlledComand}
или {@link Pallada.lib.Kernel#request} с неуказанным параметром,
значение будет установлено автоматически.</i>

- __cmd__ - параметр принимает одно из значений:
	- <tt>'query'</tt> - указывает, что будет выполняться запрос к базе данных и в структуре будет присутствовать блок [&lt;query&gt;](#queryQuery)
	- <tt>'fdownload'</tt> - указывает, что принимается от ядра порция данных в формате <tt>base64</tt>, в структуре должен быть блок [&lt;fdownload&gt;](#queryDownload)
	- <tt>'fupload'</tt> - указывает, что передается ядру порция данных в формате <tt>base64</tt>, в структуре должен быть блок [&lt;fupload&gt;](#queryUpload)
	- иначе будет выполняться указанная команда VSP в одном из адресатов, заданных в <tt>[&lt;obj&gt;](#queryObj)</tt>. При необходимости в структуре может быть блок [&lt;params&gt;](#queryParams)

#### &lt;obj&gt; - адресат в VSP
<a name="queryObj"></a>
Параметр необходим, когда <tt>[&lt;base&gt;](#queryBase).cmd</tt> является командой VSP
и отсутствует при <tt>[&lt;base&gt;](#queryBase).cmd = 'query'|'fdownload'|'fupload'</tt>.

	obj : {{@link String}}

Параметр принимает одно из значений:

- <tt>'cd'</tt> - диспетчер конференций
- <tt>'conf'</tt> - Конференция
- <tt>'nd'</tt> - диспетчер оповещений
- <tt>'notify'</tt> - оповещение

#### &lt;query&gt; - структура для запросов
<a name="queryQuery"></a>
Существует только при <tt>[&lt;base&gt;](#queryBase).cmd = 'query'</tt>

	<query> =
		query: {
			name: {{@link String}},
			<params>
		}

- __name__ - имя запроса
- __[&lt;params&gt;](#queryParams)__ параметры запроса

Примерный вид:


#### &lt;fdownload&gt; - структура для получения файлов
<a name="queryDownload"></a>
Существует только при <tt>[&lt;base&gt;](#queryBase).cmd = 'fdownload'</tt>:

    <fdownload> =
    fdownload: {
        fSession: {{@link String}}	- ID сессии
    }

#### &lt;fupload&gt; - структура для передачи файлов
<a name="queryUpload"></a>
Существует только при <tt>[&lt;base&gt;](#queryBase).cmd = 'fupload'</tt>:

    <fupload> =
    fupload: {
        fSession: {{@link String}}	- ID сессии
        dataB64: {{@link String}}	- Данные base64 encoded
    }

#### &lt;params&gt; - структура параметров
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

#### &lt;result&gt; - результат выполнения запроса
<a name="answResult"></a>

    <result> =
    result: {
        code: {@link Number},	// код результата выполнения команды
        class: {@link String},	// (optional) класс ошибки
        text: {@link String},	// (optional) текст сообщения об ошибке, выданный ядром
    }

#### &lt;fdefs&gt; - описание полей данных
<a name="answFdefs"></a>
Является массивом, содержащим блоки [&lt;fdef&gt;](#answFdef) с описанием полей данных

    <fdefs> =
    fdefs: [
        <fdef>,
        ....,
        <fdef>
    ]

#### &lt;fdef&gt; - структура описания поля данных
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

#### &lt;records&gt; - массив записей данных
<a name="answRecords"></a>

Содержит блоки [&lt;record&gt;](#answRecord) строк данных

    <records> =
    records: [
        <record>,
        ....,
        <record>
    ]

#### &lt;record&gt; - строка данных
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


#### &lt;time&gt; - структура с текущим временем ядра
<a name="eventTime"></a>

    <time> =
    time: {
        t: {@link Number}
    }

- __t__ - текущее время ядра ( в секундах от 01.01.1970 )


#### &lt;instantmsg&gt; - структура с сообщением чата конференции
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


#### &lt;confchanged&gt;
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

#### &lt;notifychanged&gt;
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

#### &lt;confdata&gt;
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

#### &lt;partydata&gt;
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

#### &lt;partydata&gt;
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

## Пример запроса

#### Запрос

	{
		"cmd":"query",
		"seq": 1,
		"query":{
			"name": "qThreads",
			"params":{
				" iHOST_ID":"1",
				"iPARENT_THREAD_ID":"2"
			}
		}
	}

#### Ответ

	{
		"ANSW":{
			“cmd”:"query",
			“seq”:1,
			“result”:{
				“class”:”db”,
				“code”:0
			},
			“fdefs”:[
				{
					“name”:”HOST_ID”,
					“type”:”i”
				},
				{
					“name”:”ID”,
					“type”:”i”
				},
				{
					“name”:”TYPE_ID”,
					“type”:”i”
				},
				{
					“name”:”NAME”,
					“type”:”s”
					“size”:50
				},
				{
					“name”:”PARENT_THREAD_ID”,
					“type”:”i”
				},
				{
					“name”:”IS_ENABLED”,
					“type”:”i”
				},
				{
					“name”:”ORDER_NO”,
					“type”:”i”
				}
			],
			“records”:[
				[
					1,
					3,
					3,
					ISEServer,
					2,
					1,
					1
				],
				[
					"1",
					"4",
					"4",
					"DBThread",
					"2",
					"1",
					"2"
				]
			]
		}
	}

