/**
 * Data Table
 */
import React from 'react';
import {connect} from 'react-redux';

import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

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
                        product_attributes:[
                            {
                                p_attr_title:result.product_attributes[0].p_attr_title,
                                p_attr_value_number:result.product_attributes[0].p_attr_value_number,
                                p_attr_unit_title:result.product_attributes[0].p_attr_unit_title,
                            },{
                                p_attr_title:result.product_attributes[1].p_attr_title,
                                p_attr_value_number:result.product_attributes[1].p_attr_value_number,
                                p_attr_unit_title:result.product_attributes[1].p_attr_unit_title,
                            },{
                                p_attr_title:result.product_attributes[2].p_attr_title,
                                p_attr_value_dictionary_items:result.product_attributes[2].p_attr_value_dictionary_items,
                            },{
                                p_attr_title:result.product_attributes[3].p_attr_title,
                                p_attr_value_char:result.product_attributes[3].p_attr_value_char,
                                p_attr_unit_title:result.product_attributes[3].p_attr_unit_title,
                            },{
                                p_attr_title:result.product_attributes[4].p_attr_title,
                                p_attr_value_numberTo:result.product_attributes[4].p_attr_value_numberTo,
                                p_attr_value_numberFrom:result.product_attributes[4].p_attr_value_numberFrom,
                                p_attr_unit_title:result.product_attributes[4].p_attr_unit_title,
                            },
                        ],
                        "gis_country_title":result.gis_country_title,
                        "gis_province_title":result.gis_province_title,
                        "gis_city_title":result.gis_city_title,
                        "gis_location":result.gis_location,
                        "gis_address":result.gis_address
                    }
                })
            }
            // return result.dtos;               
        });
	}
	
	render() {  
		return (
			<div className="data-table-wrapper">
    				<RctCollapsibleCard heading={<IntlMessages id='product.result' />} fullBlock>
						<h3 style={{textAlign:'center'}} >{this.state.tap_result}</h3>
                    </RctCollapsibleCard>
                    <RctCollapsibleCard heading={<IntlMessages id='product.tag' />} fullBlock>
                        <p className={"ml-3 mr-3"}><span style={{fontWeight:'bold'}}>{this.state.tag_type_title}: </span> {this.state.tag_key}</p>
				    </RctCollapsibleCard>
			</div>
		);
	}
}

function mapStateToProps(state) {

    return {locale:state.settings.locale.locale }
  }

export default connect(mapStateToProps)(ProductTap);
