export default class CaptureStackTraceError extends Error {
    name: string;

    constructor(name: string, message: string) {
        super(message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CaptureStackTraceError);
        }

        this.name = name;
    }
}
