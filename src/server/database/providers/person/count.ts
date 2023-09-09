import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.person)
            .where('fullName', 'like', `%${filter}%`)
            .count<[{ count: number }]>('* as count');
        if (Number.isInteger(Number(count))) return Number(count);
        return new Error('Error querying the total number of people');
    } catch (error) {
        console.log(error);
        return new Error('Error querying the total number of people');
    }
};