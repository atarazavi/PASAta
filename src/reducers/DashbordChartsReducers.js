import {ON_DASHBORD_GLOBAL_FILTER_CHANGE} from '../actions/types';

const INIT_STATE = {
    "cities": [],
    "countries": [],
    "fromDate": "",
    "histogramInterval": "day",
    "id": 0,
    "industries": [],
    "manufacturers": [15,16],
    "pageNumber": 0,
    "pageSize": 0,
    "productSubcategories": [],
    "productTypes": [],
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
            }

        default: return { ...state };
    }
}


