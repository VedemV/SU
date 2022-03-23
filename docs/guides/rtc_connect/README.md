
# Установка WebRTC соединения

## Последовательность операций по созданию WebRTC соединения с ядром.

<table>
<tr><td></td><td></td><td></td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Обратиться к getUserMedia. Если не получилось – обломится.</td></tr>
<tr>
	<td style="background-color:rgb(142,170,219);">Media</td>
	<td style="background-color:rgb(142,170,219);">&nbsp;&gt;&nbsp;</td>
	<td>Поймать callback от getUserMedia</td></tr>
<tr>
	<td style="background-color:rgb(226,239,217);">WebSocket</td>
	<td style="background-color:rgb(226,239,217);">&nbsp;&lt;&nbsp;</td>
	<td>Выдать ядру команду CALLME_S1 для участника (себя)</td></tr>
<tr>
	<td style="background-color:rgb(168,208,141);">WebSocket</td>
	<td style="background-color:rgb(168,208,141);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться положительного ответа от ядра. При отрицательном – облом</td></tr>
<tr>
	<td style="background-color:rgb(168,208,141);">WebSocket</td>
	<td style="background-color:rgb(168,208,141);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться от ядра события conf.webrtc.servdesc</td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Обратиться к PeerConnection. В качестве ICE-сервера подставить данные из conf.webrtc.servdesc</td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Обратиться к createOffer</td></tr>
<tr>
	<td style="background-color:rgb(142,170,219);">Media</td>
	<td style="background-color:rgb(142,170,219);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться callback от createOffer</td></tr>
<tr>
	<td></td>
	<td></td>
	<td>Перелопатить SDP, вытащить из него ufrag и pwd</td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Обратиться к setLocalDescription</td></tr>
<tr>
	<td style="background-color:rgb(142,170,219);">Media</td>
	<td style="background-color:rgb(142,170,219);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться callback от setLocalDescription</td></tr>
<tr>
	<td style="background-color:rgb(226,239,217);">WebSocket</td>
	<td style="background-color:rgb(226,239,217);">&nbsp;&lt;&nbsp;</td>
	<td>Выдать команду ядру CALLME_S2, ufrag и pwd для участника (себя)</td></tr>
<tr>
	<td style="background-color:rgb(168,208,141);">WebSocket</td>
	<td style="background-color:rgb(168,208,141);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться положительного ответа от ядра. При отрицательном – облом</td></tr>
<tr>
	<td style="background-color:rgb(168,208,141);">WebSocket</td>
	<td style="background-color:rgb(168,208,141);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться события от ядра conf.webrtc.servufrag</td></tr>
<tr>
	<td></td>
	<td></td>
	<td>Используя данные conf.webrtc.servufrag сформировать строчку RTCSessionDescription для дальней стороны.</td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Обратиться с этими данными к setRemoteDescription</td></tr>
<tr>
	<td style="background-color:rgb(142,170,219);">Media</td>
	<td style="background-color:rgb(142,170,219);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться callback setRemoteDescription</td></tr>
<tr>
	<td style="background-color:rgb(142,170,219);">Media</td>
	<td style="background-color:rgb(142,170,219);">&nbsp;&gt;&nbsp;</td>
	<td>Дождаться evtAddStream</td></tr>
<tr>
	<td style="background-color:rgb(217,226,243);">Media</td>
	<td style="background-color:rgb(217,226,243);">&nbsp;&lt;&nbsp;</td>
	<td>Назначить входящий аудиопоток</td></tr>
</table>



