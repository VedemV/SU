/**
 *
 */
Ext.define('SU.data.validator.INN', {
    extend: 'Ext.data.validator.Validator',
    alternateClassName: ['Ext.data.validator.INN'],

    // LegalReduction

    alias: 'data.validator.inn',

    // ИНН - TIN / ITN
    // КПП - IEC
    // ОГРН - PSRN

    config: {
        /**
         * @cfg {String} message
         * The error message to return when the value is not a valid inn.
         */
        message: 'Некорректный ИНН',

        vType: 'inn'
    },

    validate: function (value) {
        if (this.getVType() === 'inn') {
            return this.validateInn(value);
        } else if (this.getVType() === 'ogrn') {
            return this.validateOgrn(value);
        }
        return 'Не верный тип проверки';
    },

    validateInn: function (value) {
        // проверка на число
        if (value.match(/\D/)) {
            return 'Введённый ИНН не является числом';
        }

        // проверка на 10 и 12 цифр
        if (value.length !== 12 && value.length !== 10) {
            return this.getMessage();
        }

        // проверка по контрольным цифрам
        if (value.length === 10) {
            var dgt10 = String(
                ((2 * value[0] +
                    4 * value[1] +
                    10 * value[2] +
                    3 * value[3] +
                    5 * value[4] +
                    9 * value[5] +
                    4 * value[6] +
                    6 * value[7] +
                    8 * value[8]) %
                    11) %
                    10
            );
            console.log(dgt10);
            return value[9] === dgt10 ? true : 'Введённый ИНН не прошёл проверку по контрольным цифрам';
        }

        if (value.length === 12) {
            var dgt11 = String(
                ((7 * value[0] +
                    2 * value[1] +
                    4 * value[2] +
                    10 * value[3] +
                    3 * value[4] +
                    5 * value[5] +
                    9 * value[6] +
                    4 * value[7] +
                    6 * value[8] +
                    8 * value[9]) %
                    11) %
                    10
            );

            var dgt12 = String(
                ((3 * value[0] +
                    7 * value[1] +
                    2 * value[2] +
                    4 * value[3] +
                    10 * value[4] +
                    3 * value[5] +
                    5 * value[6] +
                    9 * value[7] +
                    4 * value[8] +
                    6 * value[9] +
                    8 * value[10]) %
                    11) %
                    10
            );
            console.log(dgt11, dgt12);
            return value[10] === dgt11 && value[11] === dgt12
                ? true
                : 'Введённый ИНН не прошёл проверку по контрольным цифрам';
        }
    },

    validateOgrn: function (ogrn) {
        var result = false;

        if (typeof ogrn === 'number') {
            ogrn = ogrn.toString();
        } else if (typeof ogrn !== 'string') {
            ogrn = '';
        }

        if (!ogrn.length) {
            result = 'ОГРН пуст';
        } else if (/[^0-9]/.test(ogrn)) {
            result = 'ОГРН может состоять только из цифр';
        } else if (ogrn.length !== 13) {
            result = 'ОГРН может состоять только из 13 цифр';
        } else {
            var n13 = parseInt((parseInt(ogrn.slice(0, -1)) % 11).toString().slice(-1));
            if (n13 === parseInt(ogrn[12])) {
                result = true;
            } else {
                console.log(n13);
                result = 'Неправильное контрольное число';
            }
        }
        return result;
    }
});
