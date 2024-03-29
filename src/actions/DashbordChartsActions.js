
import {ON_DASHBORD_GLOBAL_FILTER_CHANGE,ON_DASHBORD_CUSTOM_FILTER_CHANGE,On_HISTOGRAM_INTERVAL_CHANGE} from './types';

export const golbalFilterChange = (data) => ({
    type: ON_DASHBORD_GLOBAL_FILTER_CHANGE,
    payload: data
})
export const customFilterChange = (item,id) => {
    // console.log('///////////////////////',item,id);
    return {
        type: ON_DASHBORD_CUSTOM_FILTER_CHANGE,
        payload: {id:id,item:item}
    }
};

export const histogramIntervalChange = (interval)=>({
    type:On_HISTOGRAM_INTERVAL_CHANGE,
    payload:interval
});