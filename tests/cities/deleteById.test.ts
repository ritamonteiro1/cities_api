import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - deleteById', () => {

    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });

    it('Delete register', async () => {

        const response = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'City example' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cities/${response.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Try deleting register do not exist', async () => {


        const response = await testServer
            .delete('/cities/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});