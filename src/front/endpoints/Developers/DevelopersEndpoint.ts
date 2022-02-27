import FetchBibli from '../../biblis/FetchBibli/FetchBibli';

export default class DevelopersEndpoint {
    static get() {
        return FetchBibli.apiJson('developers', { method: 'GET' });
    }
}
