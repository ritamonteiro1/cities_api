import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - getById', () => {
    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });

    it('Search register by id', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Cidade' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resSearched = await testServer
            .get(`/cities/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resSearched.statusCode).toEqual(StatusCodes.OK);
        expect(resSearched.body).toHaveProperty('name');
    });
    
    it('Try search register do not exist', async () => {

        const response = await testServer
            .get('/cities/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});