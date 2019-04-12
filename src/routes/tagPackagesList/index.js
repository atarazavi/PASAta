/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

import { Badge } from 'reactstrap';
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

const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')

class DataTable extends React.Component {
	state = {
        thetagPackagesList: [],
        tagPackageIdStart: 0,
        tagPackageIdEnd: 0,
		chosennumofresults: 15,
	}
	componentDidMount = () => {		
		this.callMainAPI();
	}
	handleFilterApply = () =>{
		this.callMainAPI()
	}
	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/package/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken,
					'Accept-Language': currentLanguagecode
				},
				body: JSON.stringify({
                    "needPaginate": true,
                    "pageNumber": 0,
                    "pageSize": this.state.chosennumofresults,
                    "resultSize": 0,
                    "tagPackaged": 0,
                    "tagBulkorderId": 0,
                    "tagPackageIdEnd": this.state.tagPackageIdEnd,
                    "tagPackageIdStart": this.state.tagPackageIdStart,
                    "tagRequestId": 0
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
				const thetagPackagesList = response.result.dtos.map(each => {	
					each.tagBulkorderDTO.userDTO.productproviderDTO.productproviderLangDTOS.map(eachlang => {
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
                        statusCode: each.tagRequestDTO.id,
                        packageType: each.tagBulkorderDTO.tagPackageTypeDTO.title,
                        packageCount: each.tagBulkorderDTO.packageCount
					})
				})
				this.setState(
					{thetagPackagesList}
				)
			}
		})();
	}
	actionClickhandler = (id,name) => {
        this.props.history.push({
            pathname: '/horizontal/tagPoolList',
            state: { package_id: id, package_name: name }
        })
	}
	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	render() {  
        const badgestyle = {
            width: "20px",
            height: "20px",
            borderRadius: "50px",
            padding: 0,
            marginBottom: "-4px"
        }
		const columns = ["Status", "Package Code", "Package Type", "Actions"];
		const data = this.state.thetagPackagesList.map(each => {
			return(
				[
					each.statusCode == null ? 
						<Tooltip id="tooltip-fab" title={each.status}>
							<Badge style={badgestyle} color="success"> </Badge>
						</Tooltip>
					: 
						<Tooltip id="tooltip-fab" title={each.status}>
							<Badge style={badgestyle} color="warning"> </Badge> 
						</Tooltip>	
                    ,
                    each.id, each.packageType ,
                    <IconButton className="text-success" onClick={() => this.actionClickhandler(each.id, each.name)}>
                        <i className="zmdi zmdi-eye"></i>
                    </IconButton>
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
						<div className="top-filter clearfix p-20">
							<FormGroup className="w-20">
								<Label for="tagPackageIdStart">شناسه بسته از:</Label>
								<Input onChange={this.handleChange} type="text" name="tagPackageIdStart" id="tagPackageIdStart" placeholder="Tag Package ID Start from" />							
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="tagPackageIdEnd">تا:</Label>
								<Input onChange={this.handleChange} type="text" name="tagPackageIdEnd" id="tagPackageIdEnd" placeholder="Tag Package ID Start to" />							
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="Select">Number of Results:</Label>
								<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
									{ViewNumberOptions}
								</Input>
							</FormGroup>
							<FormGroup className="mb-5">
								<Label className="d-block">&nbsp;</Label>
								<Button onClick={this.handleFilterApply} color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="widgets.apply" /></Button>
							</FormGroup>
						</div>
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
