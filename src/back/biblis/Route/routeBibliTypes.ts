import { NextApiRequest, NextApiResponse } from 'next';

type ControllerHandler = (req: NextApiRequest, res: NextApiResponse) => void;

export interface ControllerObject {
    get?: ControllerHandler;
    put?: ControllerHandler;
    post?: ControllerHandler;
    delete?: ControllerHandler;
}
