/**
 * Helpers Functions
 */
import React from 'react';
import moment from 'moment';

import IntlMessages from 'Util/IntlMessages';

/**
 * Function to convert hex to rgba
 */
export function hexToRgbA(hex, alpha) {
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
        c = hex.substring(1).split('');
        if (c.length === 3) {
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x' + c.join('');
        return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    throw new Error('Bad Hex');
}

/**
 * Text Truncate
 */
export function textTruncate(str, length, ending) {
    if (length == null) {
        length = 100;
    }
    if (ending == null) {
        ending = '...';
    }
    if (str.length > length) {
        return str.substring(0, length - ending.length) + ending;
    } else {
        return str;
    }
}

/**
 * Get Date
 */
export function getTheDate(timestamp, format) {
    let time = timestamp * 1000;
    let formatDate = format ? format : 'MM-DD-YYYY';
    return moment(time).format(formatDate);
}

/**
 * Convert Date To Timestamp
*/
export function convertDateToTimeStamp(date, format) {
    let formatDate = format ? format : 'YYYY-MM-DD';
    return moment(date, formatDate).unix();
}

/**
 * Function to return current app layout
 */
export function getAppLayout(url) {
    let location = url.pathname;
    let path = location.split('/');
    return path[1];
}


export function formatResult(msg){
    switch(msg){
        case "AUTHENTICATION_SUCCESSFUL":
            return [<IntlMessages id='auth.succss' />,'green'];
        case "TAG_NOT_FOUND":
            return [<IntlMessages id='auth.not.found' />,'gray'];
        case "TAG_NOT_ASSIGN_TO_PRODUCT":
            return [<IntlMessages id='auth.not.found' />,'orange'];
        case "TAG_RIPPED":
            return [<IntlMessages id='auth.ripped' />,'RED'];
        case "TAG_IS_FAKE":
            return [<IntlMessages id='auth.is.fake' />,'darkred'];
        default:
            return [<IntlMessages id='auth.not.found' />,'gray'];
    }
}