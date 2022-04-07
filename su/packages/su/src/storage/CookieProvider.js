if (!(Ext.state && Ext.state.CookieProvider)) {
    /**
     * @class Ext.state.CookieProvider
     */
    Ext.define('Ext.state.CookieProvider', {
        mixins: {
            observable: 'Ext.util.Observable'
        },

        prefix: 'ext-',

        state: {},

        constructor: function (config) {
            var me = this;
            me.path = '/';
            me.expires = new Date(Ext.Date.now() + 1000 * 60 * 60 * 24 * 7); //7 days
            me.domain = null;
            me.secure = false;
            Ext.apply(me, config);
            me.state = {};
            me.mixins.observable.constructor.call(me);
            me.state = me.readCookies();
        },

        get: function (name, defaultValue) {
            return typeof this.state[name] == 'undefined' ? defaultValue : this.state[name];
        },

        set: function (name, value) {
            var me = this;

            if (typeof value == 'undefined' || value === null) {
                me.clear(name);
                return;
            }
            me.setCookie(name, value);
            me.state[name] = value;
            me.fireEvent('statechange', me, name, value);
        },

        clear: function (name) {
            var me = this;
            me.clearCookie(name);
            delete me.state[name];
            me.fireEvent('statechange', me, name, null);
        },

        readCookies: function () {
            var cookies = {},
                c = document.cookie + ';',
                re = /\s?(.*?)=(.*?);/g,
                prefix = this.prefix,
                len = prefix.length,
                matches,
                name,
                value;

            while ((matches = re.exec(c)) != null) {
                name = matches[1];
                value = matches[2];
                if (name && name.substring(0, len) == prefix) {
                    cookies[name.substr(len)] = this.decodeValue(value);
                }
            }
            return cookies;
        },

        // private
        setCookie: function (name, value) {
            var me = this;

            document.cookie =
                me.prefix +
                name +
                '=' +
                me.encodeValue(value) +
                (me.expires == null ? '' : '; expires=' + me.expires.toUTCString()) +
                (me.path == null ? '' : '; path=' + me.path) +
                (me.domain == null ? '' : '; domain=' + me.domain) +
                (me.secure == true ? '; secure' : '');
        },

        // private
        clearCookie: function (name) {
            var me = this;

            document.cookie =
                me.prefix +
                name +
                '=null; expires=Thu, 01-Jan-1970 00:00:01 GMT' +
                (me.path == null ? '' : '; path=' + me.path) +
                (me.domain == null ? '' : '; domain=' + me.domain) +
                (me.secure == true ? '; secure' : '');
        },

        /**
         * Decodes a string previously encoded with {@link #encodeValue}.
         * @param {String} value The value to decode
         * @return {Mixed} The decoded value
         */
        decodeValue: function (cookie) {
            /*
             * a -> Array
             * n -> Number
             * d -> Date
             * b -> Boolean
             * s -> String
             * o -> Object
             * -> Empty (null)
             */
            var re = /^(a|n|d|b|s|o|e)\:(.*)$/,
                matches = re.exec(unescape(cookie)),
                all,
                type,
                v,
                kv;
            if (!matches || !matches[1]) {
                return; // non state cookie
            }
            type = matches[1];
            v = matches[2];
            switch (type) {
                case 'e':
                    return null;
                case 'n':
                    return parseFloat(v);
                case 'd':
                    return new Date(Date.parse(v));
                case 'b':
                    return v == '1';
                case 'a':
                    all = [];
                    if (v != '') {
                        Ext.each(
                            v.split('^'),
                            function (val) {
                                all.push(this.decodeValue(val));
                            },
                            this
                        );
                    }
                    return all;
                case 'o':
                    all = {};
                    if (v != '') {
                        Ext.each(
                            v.split('^'),
                            function (val) {
                                kv = val.split('=');
                                all[kv[0]] = this.decodeValue(kv[1]);
                            },
                            this
                        );
                    }
                    return all;
                default:
                    return v;
            }
        },

        /**
         * Encodes a value including type information.  Decode with {@link #decodeValue}.
         * @param {Mixed} value The value to encode
         * @return {String} The encoded value
         */
        encodeValue: function (v) {
            var enc,
                flat = '',
                i = 0,
                len,
                key;
            if (v == null) {
                return 'e:1';
            } else if (typeof v == 'number') {
                enc = 'n:' + v;
            } else if (typeof v == 'boolean') {
                enc = 'b:' + (v ? '1' : '0');
            } else if (Ext.isDate(v)) {
                enc = 'd:' + v.toGMTString();
            } else if (Ext.isArray(v)) {
                for (len = v.length; i < len; i++) {
                    flat += this.encodeValue(v[i]);
                    if (i != len - 1) {
                        flat += '^';
                    }
                }
                enc = 'a:' + flat;
            } else if (typeof v == 'object') {
                for (key in v) {
                    if (typeof v[key] != 'function' && v[key] !== undefined) {
                        flat += key + '=' + this.encodeValue(v[key]) + '^';
                    }
                }
                enc = 'o:' + flat.substring(0, flat.length - 1);
            } else {
                enc = 's:' + v;
            }
            return escape(enc);
        }
    });
}

/**
 * @class SU.storage.CookieProvider
 *
 */
Ext.define('SU.storage.CookieProvider', {
    extend: 'Ext.state.CookieProvider',

    constructor: function (config) {
        config = config || {};
        config.expires = config.expires || new Date(Ext.Date.now() + 1000 * 60 * 60 * 24 * 30); //30 days
        this.callParent(arguments);
    }
});
