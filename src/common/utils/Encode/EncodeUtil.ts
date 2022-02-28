import { GenericObject } from '../../types/objectTypes';

export default class EncodeUtil {
    public static stringToUriComponent(string: string) {
        return encodeURIComponent(string);
    }

    public static objectToUriComponent(object: GenericObject) {
        return EncodeUtil.stringToUriComponent(JSON.stringify(object));
    }
}
