import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('People - getAll', () => {

    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });

    
    let cityId: number | undefined = undefined;
    beforeAll(async () => {
        const response = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'teste' });

        cityId = response.body;
    });


    it('Search all registers', async () => {
        const response = await testServer
            .post('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({
                cityId,
                email: 'exemplo@gmail.com',
                fullName: 'Nome exemplo',
            });
        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const result = await testServer
            .get('/people')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();
        expect(Number(result.header['x-total-count'])).toBeGreaterThan(0);
        expect(result.statusCode).toEqual(StatusCodes.OK);
        expect(result.body.length).toBeGreaterThan(0);
    });
});