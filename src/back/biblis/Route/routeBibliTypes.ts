import { NextApiRequest, NextApiResponse } from 'next';

type ControllerHandler = (
    req: NextApiRequest,
    res: NextApiResponse
) => Promise<void>;

export interface ControllerObject {
    get?: ControllerHandler;
    put?: ControllerHandler;
    post?: ControllerHandler;
    delete?: ControllerHandler;
}
