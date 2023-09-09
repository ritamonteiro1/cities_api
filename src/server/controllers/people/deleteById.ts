import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { PeopleProvider } from '../../database/providers/people';
import { validation } from '../../shared/middlewares';


interface IParamProps {
    id?: number;
}

export const deleteByIdValidation = validation(get => ({
    params: get<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
}));

export const deleteById = async (req: Request<IParamProps>, res: Response) => {
    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'Id is required'
            }
        });
    }

    const result = await PeopleProvider.deleteById(req.params.id);
    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message
            }
        });
    }
    return res.status(StatusCodes.NO_CONTENT).send();
};