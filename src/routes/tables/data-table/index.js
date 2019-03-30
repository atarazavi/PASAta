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
import AppConfig from '../../../constants/AppConfig';
import Tooltip from '@material-ui/core/Tooltip';
import reactElementToJSXString from 'react-element-to-jsx-string';

const giventoken = localStorage.getItem('given_token')

class DataTable extends React.Component {
	state = {
		theuserslist: [],
		open: false,
		error:""
	}

	componentDidMount = () => {		
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/filter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': giventoken
			},
			body: JSON.stringify({
				"fromDate": "",
				"groupId": 0,
				"needPaginate": true,
				"pageNumber": 0,
				"pageSize": 10,
				"productProviderId": 76,
				"resultSize": 0,
				"roleId": 0,
				"toDate": "",
				"termToFind": ""
			  })
			});
			const response = await rawResponse.json();
			console.log(response);
			if (response.status == 200 ){
				console.log('success');
				
				// it should be gotten from sth like localstorage
				const currentlanguage = 'fa'
				// it should be gotten from sth like localstorage
				let nameinCurrentLang = {}
				const theList = response.result.dtos.map(each => {			
					each.productproviderDTO.productproviderLangDTOS.map(eachlang => {
						if (currentlanguage == eachlang.languageDTO.code){
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
						username: each.username,
						name: each.fullName,
						productOwnerID: each.productproviderDTO.id,
						productOwnerName: nameinCurrentLang.nameinthisLang,
						userState: each.editionDate, //shouldbe sth like each.UserState
						email: each.email,
					})
				})
				
				this.setState(
					{theuserslist: theList}
				)
			} else {
				// this.setState({
				// 	error:response.status
				// })
				// this.state.error=="401"?NotificationManager.error(<IntlMessages id="Login.auth"/>):null  
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
					// pathname: '/horizontal/changePass',
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
	handleTooltipClose = () => {
		this.setState({ open: false });
	};
	handleTooltipOpen = () => {
		this.setState({ open: true });
	};
	render() {	
		const lang=localStorage.getItem('Current_lang')
		console.log(lang,"lang");
		
		const columnsFa = ["نام", "نام", "صاحب محصول", "وضعیت کاربر", "ایمیل","ایمیل"];
		const columns = ["Name", "Name", "ProductOwner", "UserSate", "email","email"];
		var logic = lang=="en"?columns
		:
		columnsFa
		const data = this.state.theuserslist.map(eachuser => {
			return(
				[eachuser.username, eachuser.name, eachuser.productOwnerName, eachuser.userState, eachuser.email, 
					<div>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.error" />}>
							<IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ eachuser.username +'?')) this.deletehandler(eachuser.id) } } aria-label="Delete" id="delete">
							<i className="zmdi zmdi-close"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.edit" />}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachuser.id, eachuser.username, 'edit')} aria-label="Edit" id="Edit">
								<i className="zmdi zmdi-edit"></i>
							</IconButton>
						</Tooltip>	
						<Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.changepass" />}>
							<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachuser.id, eachuser.username, 'changepass')} aria-label="changepass" id="changepass">
								<i className="zmdi zmdi-key"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.groups" />}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachuser.id, eachuser.username, 'groups')} aria-label="groups" id="groups">
									<i className="zmdi zmdi-accounts-alt"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="tooltip.roles" />}classes={{ label: 'my-class-name' }}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachuser.id, eachuser.username, 'roles')} aria-label="roles" id="roles">
								<i className="zmdi zmdi-account-circle"></i>
							</IconButton>
						</Tooltip>
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
			responsive: 'stacked',
			selectableRows: false
		};
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.dataTable" />} match={this.props.match} />
				<RctCollapsibleCard heading="Data Table" fullBlock>

					<MUIDataTable
					
						title={"Users list"}
						data={data}
						columns={
							logic
						}
						options={options}
					/>
					
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default DataTable;
