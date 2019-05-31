
const INIT_STATE = {
    "cities": [],
    "countries": [],
    "fromDate": "",
    "histogramInterval": "month",
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
    "toDate": ""
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {

        default: return { ...state };
    }
}
