import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';
import { Knex } from '../../knex';


export const create = async (person: Omit<IPerson, 'id'>): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where('id', '=', person.cityId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('City not found');
        }
        const [result] = await Knex(ETableNames.person).insert(person).returning('id');
        if (typeof result === 'object') {
            return result.id;
        } else if (typeof result === 'number') {
            return result;
        }
        return new Error('Error creating person');
    } catch (error) {
        console.log(error);
        return new Error('Error creating person');
    }
};