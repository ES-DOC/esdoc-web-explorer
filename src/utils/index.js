/**
 * @file Utility functions used across application.
 * @author Mark Conway-Greenslade
 */

/**
 * Returns mode in which application is being run.
 */
export const getApplicationMode = () => {
    if (window.location.host && window.location.host.indexOf('es-doc.org') >= 0) {
        if (window.location.host.indexOf('test') >= 0) {
            return 'test';
        } else {
            return 'prod';
        }
    } else {
        return 'dev';
    }
}

// Returns URL query param value.
// @name                URL query param name.
// @defaultValue        URL query param default value.
// @retainCase          Flag indicating whether the result will be converted to lower case or not.
export const getURLParam = (name, defaultValue, retainCase) => {
    let result = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (!result) {
        return defaultValue;
    }
    result = (result[1] || defaultValue);

    return (retainCase === true) ? result : result.toLowerCase();
};
