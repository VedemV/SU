
# Сообщения VSP

## Диспетчер конференций

## Конференция


### conf.changed
<a name="conf_changed"></a>
#### Изменение конференции

	{
		"EVT":{
			"evt": "changed",
			"obj":"conf",
			"result":{
				<confchanged>
			}
		}
	}


### conf.instantmsg

#### Получение мгновенных сообщений

	{
		"EVT":{
			"evt": "instantmsg",
			"obj":"conf",
			" result ":{
				"ClusterID": {{@link Number}},
				"ID": {{@link Number}},
				"username": {{@link String}},
				"msg": {{@link String}},
				"color": {{@link Number}},
				"time": {{@link Number}}
			}
		}
	}

- __EVT.evt__, __EVT.obj__ - [обязательные поля сообщения][1]
- __EVT.result__ - структура с сообщением чата конференции
	- __ClusterID__ {{@link Number}} содержит ID кластера
	- __ID__ {{@link Number}} содержит ID конференции
	- __username__ {{@link String}} - имя пользователя, отправившего сообщение
	- __msg__ {{@link String}} - текст сообщения
	- __color__ {{@link Number}} - цвет для вывода сообщения
	- __time__ {{@link Number}} - время отправки сообщения ( в секундах от 01.01.1970 )



### conf.webrtc.servdesc

#### Адрес TURN сервера, имя и пароль для входа

	{
		"EVT":{
			"obj":"conf",
			"evt":"webrtc",
			"evttype":"servdesc",
			"result":{
				"ClusterID": {{@link Number}},
				"ID": {{@link Number}},
				"PartyID": {{@link Number}},
				"EvtData":{
					"serveraddr": {{@link String}},
					"username": {{@link String}},
					"credential": {{@link String}}
				}
			}
		}
	}

, где

- __EVT.evt__, __EVT.obj__ - [обязательные поля сообщения][1]
- __EVT.evttype__ - [тип сообщения для WebRTC][1]
- __EVT.result__ -[структура runtime данных для соединения браузера с ядром по WebRTC][2]
- __EVT.result.EvtData.serveraddr__ {{@link String}} - адрес TURN сервера
- __EVT.result.EvtData.username__ {{@link String}} - имя для входа
- __EVT.result.EvtData.credential__ {{@link String}} - пароль для входа


### conf.webrtc.servufrag

#### Имя и пароль для входа на STUN, порт, fingerprint

	{
		"EVT":{
			"obj":"conf",
			"evt":"webrtc",
			"evttype":"servufrag",
			"result":{
				"ClusterID": {{@link Number}},
				"ID": {{@link Number}},
				"PartyID": {{@link Number}},
				"EvtData":{
					"ufrag": {{@link String}},
					"pwd": {{@link String}},
					"fingerprint": {{@link String}},
					"port": {{@link Number}}
				}
			}
		}
	}

, где

- __EVT.evt__, __EVT.obj__ - [обязательные поля сообщения][1]
- __EVT.evttype__ - [тип сообщения для WebRTC][1]
- __EVT.result__ -[структура runtime данных для соединения браузера с ядром по WebRTC][2]
- __EVT.result.EvtData.ufrag__ {{@link String}} - TODO: ???
- __EVT.result.EvtData.pwd__ {{@link String}} - TODO: ???
- __EVT.result.EvtData.fingerprint__ {{@link String}} - TODO: ???
- __EVT.result.EvtData.port__ {{@link Number}} - TODO: ???

### conf.webrtc.Disconnected

#### Завершение сеанса WebRTC

	{
		"EVT":{
			"obj":"conf",
			"evt":"webrtc",
			"evttype":"Disconnected",
			"result":{
				"ClusterID": {{@link Number}},
				"ID": {{@link Number}},
				"PartyID": {{@link Number}}
			}
		}
	}

, где

- __EVT.evt__, __EVT.obj__ - [обязательные поля сообщения][1]
- __EVT.evttype__ - [тип сообщения для WebRTC][1]
- __EVT.result__ -[структура runtime данных для соединения браузера с ядром по WebRTC][2]


## Диспетчер оповещений

## Оповещение

## Таймер

### timer.time

#### Текущее время ядра

	{
		"EVT":{
			"evt": "time",
			"obj":"timer",
			"result":{
				"t": {{@link Number}}
			}
		}
	}

, где

- __EVT.evt__, __EVT.obj__, __EVT.result__ - [обязательные поля сообщения][1]
- __EVT.result.t__ {{@link Number}} - текущее время ядра в секундах от 01.01.1970



[1]: #!/guide/protocol-section-event
[2]: #!/guide/protocol-section-event_webrtc

