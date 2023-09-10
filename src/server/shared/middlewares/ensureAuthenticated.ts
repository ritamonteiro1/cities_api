import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

export const ensureAuthenticated: RequestHandler = async (req, res, next) => {
    const { authorization } = req.headers;

    console.log(req.headers);

    if (!authorization) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Not authenticated' }
        });
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Not authenticated' }
        });
    }

    if (token !== 'test.test.test') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: { default: 'Not authenticated' }
        });
    }
    return next();
};