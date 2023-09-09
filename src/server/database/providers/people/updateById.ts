import { ETableNames } from '../../ETableNames';
import { IPerson } from '../../models';
import { Knex } from '../../knex';



export const updateById = async (id: number, person: Omit<IPerson, 'id'>): Promise<void | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.city)
            .where('id', '=', person.cityId)
            .count<[{ count: number }]>('* as count');

        if (count === 0) {
            return new Error('City not found');
        }
        const result = await Knex(ETableNames.person)
            .update(person)
            .where('id', '=', id);

        if (result > 0) return;
        return new Error('Error updating person');
    } catch (error) {
        console.log(error);
        return new Error('Error updating person');
    }
};