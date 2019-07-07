/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";


import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';
import { Route, Redirect } from "react-router-dom";

// app config
import AppConfig from '../../constants/AppConfig';

const giventoken = localStorage.getItem('given_token')

class DataTable extends React.Component {
	state = {
		theactionslist: [],
		eachaction:""
	}

	componentDidMount = () => {		
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/filter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('given_token')
			},
			body: JSON.stringify({
                "fromDate": "",
                "needPaginate": true,
                "pageNumber": 0,
                "pageSize": 500,
                "resultSize": 0,
                "termToFind": "",
                "toDate": ""
              })
			});
			const response = await rawResponse.json();
			console.log(response);
			if (response.status == 200 ){
				console.log('success');
				
				const theactionslist = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
						description: each.description,
						path: each.path
					})
				})
				
				this.setState(
					{theactionslist}
				)
			}
		})();
	}

	actionClickhandler = (id, uname, action) => {
		switch(action) { 
			case "edit": { 
				this.props.history.push({
					pathname: 'editAction',
					state: { actionname: uname, action_id: id }
				})
				break; 
			}
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}
	onDeleteAction = ( eachaction ) => {
		this.refs.deleteConfirmation.open();
		this.setState({
			eachaction :eachaction
		})
	}
	deletehandler = () => {
		console.log('going to delete', this.state.eachaction);
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify({
					"id": this.state.eachaction
				})
			});
			const response = await rawResponse.json();
			console.log('delete response',response);
			if (response.status == 200 ){
				this.forceUpdate()
			}
		})();
	} 

	render() {
		const columns = ["Action Title", "Action Path", "Action Description", "Actions"];
		const columnsfa = ["نام اقدام", "مسیر اقدام", "توضیحات", "اقدامات"];
		const lang=localStorage.getItem('Current_lang')
		var tablemessage = lang =="en" ? "Sorry, no matching records found" : "متاسفانه ،اطلاعات مورد نظر  پیدا نشد"
		const data = this.state.theactionslist.map(eachaction => {
			return(
				[eachaction.name, eachaction.path , eachaction.description, 
					<div>
						<IconButton className="text-danger" onClick={() => { this.onDeleteAction(eachaction.id)} } aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachaction.id, eachaction.name, 'edit')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<DeleteConfirmationDialog
							ref="deleteConfirmation"
							title="Are you sure want to delete?"
							message="This will delete permanently your feedback from feedback list."
							onConfirm={()=>this.deletehandler()}
						/>
					</div>
				]
			)
		})
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked',
			selectableRows: false,
			textLabels: {
				body: {
				  noMatch: tablemessage,
				},
			}
		};
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.dataTable" />} match={this.props.match} />
				<RctCollapsibleCard heading={<IntlMessages id="action.list" />} fullBlock>
					<MUIDataTable
						title={<IntlMessages id="action.list" />}
						data={data}
						columns={lang =="en"?columns:columnsfa}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default DataTable;
