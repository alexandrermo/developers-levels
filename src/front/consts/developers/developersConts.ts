import DevelopersBibli from '../../biblis/Developers/DevelopersBibli';
import { Fields } from '../../types/crudComponentsTypes';

export const developersEntity = 'developers';

export const developersFields: Fields = {
    id: { label: 'ID', form: { disabled: true } },
    name: { label: 'Nome', form: { required: true } },
    sex: {
        label: 'Sexo',
        type: 'select',
        form: { required: true },
        options: [
            { value: 'M', label: 'Masculino' },
            { value: 'F', label: 'Feminino' },
            { value: 'N', label: 'Prefiro não dizer' }
        ]
    },
    birthday: {
        label: 'Dt. Nascimento',
        type: 'date',
        form: { required: true }
    },
    hobby: { label: 'Hobby' },
    'level.description': { label: 'Nível', form: { hidden: true } },
    levelId: {
        label: 'Nível',
        type: 'select',
        table: { hidden: true },
        form: { required: true },
        getOptionsApi: DevelopersBibli.getLevelIdOptionsFromApi
    }
};
