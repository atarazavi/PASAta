import axios from "axios";
import AppConfig from "../constants/AppConfig";
import { call } from "redux-saga/effects";


let token = localStorage.getItem('given_token');
let histogramUrl = AppConfig.baseURL + "/report/tap/histogram";
let productPieUrl = AppConfig.baseURL + "/report/tap/product/pie";
let industryPieUrl = AppConfig.baseURL + "/report/tap/product/industry/pie";
let categoryPieUrl = AppConfig.baseURL + "/report/tap/product/category/pie";
let subCategoryPieUrl = AppConfig.baseURL + "/report/tap/product/category/sub/pie";
let providerPieUrl = AppConfig.baseURL + "/report/tap/product/provider/pie";
let manufacturerPieUrl = AppConfig.baseURL + "/report/tap/product/manufacturer/pie";

let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
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


export function getPieChart(data,locale){

    headers["Accept-Language"]=locale;

    

    return axios.all([
        axios.post(productPieUrl,data,{"headers":headers}),
        axios.post(industryPieUrl,data,{"headers":headers}),
        axios.post(categoryPieUrl,data,{"headers":headers}),
        axios.post(subCategoryPieUrl,data,{"headers":headers}),
        axios.post(providerPieUrl,data,{"headers":headers}),
        axios.post(manufacturerPieUrl,data,{"headers":headers}),
    ]).then(axios.spread(function (productRes,industryRes,catRes,subCatRes,providerRes,manRes) {
        let Result = {
            productPie:{},
            industryPie:{},
            catPie:{},
            subCatPie:{},
            providerPie:{},
            manufacturerPie:{},
         };
         var productResVal=formatData(productRes.data.dtos);
         Result.productPie.title = productResVal[0];
         Result.productPie.aggregationValue = productResVal[1];

         var industryResVal=formatData(industryRes.data.dtos);
         Result.industryPie.title = industryResVal[0];
         Result.industryPie.aggregationValue = industryResVal[1];

         var CatResVal=formatData(catRes.data.dtos);
         Result.catPie.title = CatResVal[0];
         Result.catPie.aggregationValue = CatResVal[1];

         var subCatResVal=formatData(subCatRes.data.dtos);
         Result.subCatPie.title = subCatResVal[0];
         Result.subCatPie.aggregationValue = subCatResVal[1];

         var providerResVal=formatData(providerRes.data.dtos);
         Result.providerPie.title = providerResVal[0];
         Result.providerPie.aggregationValue = providerResVal[1];

         var manResVal=formatData(manRes.data.dtos);
         Result.manufacturerPie.title = manResVal[0];
         Result.manufacturerPie.aggregationValue = manResVal[1];

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

    return [totalValues,aggregationValues];

}