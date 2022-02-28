import { FieldItem } from '../../types/crudComponentsTypes';

export default class DataBaseItemFormBibli {
    public static checkFieldEntrieIsWithApi(entrie: [string, FieldItem]) {
        const [, fieldItem] = entrie;
        return fieldItem.getOptionsApi;
    }
}
