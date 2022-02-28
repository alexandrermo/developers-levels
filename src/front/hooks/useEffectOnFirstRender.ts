import { useEffect } from 'react';
import { GenericFunction } from '../../common/types/functionTypes';
import useIsFirstRender from './useIsFirstRender';

const useEffectOnFirstRender = (callback: GenericFunction) => {
    const isFirstRender = useIsFirstRender();

    useEffect(() => {
        if (isFirstRender) {
            callback();
        }
    }, [callback, isFirstRender]);
};

export default useEffectOnFirstRender;
