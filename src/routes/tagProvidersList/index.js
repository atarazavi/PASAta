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
		theProviderslist: [],
		chosennumofresults: 10,
		toBsearched: ''
	}
	componentDidMount = () => {	
		this.callMainAPI();	
	}
	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken,
					'Accept-Language': currentLanguagecode
				},
				body: JSON.stringify({
					"fromDate": "",
					"needPaginate": true,
					"pageNumber": 0,
					"pageSize": this.state.chosennumofresults,
					"resultSize": 0,
					"termToFind": this.state.toBsearched,
					"toDate": ""
				  })
			});
			const response = await rawResponse.json();
			
			if (response.status == 200 ){
				const theProviderslist = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
					})
				})
				this.setState(
					{theProviderslist}
				)
			}
		})();
	}
	actionClickhandler = (id, name, action) => {
		console.log('id', id, 'name', name, 'action', action);
		
		switch(action) { 
			case "edit": { 
				this.props.history.push({
					pathname: 'editTagProvider',
					state: { provider_id: id, provider_name: name }
				})
				break;  
			} 
			case "delete": { 
				this.props.history.push({
					pathname: 'deleteTagProvider',
					state: { provider_id: id, provider_name: name }
				})
				break;  
			} 
		} 
	}
	handleFilterApply = () =>{
		this.callMainAPI()
	}
	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}
	render() {  
		const columns = ["ID", "Provider Title", "Actions"];
		const data = this.state.theProviderslist.map(each => {
			return(
				[
					each.id, each.name,
					<div>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(each.id, each.name, 'edit')} aria-label="more info">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(each.id, each.name, 'delete')} aria-label="Delete">
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
				<PageTitleBar title='لیست تامین کنندگان برچسب ها' match={this.props.match} />
				<RctCollapsibleCard heading="تامین کنندگان" fullBlock>
						<div className="top-filter clearfix p-20">
							<FormGroup className="w-20">
								<Label for="search">Search:</Label>
								<Input onChange={this.handleChange} type="text" name="toBsearched" id="search" placeholder="type a word to search..." />							
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
						title={"List of Tag providers"}
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
