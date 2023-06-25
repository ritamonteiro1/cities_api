import { Router } from 'express';

import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello World');
});

router.post('/cities',
    CitiesController.createValidator,
    CitiesController.create
);

export { router };