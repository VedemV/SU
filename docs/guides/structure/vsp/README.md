# Запросы VSP

[A](#leter_a) [B](#leter_b) [C](#leter_c) [D](#leter_d) [E](#leter_e) [F](#leter_f)
[G](#leter_g) [H](#leter_h) [I](#leter_i) [J](#leter_j) [K](#leter_k) [L](#leter_l)
[M](#leter_m) [N](#leter_n) [O](#leter_o) [P](#leter_p) [Q](#leter_q) [R](#leter_r)
[S](#leter_s) [T](#leter_t) [U](#leter_u) [V](#leter_v) [W](#leter_w) [X](#leter_x)
[Y](#leter_y) [Z](#leter_z)

## Коды возврата запросов VSP

<table>
<tr><th>Определение</th>					<th>Значение</th>	<th>Описание</th></tr>
<tr><td>VSPDBEC_INT_LOGIN_USR_OK</td>		<td>2</td>			<td><b>Login Ok (User)</b></td></tr>
<tr><td>VSPDBEC_INT_LOGIN_ADM_OK</td>		<td>3</td>			<td><b>Login Ok (Admin)</b></td></tr>
<tr><td>VSPDBEC_INT_LOGIN_ERROR</td>		<td>4</td>			<td>Login Error</td></tr>
<tr><td>VSPDBEC_INT_PRIVILEGES_ERR</td>		<td>5</td>			<td>Login has low privelegies</td></tr>
<tr><td>VSPDBEC_DB</td>						<td>6</td>			<td>Query error</td></tr>
<tr><td>VSPDBEC_INV_PARAMS</td>				<td>7</td>			<td>Invalid parameters</td></tr>
<tr><td>VSPDBEC_INCOMPATIBLE_PARAMS</td>	<td>11</td>			<td>Incompatible params</td></tr>
<tr><td>VSPDBEC_INT_LOGIN_SA_OK</td>		<td>12</td>			<td><b>Login Ok (Sysadm)</b></td></tr>
<tr><td>VSPDBEC_INT_LOGIN_PIN_OK</td>		<td>13</td>			<td><b>Login Ok (PIN)</b></td></tr>
<tr><td>VSPDBEC_LICENSE_ERR</td>			<td>14</td>			<td>License violation</td></tr>
<tr><td>VSPDBEC_INT_LOGIN_SA_CLGR_OK</td>	<td>15</td>			<td><b>Login Ok (Sysadm администратор)</b></td></tr>
<tr><td>VSPDBEC_INT_LOGIN_INV_METHOD</td>	<td>16</td>			<td>Web/Client login method denied</td></tr>
<tr><td>VSPDBEC_DEMO</td>					<td>17</td>			<td><b><i>Demo stend. Lock update</i></b></td></tr>
</table>

Значения с кодами 2, 3, 12, 13, 15 являются результатом успешного выполнения [авторизации](#q_cplxlogin).

Значение с кодом 17 считается успешным, но с необходимостью вывода сообщения об ограниченном доступе в демо-режиме.

## Передача параметра CLUSTER_ID в VSP

В настоящий момент, в VSP все запросы должны передавть параметр "<tt>i&#95;&#95;CLUSTER_ID</tt>"
равный 0 или конкретному значению при входе пользователя как
системный администратор или администратор группы кластеров, во всех остальных
случаях параметр "<tt>i&#95;&#95;CLUSTER_ID</tt>" не передается.
Управление передачей параметра "<tt>i&#95;&#95;CLUSTER_ID</tt>" в зависимости от прав пользователя
выполняется в методе {@link Pallada.store.Custom#method-load}.

<a name="note-type-login"></a>
Существует зависимость, когда паметр должен быть передан
всегда или запрос может выполняться только с правами
администратора, при которой могут возникать ошибки
[VSPDBEC_INT_PRIVILEGES_ERR](#Коды-возврата-запросов-vsp) или
[VSPDBEC_INV_PARAMS](#Коды-возврата-запросов-vsp).
Эти ошибки являются фактом неверного разрешения на отображение элементов экрана,
ошибкой условий выполнения запросов в зависимости от результата авторизации.

## Запросы VSP

<a name="leter_a"><h3 style="color: #66AB16;">A</h3></a>
<a name="leter_b"><h3 style="color: #66AB16;">B</h3></a>
<a name="leter_c"><h3 style="color: #66AB16;">C</h3></a>

### STMTSelCluster
Получение информации по кластеру для:

- входа по ПИН,
- пользователя
- администратора кластера.

Выполнение запроса зависит от [типа пользователя](#!/guide/structure_vsp-section-note-type-login):
запрос никогда не должен выполнятся с правами администратора.

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>										<td>int</td>		<td>Идентификатор</td></tr>
<tr><td>NAME</td>									<td>char(50)</td>	<td>Название</td></tr>
<tr><td>CONF_DEFAULT_TABLE_ID</td>					<td>int</td>		<td>ID шаблона конференций</td></tr>
<tr><td>NOTIFY_DEFAULT_TABLE_ID</td>				<td>int</td>		<td>ID шаблона оповещений</td></tr>
<tr><td>IDENTIFY_CODE</td>							<td>char(50)</td>	<td>Код идентификации</td></tr>
<tr><td>CONTRACT_NO</td>							<td>char(50)</td>	<td>Номер договора</td></tr>
<tr><td>CONF_DEFAULTS_TABLES_NAME</td>				<td>char(50)</td>	<td>Название шаблона конференций</td></tr>
<tr><td>NOTIFY_DEFAULTS_TABLES_NAME</td>			<td>char(50)</td>	<td>Название шаблона оповещений</td></tr>
<tr><td>NP_DEF_MAX_CH</td>							<td>int</td>		<td>Ограничение на максимальное количество каналов</td></tr>
<tr><td>NP_DEF_MAX_DSP</td>							<td>int</td>		<td>Ограничение на максимальное количество DSP</td></tr>
<tr><td>NP_DEF_MAX_TIME</td>						<td>int</td>		<td>Ограничение на максимальную продолжительность конференции</td></tr>
<tr><td>P_CONFPLAN_DEPTH</td>						<td>int</td>		<td>Ограничение на глубину планирования</td></tr>
<tr><td>WEB_ACCESS</td>								<td>int</td>		<td>Разрешения доступа WEB клиентом</td></tr>
<tr><td>RAW_ACCESS</td>								<td>int</td>		<td>Разрешения доступа клиентом-приложением</td></tr>
</table>

### STMT_SA_SelClusters
Получение информации по кластерам для:

- администратора системы
- администратора группы кластеров.

Выполнение запроса зависит от [типа пользователя](#!/guide/structure_vsp-section-note-type-login):
запрос всегда должен выполнятся с правами администратора

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>										<td>int</td>		<td>Идентификатор</td></tr>
<tr><td>NAME</td>									<td>char(50)</td>	<td>Название</td></tr>
<tr><td>CONF_DEFAULT_TABLE_ID</td>					<td>int</td>		<td>ID шаблона конференций</td></tr>
<tr><td>NOTIFY_DEFAULT_TABLE_ID</td>				<td>int</td>		<td>ID шаблона оповещений</td></tr>
<tr><td>IDENTIFY_CODE</td>							<td>char(50)</td>	<td>Код идентификации</td></tr>
<tr><td>CONTRACT_NO</td>							<td>char(50)</td>	<td>Номер договора</td></tr>
<tr><td>CONF_DEFAULTS_TABLES_NAME</td>				<td>char(50)</td>	<td>Название шаблона конференций</td></tr>
<tr><td>NOTIFY_DEFAULTS_TABLES_NAME</td>			<td>char(50)</td>	<td>Название шаблона оповещений</td></tr>
<tr><td>NP_DEF_MAX_CH</td>							<td>int</td>		<td>Ограничение на максимальное количество каналов</td></tr>
<tr><td>NP_DEF_MAX_DSP</td>							<td>int</td>		<td>Ограничение на максимальное количество DSP</td></tr>
<tr><td>NP_DEF_MAX_TIME</td>						<td>int</td>		<td>Ограничение на максимальную продолжительность конференции</td></tr>
<tr><td>P_CONFPLAN_DEPTH</td>						<td>int</td>		<td>Ограничение на глубину планирования</td></tr>
<tr><td>WEB_ACCESS</td>								<td>int</td>		<td>Разрешения доступа WEB клиентом</td></tr>
<tr><td>RAW_ACCESS</td>								<td>int</td>		<td>Разрешения доступа клиентом-приложением</td></tr>
</table>

### STMTSelConfSchemes
Получение информации по схемам конференций.


<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td><a href="#!/guide/structure_vsp-section-передача-параметра-cluster_id-в-vsp">i__CLUSTER_ID</a></td>
		<td>int</td>
		<td>ID кластера</td></tr>
<tr><td>iForModify</td>
		<td>int</td>
		<td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>CLUSTER_ID</td>								<td>int</td>		<td>Идентификатор кластера</td></tr>
<tr><td>ID</td>										<td>int</td>		<td>Идентификатор</td></tr>
<tr><td>NAME</td>									<td>char(50)</td>	<td>Название</td></tr>
<tr><td>IDENTIFY_CODE</td>							<td>char(50)</td>	<td>Код идентификации</td></tr>
<tr><td>NP_MAX_CH</td>								<td>int</td>		<td>Ограничение на максимальное количество каналов</td></tr>
<tr><td>NP_MAX_DSP</td>								<td>int</td>		<td>Ограничение на максимальное количество DSP</td></tr>
<tr><td>NP_MAX_TIME</td>							<td>int</td>		<td>Ограничение на максимальную продолжительность конференции</td></tr>
<tr><td>CAN_CONTROL</td>							<td>int</td>		<td>Разрешено управление конференцией</td></tr>
<tr><td>CAN_MODIFY</td>								<td>int</td>		<td></td></tr>
</table>

<a name="leter_d"><h3 style="color: #66AB16;">D</h3></a>
<a name="leter_e"><h3 style="color: #66AB16;">E</h3></a>

### STMTSelEasyChoiceList
Получение информации из глобального справочника.

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>GROUP_ID</td>	<td>int</td>		<td>ID справочника</td></tr>
<tr><td>ID</td>			<td>int</td>		<td>Идентификатор</td></tr>
<tr><td>NAME</td>		<td>char(50)</td>	<td>Значение</td></tr>
</table>

<a name="leter_f"><h3 style="color: #66AB16;">F</h3></a>
<a name="leter_g"><h3 style="color: #66AB16;">G</h3></a>

### STMTSelGroupsList
Список групп абонентов

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td><a href="#!/guide/structure_vsp-section-передача-параметра-cluster_id-в-vsp">i__CLUSTER_ID</a></td>
		<td>int</td>	<td>ID кластера</td></tr>
<tr><td>iSUBSCRIBER_ID</td>
		<td>int</td>	<td>ID участника или null для получения полного списка</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>CLUSTER_ID</td>	<td>int</td>			<td>ID кластера</td></tr>
<tr><td>ID</td>			<td>int</td>			<td>ID</td></tr>
<tr><td>NAME</td>		<td>char(50)</td>		<td>Название группы</td></tr>
</table>

#### STMTDelSGroups
Удаление группы абонентов

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>ip3</td>				<td>int</td>	<td>ID группы</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

#### STMTInsSGroups
Добавление группы абонентов

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>sNAME</td>				<td>char()</td>	<td>Название</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>	<td>int</td>	<td>ID группы</td></tr>
</table>

#### STMTUpdSGroups
Изменение группы абонентов

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>iID</td>				<td>int</td>	<td>ID группы</td></tr>
<tr><td>sNAME</td>				<td>char()</td>	<td>Название</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

### STMTSelGroupSu
Список абонентов группы кластера

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>iGROUP_ID</td>			<td>int</td>	<td>ID группы</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>CLUSTER_ID</td>	<td>int</td>			<td>ID кластера</td></tr>
<tr><td>ID</td>			<td>int</td>			<td>ID</td></tr>
<tr><td>NAME</td>		<td>char(50)</td>		<td>Название группы</td></tr>
<tr><td>ORDER_NO</td>	<td>int</td>			<td>Порядковый номер</td></tr>
</table>

#### STMTDelSGroupSu
Удаление абонента группы кластера

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>ip3</td>				<td>int</td>	<td>ID группы</td></tr>
<tr><td>ip4</td>				<td>int</td>	<td>ID абонента</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

#### STMTInsSGroupSu
Добавление абонента группы кластера

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>iSGROUP_ID</td>			<td>int</td>	<td>ID группы</td></tr>
<tr><td>iSUBSCRIBER_ID</td>		<td>int</td>	<td>ID абонента</td></tr>
<tr><td>iORDER_NO</td>			<td>int</td>	<td>Порядковый номер</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

#### STMTUpdSGroupSuOrder
Изменение позиции абонента группы кластера в списке

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</a></td>	<td>int</td>	<td>ID кластера</td></tr>
<tr><td>iSGROUP_ID</td>			<td>int</td>	<td>ID группы</td></tr>
<tr><td>iSUBSCRIBER_ID</td>		<td>int</td>	<td>ID абонента</td></tr>
<tr><td>iFORWARDDIRECTION</td>	<td>int</td>	<td>Направление сдвига</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

<a name="leter_h"><h3 style="color: #66AB16;">H</h3></a>
<a name="leter_i"><h3 style="color: #66AB16;">I</h3></a>
<a name="leter_j"><h3 style="color: #66AB16;">J</h3></a>
<a name="leter_k"><h3 style="color: #66AB16;">K</h3></a>
<a name="leter_l"><h3 style="color: #66AB16;">L</h3></a>

### STMTSelLicense
Получение информации о лицензии

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>LIC_CLISTERS</td>		<td>int</td>		<td>Количество кластеров</td></tr>
<tr><td>LIC_CONF_SCHEMES</td>	<td>int</td>		<td>Количество схем конференций<br><i>Немного устарело, проверять только отличие от «0»</i></td></tr>
<tr><td>LIC_NOTIFY_SCHEMES</td>	<td>int</td>		<td>Количество схем оповещений<br><i>Немного устарело, проверять только отличие от «0»</i></td></tr>
<tr><td>LIC_CONF_FLAGS</td>		<td>int</td>		<td>Флажки конференций. Битовая маска.</td></tr>
<tr><td>LIC_NOTIFY_FLAGS</td>	<td>int</td>		<td>Флажки оповещения. Битовая маска.</td></tr>
<tr><td>LIC_NOTIFY_MAIL</td>	<td>int</td>		<td>Разрешено оповещение по e-mail</td></tr>
<tr><td>LIC_CONF_SCREEN</td>	<td>int</td>		<td>Разрешена трансляция экранов</td></tr>
<tr><td>LIC_WEB</td>			<td>int</td>		<td>Разрешен доступ от Web.<br><i>Устарело. Всегда «1»</i></td></tr>
<tr><td>LIC_AUTOGEN_IC</td>		<td>int</td>		<td>Автогенерация  идентифицирующих кодов конференции и оповещения.</td></tr>
<tr><td>LIC_WEBRTC_READY</td>	<td>int</td>		<td>Разрешено использовать WebRTC.</td></tr>
</table>

### q_cplxLogin
Логин

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>sLogin</td>			<td>char(50)</td>		<td>Логин</td></tr>
<tr><td>sPassword</td>		<td>char(50)</td>		<td>Пароль</td></tr>
<tr><td>iWebLogin</td>		<td>int</td>			<td>Вход с WEB(1/0)</td></tr>
<tr><td>sSSOSID</td>		<td>char(64)</td>		<td>ID сессии SSO, выданный ядром на втором шаге SSO логина. Время жизни – 30 секунд<br>
При обычном логине д.б. NULL<br>
Особенности RETCODE при логине по SSO:<br>
VSPDBEC_INT_LOGIN_NO_SSO_ASSOC  – при отсутствии ассоциации<br>
VSPDBEC_INT_LOGIN_INV_SSO_SID – при отсутствии  сессии
</td></tr>
<tr><td>iSSO_CREATE_ASSOC</td>	<td>int</td>		<td>1/0 Создать ассоциацию между sLogin и UID.
UID вычисляется ядром по sSSOSID.<br>
Особенности RETCODE при создании ассоциации SSO:<br>
VSPDBEC_INT_LOGIN_SSO_VSP_ALREADY_ASSOCIATED<br>
Наш логин уже ассоциирован с другим UID.<br>
sSSOSID – остаётся жить<br>
VSPDBEC_INT_LOGIN_SSO_UID_ALREADY_ASSOCIATED<br>
UID уже ассоциирован с другим нашим логином<br>
sSSOSID – больше не живёт</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>RETCODE</td>		<td>int</td>			<td>ID (<a href="#!/guide/structure_vsp-section-Коды-возврата-запросов-vsp">См. коды возврата VSP</a>)</td></tr>
<tr><td>NAME</td>			<td>char(50)</td>		<td>Имя</td></tr>
</table>
В случае ошибочного логина – после выдачи результата, ядро разрывает соединение.

<a name="leter_m"><h3 style="color: #66AB16;">M</h3></a>
<a name="leter_n"><h3 style="color: #66AB16;">N</h3></a>
<a name="leter_o"><h3 style="color: #66AB16;">O</h3></a>
<a name="leter_p"><h3 style="color: #66AB16;">P</h3></a>

### STMT_SA_SelPPForCluster
Список типов телефонов кластера.

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>	<td>int</td>			<td>ID кластера</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>						<td>int</td>			<td>ID</td></tr>
<tr><td>NAME</td>					<td>char(50)</td>		<td>Имя</td></tr>
<tr><td>PURPOSE_ID</td>				<td>int</td>			<td>Используется в кластере</td></tr>
<tr><td>IS_EDITABLE_FOR_USER</td>	<td>boolean</td>		<td></td></tr>
</table>





<a name="leter_q"><h3 style="color: #66AB16;">Q</h3></a>
<a name="leter_r"><h3 style="color: #66AB16;">R</h3></a>
<a name="leter_s"><h3 style="color: #66AB16;">S</h3></a>

### STMTSelSubscribers
Список абонентов кластера


<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>	<td>int</td>			<td>ID кластера</td></tr>
<tr><td>sNAME</td>			<td>char()</td>			<td>Фильтр по имени абонента</td></tr>
<tr><td>sDESCRIPTION</td>	<td>char()</td>			<td>Фильтр</td></tr>
<tr><td>sSEMAIL</td>		<td>char()</td>			<td>Фильтр</td></tr>
<tr><td>sADDR</td>			<td>char()</td>			<td>Фильтр</td></tr>
<tr><td>iSGROUP_ID</td>		<td>int</td>			<td>Фильтр</td></tr>
<tr><td>iPURPOSE_ID</td>	<td>int</td>			<td>Фильтр</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>						<td>int</td>			<td>ID</td></tr>
<tr><td>NAME</td>					<td>char(50)</td>		<td>Имя</td></tr>
<tr><td>DESCRIPTION</td>			<td>char(255)</td>		<td>Описание</td></tr>
<tr><td>SLOGIN</td>					<td>char(50)</td>		<td></td></tr>
<tr><td>PIN</td>					<td>char(50)</td>		<td></td></tr>
<tr><td>SEMAIL</td>					<td>char(50)</td>		<td></td></tr>
<tr><td>PIN_ID</td>					<td>int</td>			<td></td></tr>
<tr><td>IS_ENABLED</td>				<td>boolean</td>		<td></td></tr>
<tr><td>CAN_LOGIN</td>				<td>boolean</td>		<td></td></tr>
<tr><td>IS_CLUSTERADMIN</td>		<td>boolean</td>		<td></td></tr>
</table>

#### STMTDelSubscriber
Удаление абонента кластера

<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>			<td>ID кластера</td></tr>
<tr><td>ip3</td>				<td>int</td>			<td>ID</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

#### STMTInsSubscriber
Добавление абонента кластера

<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>			<td>ID кластера</td></tr>
<tr><td>sNAME</td>				<td>char()</td>			<td>Имя абонента</td></tr>
<tr><td>sDESCRIPTION</td>		<td>char()</td>			<td>Описание</td></tr>
<tr><td>sSEMAIL</td>			<td>char()</td>			<td> </td></tr>
<tr><td>sSLOGIN</td>			<td>char()</td>			<td> </td></tr>
<tr><td>sSPASSWORD</td>			<td>char()</td>			<td> </td></tr>
<tr><td>iIS_ENABLED</td>		<td>int</td>			<td> </td></tr>
<tr><td>iIS_CLUSTERADMIN</td>	<td>int</td>			<td> </td></tr>
<tr><td>iB_SA_FULLACCESS</td>	<td>int</td>			<td> </td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>SUBSCRIBER_ID</td>	<td>int</td>			<td>ID</td></tr>
</table>


#### STMTUpdSubscriber
Изменение данных абонента кластера


<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>			<td>ID кластера</td></tr>
<tr><td>iSUBSCRIBER_ID</td>		<td>int</td>			<td> </td></tr>
<tr><td>iGEN_PIN</td>			<td>int</td>			<td> </td></tr>
<tr><td>iUPDATE_PASSWORD</td>	<td>int</td>			<td> </td></tr>
<tr><td>sNAME</td>				<td>char()</td>			<td>Имя абонента</td></tr>
<tr><td>sDESCRIPTION</td>		<td>char()</td>			<td>Описание</td></tr>
<tr><td>sSEMAIL</td>			<td>char()</td>			<td> </td></tr>
<tr><td>sSLOGIN</td>			<td>char()</td>			<td> </td></tr>
<tr><td>sSPASSWORD</td>			<td>char()</td>			<td> </td></tr>
<tr><td>iIS_ENABLED</td>		<td>int</td>			<td> </td></tr>
<tr><td>iIS_CLUSTERADMIN</td>	<td>int</td>			<td> </td></tr>
<tr><td>iB_SA_FULLACCESS</td>	<td>int</td>			<td> </td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

### STMTSelSuGroups
Список групп абонента кластера

<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>	<td>ID кластера</td></tr>
<tr><td>ID</td>					<td>int</td>	<td>ID абонента</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>ID</td>		<td>int</td>		<td>ID группы</td></tr>
<tr><td>NAME</td>	<td>char(50)</td>	<td>Название группы</td></tr>
</table>

#### STMTDelSGroupSu
Удаление группы абонента кластера

<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>			<td>ID кластера</td></tr>
<tr><td>ip3</td>				<td>int</td>			<td>ID группы</td></tr>
<tr><td>ip4</td>				<td>int</td>			<td>ID абонента</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

#### STMTInsSGroupSu
Добавление группы абонента кластера

<table style="margin-left:30px;">
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>i__CLUSTER_ID</td>		<td>int</td>			<td>ID кластера</td></tr>
<tr><td>iSGROUP_ID</td>			<td>int</td>			<td>ID группы</td></tr>
<tr><td>iSUBSCRIBER_ID</td>		<td>int</td>			<td>ID абонента</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
</table>

<a name="leter_t"><h3 style="color: #66AB16;">T</h3></a>

### STMTSelTaskVersion
Получение информации о совместимости по версиям (для VSP клиентов).

В стандартных вызовах используется запрос [base_selVersion](#base_selversion).

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>sTASK</td>		<td>char(50)</td>	<td>Имя задачи:<br>
												<b>PalladaCfg.WEB</b> – Web клиент конфигурации<br>
												<b>PalladaCfg.exe</b> – Бинарный клиент конфигурации<br>
												<b>VSPClientV4.WEB</b> – Web клиент VSP<br>
												<b>VSPClientV4.exe</b> – Бинарный клиент VSP<br>
												<b>engine</b> – Библиотека ядра<br>
												<b>palladad</b> – Сервис palladad
</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>VERSION</td>	<td>char(50)</td>		<td>Версия</td></tr>
</table>




<a name="leter_u"><h3 style="color: #66AB16;">U</h3></a>
<a name="leter_v"><h3 style="color: #66AB16;">V</h3></a>

### base_selVersion
Получение информации о совместимости по версиям (стандартный вызов).

Для VSP используется запрос [STMTSelTaskVersion](#stmtseltaskversion)

<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>sTASK</td>		<td>char(50)</td>	<td>Имя задачи:<br>
												<b>PalladaCfg.WEB</b> – Web клиент конфигурации<br>
												<b>PalladaCfg.exe</b> – Бинарный клиент конфигурации<br>
												<b>VSPClientV4.WEB</b> – Web клиент VSP<br>
												<b>VSPClientV4.exe</b> – Бинарный клиент VSP<br>
												<b>engine</b> – Библиотека ядра<br>
												<b>palladad</b> – Сервис palladad
</td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td>VERSION</td>	<td>char(50)</td>		<td>Версия</td></tr>
</table>


<a name="leter_w"><h3 style="color: #66AB16;">W</h3></a>
<a name="leter_x"><h3 style="color: #66AB16;">X</h3></a>
<a name="leter_y"><h3 style="color: #66AB16;">Y</h3></a>
<a name="leter_z"><h3 style="color: #66AB16;">Z</h3></a>


<table>
<tr><th>Название</th>		<th>Тип</th>		<th>Описание</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Parameters</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td>		<td>char(50)</td>	<td></td></tr>
<tr><td></td><td></td><td></td></tr>
<tr><th colspan="3">Columns</th></tr>
<tr><td></td><td></td><td></td></tr>
<tr><td></td>	<td>char(50)</td>		<td></td></tr>
</table>
