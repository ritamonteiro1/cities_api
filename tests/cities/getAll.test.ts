import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - getAll', () => {
    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });

    it('Search all registers', async () => {

        const response = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Cidade' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(Number(resSearched.header['x-total-count'])).toBeGreaterThan(0);
        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body.length).toBeGreaterThan(0);
    });
});