import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';

interface IQueryProps {
    page?: number;
    limit?: number;
    filter?: string;
}

export const createAllValidation = validation((getSchema) => ({
    body: getSchema<IQueryProps>(
        yup.object().shape({
            page: yup.number().optional().moreThan(0),
            limit: yup.number().optional().moreThan(0),
            filter: yup.string(),
        })
    ),
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', 1);

    return res.status(StatusCodes.OK).json([
        {
            id: 1,
            name: 'Caxias do Sul',
        }
    ]);
};
