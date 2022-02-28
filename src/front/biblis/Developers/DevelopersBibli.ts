import LevelsEndpoint from '../../endpoints/Levels/LevelsEndpoint';
import { FieldItemOptions } from '../../types/crudComponentsTypes';

export default class DevelopersBibli {
    public static getLevelIdOptionsFromApi = async () => {
        const levels = await LevelsEndpoint.getAll();

        const options: FieldItemOptions = levels.map((levelItem) => ({
            value: levelItem.id,
            label: `${levelItem.id} - ${levelItem.description}`
        }));

        return options;
    };
}
