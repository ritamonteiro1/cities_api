import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export const seed = async (knex: Knex) => {
    const [{ count }] = await knex(ETableNames.city).count<[{ count: number }]>('* as count');
    if (!Number.isInteger(count) || Number(count) > 0) return;

    const citiesToInsert = exampleCities.map(cityName => ({ name: cityName }));
    await knex(ETableNames.city).insert(citiesToInsert);
};

const exampleCities = [
    'São Paulo',
    'Rio de Janeiro',
    'Salvador',
    'Belo Horizonte',
    'Fortaleza',
    'Brasília',
    'Curitiba',
    'Manaus',
    'Recife',
];