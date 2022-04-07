/*
 * Project    : Pallada Core Library
 * File	      : utils/String.js
 * Created on : 29.07.2015 14:51:38
 *
 */

/**
 * Дополнительные методы, добавляемые в Ext.String, обеспечивающие
 * расширение функциональности:
 *
 * {@link #declination} - правильная форма cуществительного рядом с числом (счетная форма)
 *
 *
 *     @example
 *     var wordForms = ['заяц', 'зайца', 'зайцев'];
 *     console.log( 1, Ext.String.declination(1, wordForms) );                 // 1 заяц
 *     console.log( 3, Ext.String.declination(3, wordForms) );                 // 3 зайца
 *     console.log( 11, Ext.String.declination(11, wordForms) );               // 11 зайцев
 *     console.log( Ext.String.declination(NaN, wordForms) || 'Зайцев нет' );  // Зайцев нет
 *
 * Для нечисловых значений возвращает пустую строку.
 *
 * @history 31.01.2017
 * Добавлен метод #textWidth
 *
 * @history 03.10.2016
 * Подключен к QUnit тестам
 *
 * - исправлены выявленные ошибки
 * - добавлено использование параметра-массива
 *
 * @history 29.07.2015
 * Перенесен в `Pallada Core Library`
 *
 * @history 17.04.2012
 * Создание модуля
 */
Ext.define(
    'SU.utils.String',
    {
        singleton: true,

        requires: ['Ext.String', 'Ext.util.Format'],

        /**
         * Правильная форма cуществительного рядом с числом (счетная форма).
         * Для нечисловых значений возвращает пустую строку.
         *
         * @param {Number} number
         * Число
         *
         * @param {String/Array} first
         * 1-я словоформа единственное число именительный падеж
         * либо массив словоформ
         *
         * @param {String} second (optional)
         * 2-я словоформа единственное число родительный падеж
         *
         * Если первый параметр массив, то параметр игнорируется.
         *
         * @param {String} rest (optional)
         * 3-я словоформа множественное число родительный падеж.
         *
         * При отсутствии параметра применяются правила для английского языка.
         *
         * Если первый параметр массив, то параметр игнорируется.
         *
         * @return {String} Счетная форма
         */
        declination: function (number, first, second, rest) {
            if (!(!isNaN(parseFloat(number)) && isFinite(number))) return '';

            number = Math.abs(+number);

            var base = number % 100,
                remainder = number % 10,
                c1 = first,
                c2 = second,
                c3 = rest;

            if (Ext.isArray(first)) {
                c2 = first[1];
                c3 = first[2];
                c1 = first[0];
            }

            if (!c3) {
                // английский вариант: 1 и -1 - единственное число, остальное множественное
                if (number === 1) return c1;
                return c2;
            }

            // русский вариант

            if (base > 9 && base < 20) {
                // число от 10 до 19 (зайцев)
                return c3;
            } else {
                if (1 === remainder) {
                    // 1 (заяц)
                    return c1;
                } else if (0 < remainder && 5 > remainder) {
                    // 2, 3, 4 (зайца)
                    return c2;
                } else {
                    // (зайцев)
                    return c3;
                }
            }
        },

        /**
         * Вычисляет реальную ширину текста в пикселах, отбражаемого в DOM,
         * с использованием canvas
         *
         * @param {String} text
         * Строка текста
         *
         * @param {String} [font]
         * Строка параметров шрифта.
         *
         * При пустом значении используется значение по умолчанию для canvas
         *
         *     10px sans-serif
         *
         * или параметр предыдущего вызова.
         *
         * Подробнее: [HTML canvas font Property](http://http://www.w3schools.com/tags/canvas_font.asp).
         *
         * @return {Number} Ширина текста
         */
        textWidth: function (text, font) {
            var me = this,
                proto = me.textWidth;

            // повторное использование объекта canvas для лучшей производительности
            var canvas = proto.canvas || (proto.canvas = document.createElement('canvas'));
            var context = canvas.getContext('2d');
            font && (context.font = font);
            return context.measureText(text).width;
        }
    },
    function () {
        /**
         * @class Ext.String
         * @mixins SU.utils.String
         *
         */

        /**
         * @method declination
         * @localdoc Alias SU.utils.String#declination
         * @inheritdoc SU.utils.String#declination
         */

        /**
         * @method textWidth
         * @localdoc Alias SU.utils.String#textWidth
         * @inheritdoc SU.utils.String#textWidth
         */

        var utilString = SU.utils.String;
        Ext.apply(Ext.String, utilString);

        /**
         * @class Ext.util.Format
         * @mixins SU.utils.String
         *
         */
        Ext.util.Format.declination = utilString.declination;
    }
);
