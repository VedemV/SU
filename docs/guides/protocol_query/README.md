# Структура запроса или контролируемой команды.

Протокол <tt>"PalladaWSData"</tt> предполагает обмен в формате JSON с поддержкой
следующих структур данных:

    {
        [<base>](#query.base), - обязательные параметры запроса
        <obj>,  - aдресат в VSP, отсутствует при <base>.cmd = 'query'|'fdownload'|'fupload'
        <query>, - (optional) структура для запросов при <base>.cmd = 'query'
        <fdownload> - (optional) структура для получения файлов при <base>.cmd = 'fdownload'
        <fupload> - (optional) структура для передачи файлов при <base>.cmd = 'fupload'
        <params> - (optional) параметры команды VSP при <base>.cmd != 'query'|'fdownload'|'fupload'
    }
, где
#### <a name='query.base'>&lt;base&gt;</a> - обязательные параметры запроса:
    <base> =
        dst : {@link Pallada.lib.Kernel#defaultDST},   - (optional) подсистема в которую передается запрос
        lng : {@link Pallada.lib.Kernel#defaultLNG},   - (optional) локализация сообщений ядра
        seq : {{@link Number}},                       - номер транзакции или 0 для команд без транзакции
        cmd : {{@link String}},                       - 'query'|'fdownload'|'fupload'|"команда VSP"
Параметр <tt>cmd</tt> принимает одно из значений:

- 'query' - указывает, что будет выполняться запрос к базе данных
- 'fdownload' - указывает, что принимается от ядра порция данных в формате <tt>base64</tt>
- 'fupload' - указывает, что передается ядру порция данных в формате <tt>base64</tt>
- иначе будет выполняться указанная команда VSP в одном из адресатов, заданных в <tt>&lt;obj&gt;</tt>

#### &lt;obj&gt; - адресат в VSP
Параметр необходим, когда <tt>&lt;base&gt;.cmd</tt> является командой VSP.
Параметр принимает одно из значений:

- cd - диспетчер конференций
- conf - Конференция
- nd - диспетчер оповещений
- notify - оповещение

#### &lt;query&gt; - структура для запросов, существует только при <tt>cmd === 'query'</tt> :
    <query> =
    query: {
	       name: {{@link String}}	- имя запроса
	       <params>			- параметры запроса
    }

#### &lt;fdownload&gt; - структура для получения файлов, существует только при <tt>cmd === 'fdownload'</tt> :
    <fdownload> =
    fdownload: {
        fSession: {{@link String}}	- ID сессии
    }

#### &lt;fupload&gt; - структура для передачи файлов, существует только при <tt>cmd === 'fupload'</tt> :
    <fupload> =
    fupload: {
        fSession: {{@link String}}	- ID сессии
        dataB64: {{@link String}}	- Данные base64 encoded
    }

#### &lt;params&gt; - параметры команды VSP или запроса
    <params> =
    params: {
        param_name: value
        ...
        param_name: value
    }
