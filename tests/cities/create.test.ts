import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';


describe('Cities - create', () => {

    let accessToken = '';
    beforeAll(async () => {
        await testServer.post('/signUp').send({ name: 'test', email: 'exemploteste@gmail.com', password: '123456789' });
        const signInResponse = await testServer.post('/signIn').send({ email: 'exemploteste@gmail.com', password: '123456789' });

        accessToken = signInResponse.body.accessToken;
    });
    it('Try to create a login without access token', async () => {
        const response = await testServer
            .post('/cities')
            .send({ name: 'Cidade exemplo' });

        expect(response.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(response.body).toHaveProperty('errors.default');
    });
    it('create register', async () => {

        const response = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'City example' });

        expect(response.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof response.body).toEqual('number');
    });

    it('Try to create a register with a short name', async () => {
        const response = await testServer
            .post('/cities')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ name: 'Ex' });

        expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(response.body).toHaveProperty('errors.body.name');
    });
});