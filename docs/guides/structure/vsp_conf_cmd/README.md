# Команды VSP для конференций

## Диспетчер конференций

### Константы результата загрузки конференции
<a name="loading_result"></a>

&lt;LoadingResult&gt;

<table>
<tr><th>Код ошибки</th><th>Значение</th><th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>LROkLoaded</td>				<td>0</td>			<td>Ok</td></tr>
<tr><td>LROkConnected</td>			<td>1</td>			<td>Ok</td></tr>
<tr><td>LRErrAlreadyConnected</td>	<td>2</td>			<td>Ok</td></tr>
<tr><td>LRErrConfNotFound</td>		<td>3</td>			<td>Ok</td></tr>
<tr><td>LRErrDeny</td>				<td>4</td>			<td>Ok</td></tr>
</table>

### cd.loadlist - Получение списка загруженных конференций
<a name="cd.loadlist"></a>

##### Команда:

	{
		"dst": "vsp",				// {@link String}
		"lng": "ru"|"en"			// {@link String}
		"seq": int,					// {@link Number}
		"cmd": "loadlist",			// {@link String}
		"obj": "cd",				// {@link String}
		"params":{
			"ClusterID": int|null	// {@link Number}
		}
	}

> "dst", "lng", "seq", "cmd" - [обязательные данные команды][1]
>
> "obj" - [адресат в VSP][2]
>
> "params" - [структура параметров][3]
>
> _При ClusterID=0 для администратора системы выдаются конференции всех кластеров_
>
>

##### Ответ нестандартный:

	{
		"ANSW": {
			"cmd": "loadlist",
			"seq": int,
			"obj": "cd",
			"result":{
				"code": 0,
				"list": [
					<confdata>,
					…
					<confdata>
				]
			}
		}
	}

> "cmd", "seq", "obj" - [обязательные данные ответа на команду][4]
>
> "result" - [результат выполнения команды][5], дополнительно содержит массив
> "list" с блоками "confdata" данных конферненций
>
>

&gt;confdata&lt; -


### cd.load - Загрузка конференции

Команда:
	{
		"dst":	"vsp",				// {@link String}
		"lng":	"ru"|"en"			// {@link String}
		"seq":	int,				// {@link Number}
		"cmd":	"load",				// {@link String}
		"obj":	"cd",				// {@link String}
		"params":{
			"ClusterID":	int		// {@link Number}
			"SchemeID":		int		// {@link Number}
		}
	}

Ответ нестандартный:

	{
		"ANSW":{
			"cmd":	"load",
			"seq":	int,
			"obj":	"cd",
			"result":{
				"code":			<LoadingResult>,
				"bControl":		1|0,
				"SVPartyID":	int,
				"SVPartyIndex":	int,
				"confdata":		<confdata>,
				"parties":[
					<partydata>,
					…
					<partydata>
				]
			}
		}
	}



[1]: #!/guide/protocol-section-cmd_request
[2]: #!/guide/protocol-section-cmd_request_obj
[3]: #!/guide/protocol-section-cmd_request_params
[4]: #!/guide/protocol-section-cmd_answer
[5]: #!/guide/protocol-cmd_answer_result
