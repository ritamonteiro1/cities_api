import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - create', () => {

    it('create register', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do Sul' });


        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');
    });

    it('Try to create a register with a short name', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Ca' });


        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errors.body.name');
    });
});