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
