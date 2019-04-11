/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';
import { Route, Redirect } from "react-router-dom";

import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from '../../constants/AppConfig';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';
import {DatePicker} from "react-advance-jalaali-datepicker";

const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')

class DataTable extends React.Component {
	state = {
		thetagslist: [],
	}
	componentDidMount = () => {	
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/request/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken,
					'Accept-Language': currentLanguagecode
				},
				body: JSON.stringify({
					"fromDate": this.state.chosenstartdate,
					"needPaginate": true,
					"pageNumber": 0,
					"pageSize": 10,
					"productProviderId": 0,
					"resultSize": 0,
					"tagBulkorderId": 0,
					"tagPackageId": 0,
					"tagPackageSeqEnd": 0,
					"tagPackageSeqStart": 0,
					"tagPackageTypeId": this.state.chosenpackagetypeID,
					"tagProviderId": this.state.chosentagproviderID,
					"tagRequestId": 0,
					"tagTypeId": this.state.chosentagtypeID,
					"toDate": this.state.chosenenddate
				})
			});
			const response = await rawResponse.json();
			
			if (response.status == 200 ){
				let nameinCurrentLang = {
                    lang_code: null,
                    nameinthisLang: null,
                    companynameinthislang: null,
                    descriptioninthislang: null
                }
				const thetagslist = response.result.dtos.map(each => {	
					each.userDTO.productproviderDTO.productproviderLangDTOS.map(eachlang => {
						if (currentLanguagecode == eachlang.languageDTO.code && eachlang.length > 0){
							nameinCurrentLang = {
								lang_code: eachlang.languageDTO.code,
								nameinthisLang: eachlang.name,
								companynameinthislang: eachlang.companyName,
								descriptioninthislang: eachlang.describtion
							}
						}
					})
					return({
                        id: each.id,
                        type: each.tagtypeDTO.title,
                        status: each.tagrequeststatusDTO.status,
                        statusCode: each.tagrequeststatusDTO.id,
                        createDate: each.creationDate,
						creator: each.userDTO.fullName,
						productProviderName: nameinCurrentLang.nameinthisLang,
                        packageType: each.tagPackageTypeDTO.title,
                        packageCount: each.packageCount
					})
				})
				this.setState(
					{thetagslist}
				)
			}
		})();
	}
	
	actionClickhandler = (id, action) => {
		switch(action) { 
			case "ViewPackage": { 
				this.props.history.push({
					pathname: '/horizontal/viewPackage',
					state: { tags_id: id }
				})
				break;  
			} 
			case "changeTagRequestStatus": { 
				this.props.history.push({
					pathname: '/horizontal/changeTagRequestStatus',
					state: { tags_id: id }
				})
				break;  
			} 
		} 
	}

	render() {  
		const columns = ["Status", "Tag Status Code", "Created By", "Tag Type", "Package Type", "Number Of Package", "Actions"];
		const data = this.state.thetagslist.map(eachtag => {
			return(
				[
					eachtag.statusCode, eachtag.creator + " (" + eachtag.productProviderName + ")", eachtag.type, eachtag.packageType , eachtag.packageCount,
                    
					<div>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'requestedTagsMoreinfo')} aria-label="more info">
							<i className="zmdi zmdi-info"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachtag.id, 'requestedTagsDelete')} aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
					</div>
				]
			)
		})
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
		
        const ViewNumberOptions = []
        for(let i = 0; i< AppConfig.toBshownResultNumberOptions.length; i++){
            ViewNumberOptions.push(<option value={AppConfig.toBshownResultNumberOptions[i]}>{AppConfig.toBshownResultNumberOptions[i]}</option>)
        }  
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title='لیست برچسب های درخواست شده' match={this.props.match} />
				<RctCollapsibleCard heading="لیست درخواست ها" fullBlock>
					<MUIDataTable
						title={"Users list"}
						data={data}
						columns={columns}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default DataTable;
