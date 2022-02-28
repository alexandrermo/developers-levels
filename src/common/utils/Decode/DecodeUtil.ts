export default class DecodeUtil {
    public static uriComponentToString(uriComponent: string) {
        return decodeURIComponent(uriComponent);
    }

    public static uriComponentToObject(uriComponent: string) {
        return JSON.parse(DecodeUtil.uriComponentToString(uriComponent));
    }
}
