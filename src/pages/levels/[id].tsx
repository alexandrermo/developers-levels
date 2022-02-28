import {
    levelsEntity,
    levelsFields
} from '../../front/consts/developers/levelsConts';
import LevelsEndpoint from '../../front/endpoints/Levels/LevelsEndpoint';
import DatabaseItemForm from '../../front/general-components/DatabaseItemForm/DatabaseItemForm';

const DevelopersId = () => (
    <DatabaseItemForm
        endpoints={{
            post: LevelsEndpoint.post,
            getWithId: LevelsEndpoint.getWithId,
            putWithId: LevelsEndpoint.putWihtId
        }}
        fields={levelsFields}
        label="Nível"
        entity={levelsEntity}
    />
);

export default DevelopersId;
