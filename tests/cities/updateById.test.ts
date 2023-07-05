import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - updateById', () => {

    it('Update register', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resUpdated = await testServer
            .put(`/cities/${res1.body}`)
            .send({ name: 'Caxias' });

        expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Try update register do not exist', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .send({ name: 'Caxias' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});