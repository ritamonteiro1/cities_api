import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - deleteById', () => {

    it('Delete register', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resDeleted = await testServer
            .delete(`/cities/${res1.body}`)
            .send();

        expect(resDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Try deleting register do not exist', async () => {

        const res1 = await testServer
            .delete('/cities/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});