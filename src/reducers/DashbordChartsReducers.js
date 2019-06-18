import {ON_DASHBORD_GLOBAL_FILTER_CHANGE,ON_DASHBORD_CUSTOM_FILTER_CHANGE,On_HISTOGRAM_INTERVAL_CHANGE} from '../actions/types';

const INIT_STATE = {
    "cities": [],
    "countries": [],
    "fromDate": "",
    "histogramInterval": "day",
    "id": 0,
    "industries": [],
    "manufacturers": [],
    "pageNumber": 0,
    "pageSize": 0,
    "productSubcategories": [],
    "productTypes": [654654,11],
    "productcategories": [],
    "productproviders": [],
    "products": [],
    "provinces": [],
    "reportStarting": "all",
    "resultSize": 32,
    "tagprovideries": [],
    "toDate": "",
    "tapAuthResult":"AUTHENTICATION_SUCCESSFUL"
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case ON_DASHBORD_GLOBAL_FILTER_CHANGE:
            return {
                ...state,
                toDate:action.payload.toDate,
                fromDate:action.payload.fromDate,
                reportStarting:action.payload.startingDate,
                tapAuthResult:action.payload.tapAuthResult
            };
        case ON_DASHBORD_CUSTOM_FILTER_CHANGE:
            let id = action.payload.id;
            let item = action.payload.item;
            console.log('//////////////////////////////');
            console.log(item,id);
            if(state[item]){

                var itemExitence = state[item].indexOf(id);
                var res = itemExitence === -1 ? state[item].push(id) : state[item].splice(itemExitence ,1);
            
                return {
                    ...state,
                    [state[item]]:res
                }
            }else{
                return state;
            }
        case On_HISTOGRAM_INTERVAL_CHANGE:
            return {
                ...state,
                histogramInterval:action.payload
            };

        default: return { ...state };
    }
}


