import { useEffect, useRef } from 'react';

const useIsFirstRender = () => {
    const isFirstRenderRef = useRef(true);

    useEffect(() => {
        isFirstRenderRef.current = false;
    }, []);

    return isFirstRenderRef.current;
};

export default useIsFirstRender;
