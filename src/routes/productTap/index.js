/**
 * Data Table
 */
import React from 'react';
import {connect} from 'react-redux';

import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
// import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';

import {formatResult} from '../../helpers/helpers';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import LocationMapChart from '../../components/Charts/Dashbord/LocationMapChart';

import axios from "axios";
// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';
import { Route, Redirect } from "react-router-dom";

import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from '../../constants/AppConfig';

let token = localStorage.getItem('given_token');
let tapUrl = AppConfig.baseURL + "/tap/findbyid";

// const useStyles = makeStyles({
//     root: {
//       display: 'flex'
//     },
//   });
class ProductTap extends React.Component {
	state = {
		tap_result: '',
		tap_id: '',
        tag_type_title: '',
        tag_key: '',
        product_type_name:'',
        product_manufacturer_title:'',
        product_provider_title:'',
        product_industry_title:'',
        product_category_title:'',
        product_sub_category_title:'',
        product_attributes:[
            {
                "p_attr_id": 0,
                "p_attr_title": "",
                "p_attr_data_type": "",
                "p_attr_value_id": 0,
                "p_attr_value_char": null,
                "p_attr_value_number": 0,
                "p_attr_value_numberTo": 0,
                "p_attr_value_numberFrom": 0,
                "p_attr_value_dictionary_items": {},
                "p_attr_unit_id": 0,
                "p_attr_unit_title": ""
            },
            {
                "p_attr_id": 0,
                "p_attr_title": "",
                "p_attr_data_type": "",
                "p_attr_value_id": 0,
                "p_attr_value_char": null,
                "p_attr_value_number": 0,
                "p_attr_value_numberTo": 0,
                "p_attr_value_numberFrom": 0,
                "p_attr_value_dictionary_items": {},
                "p_attr_unit_id": 0,
                "p_attr_unit_title": ""
            },
            {
                "p_attr_id": 0,
                "p_attr_title": "",
                "p_attr_data_type": "",
                "p_attr_value_id": 0,
                "p_attr_value_char": null,
                "p_attr_value_number": 0,
                "p_attr_value_numberTo": 0,
                "p_attr_value_numberFrom": 0,
                "p_attr_value_dictionary_items": {
                    "654": "",
                    "657": ""
                },
                "p_attr_unit_id": 0,
                "p_attr_unit_title": ""
            },
            {
                "p_attr_id": 0,
                "p_attr_title": "",
                "p_attr_data_type": "",
                "p_attr_value_id": 0,
                "p_attr_value_char": "",
                "p_attr_value_number": 0,
                "p_attr_value_numberTo": 0,
                "p_attr_value_numberFrom": 0,
                "p_attr_value_dictionary_items": {},
                "p_attr_unit_id": 0,
                "p_attr_unit_title": ""
            },
            {
                "p_attr_id": 0,
                "p_attr_title": "",
                "p_attr_data_type": "",
                "p_attr_value_id": 0,
                "p_attr_value_char": null,
                "p_attr_value_number": 0,
                "p_attr_value_numberTo": 0,
                "p_attr_value_numberFrom": 0,
                "p_attr_value_dictionary_items": {},
                "p_attr_unit_id": 0,
                "p_attr_unit_title": ""
            },
        ],
        "gis_country_id": 0,
        "gis_country_title": "",
        "gis_province_id": 0,
        "gis_province_title": "",
        "gis_city_id": 0,
        "gis_city_title": "",
        "gis_location_result": "",
        "gis_location": {
            "locx": 0,
            "locy": 0
        },
        "gis_address": "",
        "clint_ip": "",
        "client_device": "",


    }
	componentDidMount = () => {	
        let locale = this.props.local;
		this.callMainAPI(locale);	
    }
    
    componentWillReceiveProps(nextProps) {
        let locale = nextProps.local;
		this.callMainAPI(locale);	
    }

