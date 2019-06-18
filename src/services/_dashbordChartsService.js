import axios from "axios";
import AppConfig from "../constants/AppConfig";
import { call } from "redux-saga/effects";


let token = localStorage.getItem('given_token');
let histogramUrl = AppConfig.baseURL + "/report/tap/histogram";
let histogramFilterUrl = AppConfig.baseURL + "/report/param/filter";
let productPieUrl = AppConfig.baseURL + "/report/tap/product/pie";
let industryPieUrl = AppConfig.baseURL + "/report/tap/product/industry/pie";
let categoryPieUrl = AppConfig.baseURL + "/report/tap/product/category/pie";
let subCategoryPieUrl = AppConfig.baseURL + "/report/tap/product/category/sub/pie";
let providerPieUrl = AppConfig.baseURL + "/report/tap/product/provider/pie";
let manufacturerPieUrl = AppConfig.baseURL + "/report/tap/product/manufacturer/pie";
let provinceUrl = AppConfig.baseURL + "/report/tap/by/province";
let cityUrl = AppConfig.baseURL + "/report/tap/by/city";
let countryUrl = AppConfig.baseURL + "/report/tap/by/country";


let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
}

let originData = {
    "cities": [],
    "countries": [],
    "fromDate": "",
    "histogramInterval": "month",
    "id": 0,
    "industries": [],
    "manufacturers": [],
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
    "tagptypes" : [],
    "toDate": ""
  };

export function getHistogramCharts(data,locale,callback){

    headers["Accept-Language"]=locale;

    console.log("setting is ",data);
    // console.log("histogramUrl is ",histogramUrl);
    console.log("token is ",token);
    console.log("our ajax body is ",data);

    return axios.post(histogramUrl,data,{"headers":headers})
        .then(res => {
            const result = res.data;
            let label = '';                 
            var title = result.dtos.map(item =>{
                if(locale === 'en'){
                    label = (item.title.substring(0,10));
                }else{
                    label = item.title;
                }
                return label;
            } );
            var aggregationValue = result.dtos.map(item => {
                return item.aggregationValue
            });               
            console.log(title);
            callback(title,aggregationValue);
        });
        

}

export function getHistogramFilterData(data,locale){


    headers["Accept-Language"]=locale;

    return axios.post(histogramFilterUrl,data,{"headers":headers})
        .then(res => {
            const result = res.data;
            // console.info(res,"//////////");
            return result.dtos;               
        });
}


export function getPieChart(data,locale){

    headers["Accept-Language"]=locale;

    

    return axios.all([
        axios.post(productPieUrl,data,{"headers":headers}),
        axios.post(industryPieUrl,data,{"headers":headers}),
        axios.post(categoryPieUrl,data,{"headers":headers}),
        axios.post(subCategoryPieUrl,data,{"headers":headers}),
        axios.post(providerPieUrl,data,{"headers":headers}),
        axios.post(manufacturerPieUrl,data,{"headers":headers}),
        axios.post(provinceUrl,data,{"headers":headers}),
    ]).then(axios.spread(function (productRes,industryRes,catRes,subCatRes,providerRes,manRes,provinceRes) {
        let Result = {
            productPie:{},
            industryPie:{},
            catPie:{},
            subCatPie:{},
            providerPie:{},
            manufacturerPie:{},
            province:{}
         };
         var productResVal=formatData(productRes.data.dtos);
         Result.productPie.title = productResVal[0];
         Result.productPie.aggregationValue = productResVal[1];
         Result.productPie.ids = productResVal[2];

         var industryResVal=formatData(industryRes.data.dtos);
         Result.industryPie.title = industryResVal[0];
         Result.industryPie.aggregationValue = industryResVal[1];
         Result.industryPie.ids = industryResVal[2];

         var CatResVal=formatData(catRes.data.dtos);
         Result.catPie.title = CatResVal[0];
         Result.catPie.aggregationValue = CatResVal[1];
         Result.catPie.ids = CatResVal[2];

         var subCatResVal=formatData(subCatRes.data.dtos);
         Result.subCatPie.title = subCatResVal[0];
         Result.subCatPie.aggregationValue = subCatResVal[1];
         Result.subCatPie.ids = subCatResVal[2];

         var providerResVal=formatData(providerRes.data.dtos);
         Result.providerPie.title = providerResVal[0];
         Result.providerPie.aggregationValue = providerResVal[1];
         Result.providerPie.ids = providerResVal[2];

         var manResVal=formatData(manRes.data.dtos);
         Result.manufacturerPie.title = manResVal[0];
         Result.manufacturerPie.aggregationValue = manResVal[1];
         Result.manufacturerPie.ids = manResVal[2];

         var provinceResVal=formatProvinceData(provinceRes.data.dtos);
         Result.province.title = provinceResVal[0];
         Result.province.aggregationValue = provinceResVal[1];
         Result.province.keys = provinceResVal[2];
         Result.province.ids = provinceResVal[3];
         
         return Result;

      })).then(result => {
          return result;
            }
        );
}


function formatData(data){

    var aggregationValues = data.map(item => {
        return item.aggregationValue
    });

    var totalValues = data.map(item => item.title)

    var ids = data.map(item => item.id)

    return [totalValues,aggregationValues,ids];

}


function formatProvinceData(data){

    var aggregationValues = data.map(item => {
        return item.aggregationValue
    });

    var totalValues = data.map(item => item.title);

    var keys = data.map(item => item.key)

    var ids = data.map(item => item.id)

    return [totalValues,aggregationValues,keys,ids];

}


export function getAllFilterData(locale){

    let res = {
        pieData : {},
        geoData:{},
    };
    


    var promise1 = new Promise((resolve, reject)=>{

            headers["Accept-Language"]=locale;
            getPieChart(originData,locale).then((result)=>{
                res.pieData = result;
                // return res;
                getGeoData(originData,locale).then(result=>{
                    res.geoData = result;
                    resolve(res);
                    // return res;
                });
            });

    });
    return promise1;
    
}



function getGeoData(data,locale){
     headers["Accept-Language"]=locale;
    return axios.all([
        axios.post(provinceUrl,data,{"headers":headers}),
        axios.post(cityUrl,data,{"headers":headers}),
        axios.post(countryUrl,data,{"headers":headers}),

    ]).then(axios.spread(function (provinceRes,cityRes,countryRes) {
        let Result = {
            city:{},
            province:{},
            country:{},
         };

         var cityVal=formatData(cityRes.data.dtos);
         Result.city.title = cityVal[0];
         Result.city.aggregationValue = cityVal[1];
         Result.city.ids = cityVal[2];

         var countryResVal=formatData(countryRes.data.dtos);
         Result.country.title = countryResVal[0];
         Result.country.aggregationValue = countryResVal[1];
         Result.country.ids = countryResVal[2];

         var provinceResVal=formatData(provinceRes.data.dtos);
         Result.province.title = provinceResVal[0];
         Result.province.aggregationValue = provinceResVal[1];
         Result.province.ids = provinceResVal[2];

         return Result;

    }));
}