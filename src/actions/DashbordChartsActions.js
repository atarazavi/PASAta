
import {ON_DASHBORD_GLOBAL_FILTER_CHANGE} from './types';

export const golbalFilterChange = (data) => ({
    type: ON_DASHBORD_GLOBAL_FILTER_CHANGE,
    payload: data
})