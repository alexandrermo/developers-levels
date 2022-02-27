export default class ConsoleUtil {
    static log(...params: any[]) {
        // eslint-disable-next-line no-console
        console.log(...params);
    }

    static error(...params: any[]) {
        // eslint-disable-next-line no-console
        console.error(...params);
    }
}
