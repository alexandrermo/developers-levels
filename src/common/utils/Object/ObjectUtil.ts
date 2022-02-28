import { GenericObject } from '../../types/objectTypes';

export default class ObjectUtil {
    public static getNestedProperty(
        completeProperty: string,
        object: GenericObject
    ) {
        const propertiesArray = completeProperty.split('.');
        let propertyValue = object;
        propertiesArray.forEach((propertyItem) => {
            propertyValue = propertyValue?.[propertyItem];
        });
        return propertyValue;
    }

    public static deepCopy<T extends GenericObject>(object: T) {
        return JSON.parse(JSON.stringify(object)) as T;
    }
}
