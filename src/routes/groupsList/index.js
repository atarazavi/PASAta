import React from 'react';
import MUIDataTable from "mui-datatables";

import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import Tooltip from '@material-ui/core/Tooltip';

import IconButton from '@material-ui/core/IconButton';

// app config
import AppConfig from 'Constants/AppConfig';

class DataTable extends React.Component {
	state = {
		thegroupslist: [],
		groupid:"",
		pagination: false,
		chosennumofresults: 10,
		paginationTotal: 0,
		paginationCurrentpage: 0
	}

	componentDidMount = () => {		
		this.callMainAPI()
	}
	callMainAPI = () => {		
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
				"pageNumber": this.state.paginationCurrentpage,
				"pageSize": this.state.chosennumofresults,
				"resultSize": 0,
				"termToFind": "",
				"toDate": ""
			  })
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				const theList = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
						description: each.description
					})
				})
				if (response.result.paginateModel.totalCount / this.state.chosennumofresults > 1) {
					this.setState(
						{
							thegroupslist: theList,
							pagination: true,
							paginationTotal: response.result.paginateModel.totalCount,
						}
					)
				}else{
					this.setState(
						{
							thegroupslist: theList
						}
					)
				}
			}
		})();
	}
	paginatehandler = (SelectedPage,PageSize) => {
		this.setState({
			paginationCurrentpage: SelectedPage
		}, () => {
			this.callMainAPI();
		});
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
						<Tooltip title={<IntlMessages id="delete.tooltip" />}>
						<IconButton className="text-danger" onClick={() => this.onDeleteGroup(eachgroup.id)}  aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
						</Tooltip>
						<Tooltip title={<IntlMessages id="Edit.tooltip" />}>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'edit')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						</Tooltip>
						<Tooltip title={<IntlMessages id="GroupRule.tooltip" />}>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'changeGroupRole')} aria-label="changeGroupRole">
							<i className="zmdi zmdi-account-circle"></i>
						</IconButton>
						</Tooltip>
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
			filter: false,
			responsive: 'scroll',
			selectableRows: false,
			download: false,
			print: false,
			search: false,
			viewColumns: false,
			sort: true,
			pagination: false
		};
		return (
			<div className="data-table-wrapper">
				<RctCollapsibleCard heading={<IntlMessages id="compenets.grouplist" />} fullBlock>
					<MUIDataTable
						title={this.state.pagination ? 
							<Pagination 
								className="ant-pagination" 
								onChange={this.paginatehandler} 
								defaultCurrent={this.state.paginationCurrentpage} 
								total={this.state.paginationTotal}
								pageSize={this.state.chosennumofresults} 
							/> 
						: ''}
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
