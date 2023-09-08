import { Knex } from './server/database/knex';
import { server } from './server/server';

const startServer = () => {
    server.listen(process.env.PORT || 3333, () => {
        console.log(`Server is running: localhost ${process.env.PORT || 3333}`);
    });
};


if (process.env.IS_LOCALHOSTAL !== 'true') {
    Knex.migrate.latest().then(() => {
        startServer();
    }).catch((err) => {
        console.log(err);
    });
} else {
    startServer();
}
