import { Router } from 'express';

import { CitiesController , PeopleController , UsersController } from './../controllers';
import { ensureAuthenticated } from '../shared/middlewares';

const router = Router();

router.get('/', (req, res) => {
    return res.send('Hello World');
});

router.get('/cities', ensureAuthenticated, CitiesController.getAllValidation, CitiesController.getAll);
router.post('/cities', ensureAuthenticated, CitiesController.createValidation, CitiesController.create);
router.get('/cities/:id', ensureAuthenticated, CitiesController.getByIdValidation, CitiesController.getById);
router.put('/cities/:id', ensureAuthenticated, CitiesController.updateByIdValidation, CitiesController.updateById);
router.delete('/cities/:id', ensureAuthenticated, CitiesController.deleteByIdValidation, CitiesController.deleteById);

router.get('/people', ensureAuthenticated, PeopleController.getAllValidation, PeopleController.getAll);
router.post('/people', ensureAuthenticated, PeopleController.createValidation, PeopleController.create);
router.get('/people/:id', ensureAuthenticated, PeopleController.getByIdValidation, PeopleController.getById);
router.put('/people/:id', ensureAuthenticated, PeopleController.updateByIdValidation, PeopleController.updateById);
router.delete('/people/:id', ensureAuthenticated, PeopleController.deleteByIdValidation, PeopleController.deleteById);

router.post('/signIn', UsersController.signInValidation, UsersController.signIn);
router.post('/signUp', UsersController.signUpValidation, UsersController.signUp);

export { router };