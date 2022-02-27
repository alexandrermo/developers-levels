export default class FunctionUtil {
    static callIfFunctionExists(
        callback: ((...params: any[]) => any) | undefined,
        params: any[] = []
    ) {
        return callback && callback(...params);
    }
}
