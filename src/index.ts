import { Knex } from './server/database/knex';
import { server } from './server/server';

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`Server is running: localhost ${process.env.PORT || 3333}`);
    });
};


if (process.env.IS_LOCALHOST !== 'true') {

    console.log('Running migrations');

    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed.run()
                .then(() => startServer())
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}