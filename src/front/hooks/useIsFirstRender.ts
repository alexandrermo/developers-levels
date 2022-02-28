import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

const useIsFirstRender = () => {
    const isFirstRenderRef = useRef(true);
    const { isReady } = useRouter();

    useEffect(() => {
        if (isReady) {
            isFirstRenderRef.current = false;
        }
    }, [isReady]);

    return isReady && isFirstRenderRef.current;
};

export default useIsFirstRender;
