
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