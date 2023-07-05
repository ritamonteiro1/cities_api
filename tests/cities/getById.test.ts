import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - getById', () => {

    it('Search register by id', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get(`/cities/${res1.body}`)
            .send();

        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body).toHaveProperty('name');
    });
    
    it('Try search register do not exist', async () => {

        const res1 = await testServer
            .get('/cities/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});