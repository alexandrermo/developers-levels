import { Fields } from '../../types/crudComponentsTypes';

export const levelsEntity = 'levels';

export const levelsFields: Fields = {
    id: {
        label: 'ID',
        form: {
            disabled: true
        }
    },
    description: {
        label: 'Descrição',
        form: {
            required: true
        }
    },
    'developers.length': {
        label: 'Quantidade Desenvolvedores',
        form: {
            hidden: true
        }
    }
};
