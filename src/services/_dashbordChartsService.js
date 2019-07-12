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
let locationUrl = AppConfig.baseURL + "/tap/location/filter";
let tableFilterUrl = AppConfig.baseURL + "/tap/filter";



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

let tableData = {
    "cityId": 0,
    "countryId": 0 ,
    "fromDate": "",
    "histogramInterval": "month",
    "manufacturerId": 0,
    "needPaginate": true,
    "pTypeId": 0,
    "pageNumber": 0,
    "pageSize": 10,
    "productSubcategoryId": 0,
    "productcategoryId": 0,
    "productproviderId": 0,
    "provinceId": 0,
    "ptypeId": 11,
    "reportStarting": "all",
    "resultSize": 0,
    "tagproviderId": 0,
    "toDate": ""
  }

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
    data = JSON.stringify(data);
    tableData.toDate = data.toDate;
    tableData.fromDate = data.fromDate;

    return axios.all([
        axios.post(productPieUrl,data,{"headers":headers}),
        axios.post(industryPieUrl,data,{"headers":headers}),
        axios.post(categoryPieUrl,data,{"headers":headers}),
        axios.post(subCategoryPieUrl,data,{"headers":headers}),
        axios.post(providerPieUrl,data,{"headers":headers}),
        axios.post(manufacturerPieUrl,data,{"headers":headers}),
        axios.post(provinceUrl,data,{"headers":headers}),
        axios.post(locationUrl,data,{"headers":headers}),
        axios.post(tableFilterUrl,tableData,{"headers":headers}),
    ]).then(axios.spread(function (productRes,industryRes,catRes,subCatRes,providerRes,manRes,provinceRes,locationRes,tableFilterRes) {
        let Result = {
            productPie:{},
            industryPie:{},
            catPie:{},
            subCatPie:{},
            providerPie:{},
            manufacturerPie:{},
            province:{},
            heatmap:{},
            tableFilter:{}
         };
        //  console.info("res",provinceRes);
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

        //  console.log("location response",locationRes);
         var locationResVal =formatLocationData(locationRes.data.result.dtos);
         Result.heatmap = locationResVal;

         Result.tableFilter = tableFilterRes.data;
         console.info('table filter is ',Result.tableFilter);

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

function formatLocationData(data){
    let result = [];
    data.forEach(element => {
        let arr = [];
        arr.push(element.locx);
        arr.push(element.locy);
        arr.push("100");
        result.push(arr);
    });

    // console.info("result info is ",result);
    return result;
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
        STARTING_DATE:[],
        HISTORGAM_INTERVAL: [],
        TAP_AUTH_RESULT_TYPE: [],
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
                    getStartingDate(locale).then(result => {
                        res.STARTING_DATE = result.data.dtos;
                        getTapData(locale).then(result=>{
                            res.TAP_AUTH_RESULT_TYPE = result.data.dtos;
                            getHistogramInterval(locale).then(result=>{
                                res.HISTORGAM_INTERVAL = result.data.dtos;
                                resolve(res);
                            }); 
                        })
                    })
                   
                    // return res;
                });
            });

    });
    return promise1;
    
}

function getStartingDate(locale){
    const url = AppConfig.baseURL + '/report/param/filter';
    headers["Accept-Language"]=locale;
    return axios.post(url,{"key" : "STARTING_DATE"},{"headers":headers});       
        // STARTING_DATE: content.dtos
}

function getTapData(locale){
    const url =  AppConfig.baseURL + '/report/param/filter';
    headers["Accept-Language"]=locale;
    return axios.post(url,{"key" : "TAP_AUTH_RESULT_TYPE"},{"headers":headers});  
}

function getHistogramInterval(locale){
    const url =  AppConfig.baseURL + '/report/param/filter';
    headers["Accept-Language"]=locale;
    return axios.post(url,{"key" : "HISTORGAM_INTERVAL"},{"headers":headers});
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