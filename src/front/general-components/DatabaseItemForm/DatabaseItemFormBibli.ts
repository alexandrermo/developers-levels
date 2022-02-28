import { FieldItem } from '../../types/crudComponentsTypes';

export default class DatabaseItemFormBibli {
    public static checkFieldEntrieIsWithApi(entrie: [string, FieldItem]) {
        const [, fieldItem] = entrie;
        return fieldItem.getOptionsApi;
    }
}