	callMainAPI = (locale) => {
        let param = this.props.match.params.tapid;
        console.info('param is ',param);
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
            'Accept-Language':locale
        };
        let data = {"key":param};
        return axios.post(tapUrl,data,{"headers":headers})
        .then(res => {
            const result = res.data.result.dto;
            console.info("tap response is",result);

            if(res.data.message === 'success'){
                this.setState(prevState=>{
                    return {
                        ...prevState,
                        tap_result:result.tap_result,
                        tap_id:result.tap_id,
                        "tag_key": result.tag_key,
                        tag_type_title: result.tag_type_title,
                        product_type_name:result.product_type_name,
                        product_manufacturer_title:result.product_manufacturer_title,
                        product_provider_title:result.product_provider_title,
                        product_industry_title:result.product_industry_title,
                        product_category_title:result.product_category_title,
                        product_sub_category_title:result.product_sub_category_title,
                        product_attributes:result.product_attributes,
                        "gis_country_title":result.gis_country_title,
                        "gis_province_title":result.gis_province_title,
                        "gis_city_title":result.gis_city_title,
                        "gis_location":result.gis_location,
                        "gis_address":result.gis_address,
                        "clint_ip":result.clint_ip,
                        "client_device":result.client_device
                    }
                })
            }
            // return result.dtos;               
        });
	}
    formatAttributes(attr){
        console.info("attr res is ",attr);
        let result = [];
        for(let item of attr){
            console.info("item res is ",item);
            let name = item['p_attr_title'];
            let unit = "";
            let value_char="";
            let number = "";
            let range="";
            let items="";
            if(item['p_attr_unit_id']){
                unit += item['p_attr_unit_title'];
            }
            if(item["p_attr_value_char"]){
                value_char += item['p_attr_value_char'];
            }
            if(item['p_attr_value_number']){
                number += item['p_attr_value_number'];
            }
            if(item['p_attr_value_numberFrom']){
                range += item['p_attr_value_numberFrom'] + "-"+item['p_attr_value_numberTo'];
            }
            if(item['p_attr_value_dictionary_items']){
                let colors = Object.values(item['p_attr_value_dictionary_items']).join(" ");
                items += colors;  
            }
            result.push([name,value_char+" " +number+ " " + range + " " + items+unit]);
        }
        console.info("loop res is ",result);
        return result;
    }
	render() {
        // const classes = useStyles();
        // let colors = Object.values(this.state.product_attributes[2].p_attr_value_dictionary_items).join(" ");
        let properties = this.formatAttributes(this.state.product_attributes);
        let resultProps = properties.map( (item)=>{
            return <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}> {item[0]}: </span> {item[1]} </p>;
        } );  
		return (
			<div className="data-table-wrapper">
    				<RctCollapsibleCard heading={<IntlMessages id='product.result' />} fullBlock>
						<h3 style={{textAlign:'center',padding:20,color:formatResult(this.state.tap_result)[1]}}  > {formatResult(this.state.tap_result)[0]}</h3>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.tag' />} fullBlock>
                        <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.tag_key" />: </span> {this.state.tag_key}</p>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.product' />} fullBlock>
                        <div style={{display:"flex",flexDirection: 'column'}}>
                            <div style={{display:"flex",flexWrap: 'nowrap'}}> 
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.product_type_name" />: </span> {this.state.product_type_name}</p>
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.product_manufacturer_title" />: </span> {this.state.product_manufacturer_title}</p>
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.product_provider_title" />: </span> {this.state.product_provider_title}</p>
                            </div>
                            <div style={{display:"flex",flexWrap: 'nowrap'}}>    
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.product_category_title" />: </span> {this.state.product_industry_title} - {this.state.product_category_title} - {this.state.product_sub_category_title}</p>
                            </div>    
                        </div>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.properties' />} fullBlock>
                        {resultProps}
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.geo' />} fullBlock>
                        <div style={{display:"flex",flexDirection: 'column'}}>
                            <div style={{display:"flex",flexDirection: 'row'}}>
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.country" />: </span> {this.state.gis_country_title}</p>
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.province" />: </span> {this.state.gis_province_title}</p>
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.city" />: </span> {this.state.gis_city_title}</p>
                            </div>
                            <div style={{display:"flex",flexDirection: 'row'}}>    
                                <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.address" />: </span> {this.state.gis_address}</p>
                            </div>    
                        </div>
                        <LocationMapChart locx={this.state.gis_location.locx} locy={this.state.gis_location.locy} />
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.client' />} fullBlock>
                        <div style={{display:"flex",flexDirection: 'row'}}>
                            <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.client_device" />: </span> {this.state.client_device}</p>
                            <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}><IntlMessages id="product.clint_ip" />: </span> {this.state.clint_ip}</p>
                        </div>    
                    </RctCollapsibleCard>
			</div>
		);
    }
    
}

function mapStateToProps(state) {

    return {locale:state.settings.locale.locale }
}



export default connect(mapStateToProps)(ProductTap);
