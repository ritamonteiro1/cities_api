import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { UsersProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';
import { JWTService, PasswordCrypto } from '../../shared/services';


interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(yup.object().shape({
        password: yup.string().required().min(6),
        email: yup.string().required().email().min(5),
    })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const { email, password } = req.body;

    const user = await UsersProvider.getByEmail(email);
    if (user instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password are invalid'
            }
        });
    }
    const passwordMatch = await PasswordCrypto.verifyPassword(password, user.password);
    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email or password are invalid'
            }
        });
    } else {
        const accessToken = JWTService.sign({ uid: user.id });

        if (accessToken === 'JWT_SECRET_NOT_FOUND') {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Something went wrong'
                }
            });
        }

        return res.status(StatusCodes.OK).json({ accessToken: accessToken });
    }
};