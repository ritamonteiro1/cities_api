import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';

interface ICity {
    name: string;
    state: string;
}

interface IFilter {
    filter?: string;
}

export const createValidator = validation((getSchema) => ({
    body: getSchema<ICity>(
        yup.object().shape({
            name: yup.string().required().min(3),
            state: yup.string().required().min(3),
        })
    ),
    query: getSchema<IFilter>(
        yup.object().shape({
            filter: yup.string().optional().min(3),
        })
    ),
}));

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
    console.log(req.body);
    res.send('Create!');
};