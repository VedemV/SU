# Структура сообщения ядра

    {
        EVT:{
            evt: {@link String},	- тип сообщения
            obj: {@link String},	- источник в VSP инициировавший сообщение
            result: <time> | <instantmsg> | <changed>
        }
    }
Параметр <tt>evt</tt> принимает одно из значений:

- "time"			- текущее время ядра
- "changed"		- изменение состояния конференции или оповещения
- "instantmsg"	- сообщение чата конференции

Параметр <tt>obj</tt> источник в VSP:

- cd		- диспетчер конференций
- conf	- конференция
- nd		- диспетчер оповещений
- notify	- оповещение
- time	- текущее время ядра

#### &lt;time&gt; - структура с текущим временем ядра
    <time> =
    time: {
        t: {@link Number} - текущее время ядра ( в секундах от 01.01.1970 )
    }

#### &lt;instantmsg&gt; - структура с сообщением чата конференции
    <instantmsg> =
    instantmsg: {
        ClusterID: {@link Number}, - ID кластера
        ID: {@link Number}, - ID конференции
        username: {@link String}, - имя пользователя, отправившего сообщение
        msg: {@link String}, - текст сообщения
        color: {@link Number}, - цвет для вывода сообщения
        time: {@link Number}, - время отправки сообщения ( в секундах от 01.01.1970 )
    }

#### &lt;changed&gt;
    <changed> = <confchanged> | <notifychanged>

#### &lt;confchanged&gt;
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
