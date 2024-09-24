export class TimeLimitExpired extends Error {
    constructor() {
        super('Time limit to execute resource has expired');
    }
}