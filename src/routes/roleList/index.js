/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"
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
		theRoleslist: []
	}

	componentDidMount = () => {		
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/filter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': giventoken
			},
			body: JSON.stringify({
                "fromDate": "",
                "needPaginate": true,
                "pageNumber": 0,
                "pageSize": 10,
                "resultSize": 0,
                "termToFind": "",
                "toDate": ""
              })
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				const theRoleslist = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
						description: each.description
					})
				})
				this.setState(
					{theRoleslist}
				)
			}
		})();
	}

	actionClickhandler = (id, uname, action) => {
		switch(action) { 
			case "editRole": { 
				this.props.history.push({
					pathname: 'editRole',
					state: { roleName: uname, role_id: id }
				})
				break;  
			} 
			case "addAction2Role": { 
				this.props.history.push({
					pathname: 'addAction2Role',
					state: { roleName: uname, role_id: id }
				})
				break; 
			}
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}
	onDeleteList = ( eachrole ) => {
		this.refs.deleteConfirmation.open();
		this.setState({
			eachrole :eachrole
		})
	}

	deletehandler = () => {
		console.log('going to delete', this.state.eachrole);
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken
				},
				body: JSON.stringify({
					"id": this.state.eachrole
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
		const lang=localStorage.getItem('Current_lang')
		const columns = ["Group Username", "Description", "Actions"];
		const columnsfa = ["نام کاربری گروه", "توضیحات", "اقدامات"];
		var tablemessage = lang =="en" ? "Sorry, no matching records found" : "متاسفانه ،اطلاعات مورد نظر  پیدا نشد"
		const data = this.state.theRoleslist.map(eachrole => {
			return(
				[eachrole.name, eachrole.description, 
					<div>
						<IconButton className="text-danger" onClick={() => {  this.onDeleteList(eachrole.id) } } aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachrole.id, eachrole.name, 'editRole')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachrole.id, eachrole.name, 'addAction2Role')} aria-label="addAction2Role">
							<i className="zmdi zmdi-account-circle"></i>
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
				<RctCollapsibleCard heading={<IntlMessages id="role.list" />} fullBlock>
					<MUIDataTable
						title={<IntlMessages id="role.list" />}
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
