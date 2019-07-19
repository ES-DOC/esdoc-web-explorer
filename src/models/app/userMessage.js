/**
 * Enumeration of user message types.
 */
const UserMessageTypes = Object.freeze({
    Info: 'Info',
    Warning: 'Warning',
    Error: 'Error',
})

/**
 * Encapsulates information used to display a message to a user.
 */
export class UserMessageInfo {
    constructor (message, title, type) {
        this.message = message;
        this.title = title;
        this.type = type;
    }
}
