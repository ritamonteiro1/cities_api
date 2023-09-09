import { ETableNames } from '../../ETableNames';
import { ICity } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, cidade: Omit<ICity, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.city)
            .update(cidade)
            .where('id', '=', id);

        if (result > 0) return;
        return new Error('Error updating city');
    } catch (error) {
        console.log(error);
        return new Error('Error updating city');
    }
};