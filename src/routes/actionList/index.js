import React from 'react';
import MUIDataTable from "mui-datatables";


import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"

import Pagination from 'rc-pagination';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';

import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from 'Constants/AppConfig';

class ActionList extends React.Component {
	state = {
		theactionslist: [],
		eachaction:"",
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
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/filter', {
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
				
				if (response.result.paginateModel.totalCount / this.state.chosennumofresults > 1) {
					this.setState(
						{
							theactionslist,
							pagination: true,
							paginationTotal: response.result.paginateModel.totalCount,
						}
					)
				}else{
					this.setState(
						{theactionslist}
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
			case "edit": { 
				this.props.history.push({
					pathname: 'editAction',
					state: { actionname: uname, action_id: id }
				})
				break; 
			}
			default: { 
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
						<Tooltip id="tooltip-fab" title={<IntlMessages id="delete"/>}>
							<IconButton className="text-danger" onClick={() => { this.onDeleteAction(eachaction.id)} } aria-label="Delete">
								<i className="zmdi zmdi-close"></i>
							</IconButton>	
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="edit"/>}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachaction.id, eachaction.name, 'edit')} aria-label="Edit">
								<i className="zmdi zmdi-edit"></i>
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
				<RctCollapsibleCard heading={<IntlMessages id="action.list" />} fullBlock>
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

export default ActionList;
