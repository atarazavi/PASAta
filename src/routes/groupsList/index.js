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
		thegroupslist: [],
		groupid:""
	}

	componentDidMount = () => {				
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/filter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('given_token')
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
			console.log(response);
			if (response.status == 200 ){
				console.log('success');
				
				const theList = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
						description: each.description
					})
				})
				
				this.setState(
					{thegroupslist: theList}
				)
				console.log('state', this.state.thegroupslist);
			}
		})();
	}

	actionClickhandler = (id, uname, action) => {
		switch(action) { 
			case "changeGroupRole": { 
				this.props.history.push({
					pathname: 'changeGroupRole',
					state: { groupname: uname, group_id: id }
				})
				break;  
			} 
			case "edit": { 
				this.props.history.push({
					pathname: 'editGroup',
					state: { grouupname: uname, grouup_id: id }
				})
				break; 
			}
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}

	deletehandler = () => {
		
		console.log('going to delete', this.state.groupid);
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify({
					"id": this.state.groupid
				})
			});
			const response = await rawResponse.json();
			console.log('delete response',response);
			if (response.status == 200 ){
				this.forceUpdate()
			}
		})();
	}
	onDeleteGroup =(groupID)=>{
		this.refs.deleteConfirmation.open();
		this.setState({
			groupid:groupID
		})
	}
	render() {
		const lang=localStorage.getItem('Current_lang')
		const columns = ["Group Username", "Description", "Actions"];
		const columnsfa = ["نام کاربری گروه", "توضیحات", "اقدامات"];
		var tablemessage = lang =="en" ? "Sorry, no matching records found" : "متاسفانه ،اطلاعات مورد نظر  پیدا نشد"
		const data = this.state.thegroupslist.map(eachgroup => {
			return(
				[eachgroup.name, eachgroup.description, 
					<div>
						<IconButton className="text-danger" onClick={() => this.onDeleteGroup(eachgroup.id)}  aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'edit')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'changeGroupRole')} aria-label="changeGroupRole">
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
				<RctCollapsibleCard heading={<IntlMessages id="compenets.grouplist" />} fullBlock>
					<MUIDataTable
						title={<IntlMessages id="compenets.grouplist" />}
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
