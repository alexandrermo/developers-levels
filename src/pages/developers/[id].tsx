import { developersFields } from '../../front/consts/developers/developersConts';
import DevelopersEndpoint from '../../front/endpoints/Developers/DevelopersEndpoint';
import DatabaseItemForm from '../../front/general-components/DatabaseItemForm/DatabaseItemForm';

const DevelopersId = () => (
    <DatabaseItemForm
        endpoints={{
            post: DevelopersEndpoint.post,
            getWithId: DevelopersEndpoint.getWithId
        }}
        fields={developersFields}
        label="Desenvolvedor"
    />
);

export default DevelopersId;
