import { ICity } from '../../models';
import { Knex } from '../../knex';
import { ETableNames } from '../../ETableNames';


export const create = async (city: Omit<ICity, 'id'>) : Promise<number | Error>=> {

    try {
        const [result] = await Knex(ETableNames.city).insert(city).returning('id');  
        if(typeof result === 'object'){
            return result.id;
        } else if (typeof result === 'number'){
            return result;
        }
        return new Error('Erro ao cadastrar registro');
    } catch (error) {
        console.log(error);
        return new Error('Erro ao cadastrar registro');
    }
};