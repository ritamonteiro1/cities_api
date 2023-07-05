import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - getAll', () => {

    it('Search all registers', async () => {

        const res1 = await testServer
            .post('/cities')
            .send({ name: 'Caxias do sul' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get('/cities')
            .send();

        expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body.length).toBeGreaterThan(0);
    });
});