import React from 'react';
import MUIDataTable from "mui-datatables";


import Pagination from 'rc-pagination';

import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';

// app config
import AppConfig from 'Constants/AppConfig';

class roleList extends React.Component {
	state = {
		theRoleslist: [],
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
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/filter', {
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
	paginatehandler = (SelectedPage,PageSize) => {
		this.setState({
			paginationCurrentpage: SelectedPage
		}, () => {
			this.callMainAPI();
		});
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
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify({
					"id": this.state.eachrole
				})
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				
				this.forceUpdate()
			}
		})();
		this.refs.deleteConfirmation.close();
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
							title={localStorage.getItem("Current_lang")=="en"?"Are you sure want to delete?":"از حذف این آیتم اطمینان دارید؟"}
							message={localStorage.getItem("Current_lang")=="en"?"This will delete permanently your item from  list.":"در صورت تایید این آیتم بصورت دائمی حذف خواهد شد"}
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
				<RctCollapsibleCard heading={<IntlMessages id="role.list" />} fullBlock>
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

export default roleList;
