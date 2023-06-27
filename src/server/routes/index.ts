import { Router } from 'express';

import { CitiesController } from './../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello World');
});

router.get('/cities',
    CitiesController.createAllValidation,
    CitiesController.getAll
);

router.post('/cities',
    CitiesController.createValidation,
    CitiesController.create
);

export { router };