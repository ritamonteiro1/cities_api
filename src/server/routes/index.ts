import { Router } from 'express';

import { CitiesController , PeopleController , UsersController } from './../controllers';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello World');
});

router.get('/cities', CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/people', PeopleController.getAllValidation, PeopleController.getAll);
router.post('/people', PeopleController.createValidation, PeopleController.create);
router.get('/people/:id', PeopleController.getByIdValidation, PeopleController.getById);
router.put('/people/:id', PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete('/people/:id', PeopleController.deleteByIdValidation, PeopleController.deleteById);

router.post('/signIn', UsersController.signInValidation, UsersController.signIn);
router.post('/signUp', UsersController.signUpValidation, UsersController.signUp);

export { router };