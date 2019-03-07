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

// app config
import AppConfig from '../../../constants/AppConfig';

class DataTable extends React.Component {
	state = {
		theuserslist: []
	}
	componentDidMount = () => {		
		// (async () => {
		// const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/filter', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlzcyI6Imh0dHA6Ly9wYXMua2lzaGlzYy5jby5pciIsImlhdCI6MTU1MTk2ODU3MSwiZXhwIjoxNTUxOTg2NTcxfQ.CBgJ-W0AMINGHxhQUcBxwzsOAqpTl5BS3LB0t0L5IRg'
		// 	},
		// 	body: JSON.stringify({
		// 		"fromDate": "",
		// 		"groupId": 0,
		// 		"needPaginate": true,
		// 		"pageNumber": 0,
		// 		"pageSize": 10,
		// 		"productProviderId": 76,
		// 		"resultSize": 0,
		// 		"roleId": 0,
		// 		"toDate": "",
		// 		"termToFind": ""
		// 	  })
		// });
		// const content = await rawResponse.json();
		// console.log(content);
		// if (content.status == 200 ){
		// 	console.log('success');
		// }
		// })();
		const the_data = {
			"status": 200,
			"message": "success",
			"token": "",
			"result": {
				"messageModel": {
					"type": "success",
					"title": null,
					"text": "درخواست با موفقیت آمیز انجام گرفت",
					"messagesKey": "requestSuccess",
					"violations": null
				},
				"paginateModel": {
					"pages": [],
					"currentPage": 0,
					"pageSize": 10
				},
				"dtos": [
					{
						"id": 185,
						"username": "test-user2",
						"password": "$2a$10$kRZE52.oAzZ55MgTA8nK2eNsjw9BuH8FRYhlMVr99xcABLys8XkRC",
						"password2": null,
						"description": "test-user2",
						"fullName": "test user 2",
						"email": "test-user2@gmail.com",
						"mobile": null,
						"creationDate": "1397/11/14 13:3",
						"editionDate": null,
						"productproviderDTO": {
							"id": 76,
							"productproviderLangDTOS": [
								{
									"productProviderId": 76,
									"name": "چونک",
									"companyName": "چونک ستر ایران",
									"mainOfficeAddress": "آدرس چونک",
									"mainOfficeTel": "454654",
									"mainOfficeFax": "646546",
									"managerFullname": null,
									"describtion": "توضیحات چونک",
									"languageDTO": {
										"id": 1,
										"code": "fa",
										"title": "فارسی"
									}
								},
								{
									"productProviderId": 76,
									"name": "choonak",
									"companyName": "Choonak goster",
									"mainOfficeAddress": "Address choonak",
									"mainOfficeTel": "454654",
									"mainOfficeFax": "646546",
									"managerFullname": null,
									"describtion": "choonak desc",
									"languageDTO": {
										"id": 2,
										"code": "en",
										"title": "English"
									}
								}
							]
						}
					},
					{
						"id": 165,
						"username": "user_test",
						"password": "$2a$10$rxHoy6LXZwW0x7Kr3wD1n.wBAkPbfM4ka2Ks19EIDsr/t2fGTPhMq",
						"password2": null,
						"description": null,
						"fullName": "User Test",
						"email": "user_test@kisc.co.ir",
						"mobile": null,
						"creationDate": "1397/11/10 12:46",
						"editionDate": null,
						"productproviderDTO": {
							"id": 76,
							"productproviderLangDTOS": [
								{
									"productProviderId": 76,
									"name": "چونک",
									"companyName": "چونک ستر ایران",
									"mainOfficeAddress": "آدرس چونک",
									"mainOfficeTel": "454654",
									"mainOfficeFax": "646546",
									"managerFullname": null,
									"describtion": "توضیحات چونک",
									"languageDTO": {
										"id": 1,
										"code": "fa",
										"title": "فارسی"
									}
								},
								{
									"productProviderId": 76,
									"name": "choonak",
									"companyName": "Choonak goster",
									"mainOfficeAddress": "Address choonak",
									"mainOfficeTel": "454654",
									"mainOfficeFax": "646546",
									"managerFullname": null,
									"describtion": "choonak desc",
									"languageDTO": {
										"id": 2,
										"code": "en",
										"title": "English"
									}
								}
							]
						}
					}
				]
			}
		}
		// it should be gotten from sth like localstorage
		const currentlanguage = 'fa'
		// it should be gotten from sth like localstorage
		let nameinCurrentLang = {}
		const theList = the_data.result.dtos.map(each => {			
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
			{theuserslist: theList})
		}

	actionClickhandler = (event) => {
		console.log(event.target);
		
	}

	render() {
		const columns = ["Username", "Name", "ProductOwner", "UserSate", "email", "Actions"];
		const data = this.state.theuserslist.map(eachuser => {
			return(
				[eachuser.username, eachuser.name, eachuser.productOwnerName, eachuser.userState, eachuser.email, 
					<div>
						<IconButton className="text-danger" onClick={this.actionClickhandler} data-id={eachuser.id} data-action="delete" aria-label="Delete">
							<i className="zmdi zmdi-close" data-id={eachuser.id} data-action="delete"></i>
						</IconButton>
						<IconButton className="text-success" onClick={this.actionClickhandler} data-id={eachuser.id} data-action="edit" aria-label="Edit">
							<i className="zmdi zmdi-edit" data-id={eachuser.id} data-action="edit"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={this.actionClickhandler} data-id={eachuser.id} data-action="changepass" aria-label="changepass">
							<i className="zmdi zmdi-key" data-id={eachuser.id} data-action="changepass"></i>
						</IconButton>
						<IconButton className="text-success" onClick={this.actionClickhandler} data-id={eachuser.id} data-action="groups" aria-label="groups">
							<i className="zmdi zmdi-accounts-alt" data-id={eachuser.id} data-action="groups"></i>
						</IconButton>
						<IconButton className="text-success" onClick={this.actionClickhandler} data-id={eachuser.id} data-action="roles" aria-label="roles">
							<i className="zmdi zmdi-account-circle" data-id={eachuser.id} data-action="roles"></i>
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
				<div className="alert alert-info">
					<p>MUI-Datatables is a data tables component built on Material-UI V1.
            It comes with features like filtering, view/hide columns, search, export to CSV download, printing, pagination, and sorting.
            On top of the ability to customize styling on most views, there are two responsive modes "stacked" and "scroll" for mobile/tablet
            devices. If you want more customize option please <a href="https://github.com/gregnb/mui-datatables" className="btn btn-danger btn-small mx-10">Click </a> here</p>
				</div>
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
