Ext.define('SU.locale.en.WebSocketError', {
    override: 'SU.WebSocketError',
    statics: {
        locales: {
            ALREADY_ESTABLISHED: 'The connection is already established.',
            NOT_CONNECTED: 'The connection is not established.',
            CAN_NOT_CONNECT: 'Can not connect to {0}',
            DISCONNECT: 'Connecting to {0} has been interrupted.',
            INVALID_SCHEME: "Invalid schema '{0}' for WebSocket",
            INVALID_ADDRESS: "Invalid address '{0}' for WebSocket",
            LOGIN_NOT_DEFINED: 'Not defined for automatic login user authorization.',
            LOGIN_ERROR: 'Login failed (Code {0}).\n\n{1}',
            LOGIN_CUSTOM: 'Invalid username or password.',
            LOGIN_UNKNOWN: 'Username or password unidentified.',
            LOGIN_INV_METHOD: 'Authorization is prohibited by the system administrator.',
            AUTHORIZE_ERROR: 'Runtime error authorization request.'
        }
    }
});
