import { SingleItem } from '../../../common/types/commonEndpointTypes';
import FetchBibli from '../../biblis/FetchBibli/FetchBibli';

import { levelsEntity } from '../../consts/developers/levelsConts';

export default class LevelsEndpoint {
    public static getAll = () =>
        FetchBibli.apiGetJson<SingleItem[]>(`${levelsEntity}All`);
}
