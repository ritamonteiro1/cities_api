import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('People - getAll', () => {
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const response = await testServer
            .post('/cities')
            .send({ name: 'teste' });

        cityId = response.body;
    });


    it('Search all registers', async () => {
        const response = await testServer
            .post('/people')
            .send({
                cityId,
                email: 'exemplo@gmail.com',
                fullName: 'Nome exemplo',
            });
        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const result = await testServer
            .get('/people')
            .send();
        expect(Number(result.header['x-total-count'])).toBeGreaterThan(0);
        expect(result.statusCode).toEqual(StatusCodes.OK);
        expect(result.body.length).toBeGreaterThan(0);
    });
});