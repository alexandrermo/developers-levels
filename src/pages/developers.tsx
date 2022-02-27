import { useEffect, useState } from 'react';
import DevelopersEndpoint from '../front/endpoints/Developers/DevelopersEndpoint';
import LoadingOnMiddle from '../front/general-components/LoadingOnMiddle/LoadingOnMiddle';

const Developers = () => {
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const fetchedDevelopers = await DevelopersEndpoint.get();
            console.log({ fetchedDevelopers });
            setDevelopers(fetchedDevelopers);
        })();
    }, []);

    if (loading) {
        return <LoadingOnMiddle />;
    }
};

export default Developers;
