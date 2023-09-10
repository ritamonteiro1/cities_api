import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - updateById', () => {
    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });

    it('Update register', async () => {

        const res1 = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Cidade' });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resUpdated = await testServer
            .put(`/cities/${res1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Cidade' });

        expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Try update register do not exist', async () => {

        const res1 = await testServer
            .put('/cities/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Cidade' });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    });
});