import CaptureStackTraceError from '../../../common/errors/CaptureStackTraceError/GenericCustomError';

export default class ErrorWithCode extends CaptureStackTraceError {
    code: number;

    constructor(code: number, message: string) {
        super('ErrorWithCode', message);

        this.code = code;
    }
}
