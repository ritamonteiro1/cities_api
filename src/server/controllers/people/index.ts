import * as deleteById from './deleteById';
import * as updateById from './updateById';
import * as getById from './getById';
import * as create from './create';
import * as getAll from './getAll';


export const PeopleController = {
    ...deleteById,
    ...updateById,
    ...getById,
    ...create,
    ...getAll,
};