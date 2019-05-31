import axios from "axios";
import AppConfig from "../constants/AppConfig";
import { call } from "redux-saga/effects";


let token = localStorage.getItem('given_token');
let histogramUrl = AppConfig.baseURL + "/report/tap/histogram";
let headers = {
    'Content-Type': 'application/json',
    'Authorization': token
}

export function getHistogramCharts(data,locale,callback){

    headers["Accept-Language"]=locale;

    console.log("setting is ",data);
    // console.log("histogramUrl is ",histogramUrl);
    console.log("token is ",token);

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