/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";

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
		thegroupslist: []
	}

	componentDidMount = () => {		
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/filter', {
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
			}
		})();
		}

	actionClickhandler = (id, uname, action) => {
		switch(action) { 
			case "changepass": { 
				this.props.history.push({
					pathname: '/horizontal/changePass',
					state: { username: uname, user_id: id }
				})
				break;  
			} 
			case "edit": { 
				this.props.history.push({
					pathname: '/horizontal/editUser',
					state: { username: uname, user_id: id }
				})
				break; 
			}
			case "groups": { 
				this.props.history.push({
					pathname: '/horizontal/changePass',
					state: { username: uname, user_id: id }
				})
				break; 
			} 
			case "roles": { 
				this.props.history.push({
					pathname: '/horizontal/changeRoles',
					state: { username: uname, user_id: id }
				})
				break; 
			}  
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}

	deletehandler = (userid) => {
		console.log('going to delete', userid);
	}

	render() {
		const columns = ["Group Username", "Description", "Actions"];
		const data = this.state.thegroupslist.map(eachgroup => {
			return(
				[eachgroup.name, eachgroup.description, 
					<div>
						<IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ eachgroup.name +'?')) this.deletehandler(eachgroup.id) } } aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'edit')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachgroup.id, eachgroup.name, 'changepass')} aria-label="changepass">
							<i className="zmdi zmdi-account-circle"></i>
						</IconButton>
					</div>
				]
			)
		})
		// const data = [
		// 	["Gabby George", "Business Analyst", "Minneapolis", 30, "$100,000"],
		// 	["Aiden Lloyd", "Business Consultant", "Dallas", 55, "$200,000"],
		// ];
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.dataTable" />} match={this.props.match} />
				<RctCollapsibleCard heading="Data Table" fullBlock>
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
