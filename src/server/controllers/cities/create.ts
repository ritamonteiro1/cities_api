import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ICity {
    name: string;
}

const bodyValidation: yup.Schema<ICity> = yup.object().shape({
    name: yup.string().required().min(3)
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {

    let validateDate: ICity | undefined = undefined;

    try {
        validateDate = await bodyValidation.validate(req.body);
    } catch (error) {
        const yupError = error as yup.ValidationError;
        return res.json({
            errors: {
                default: yupError.message
            }
        });
    }

    console.log(validateDate);
};