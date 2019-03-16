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

// app config
import AppConfig from '../../constants/AppConfig';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';

const giventoken = localStorage.getItem('given_token')
// const currentLanguagecode = localStorage.getItem('currentLanguagecode')
const currentLanguagecode = 'fa'

class DataTable extends React.Component {
	state = {
		thetagsslist: [],
		chosenenddate: '',
		chosenstartdate: '',
		chosennumofresults: 10,
		chosenpackagetype: 0,
		chosentagprovider: 0,
		chosentagtype: 0,
		chosenstatus: 0,
		packageTypeSuggestion: [],
		statusSuggestion: [],
		tagTypeSuggestion: [],
		providerSuggestion: [],
	}
	componentDidMount = () => {		
		// this.callMainAPI();

        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/alltagbulkorderstatus', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': giventoken
        //         }
        //     });
        //     const content = await rawResponse.json();
        //     if (content.status == 200 ){
        //         console.log('tags types should be added to state as suggestion');
        //         const statusSuggestion = content.result.dtos.map(each => {
        //             return({label: each.name, value: each.name, id: each.id})
        //         })
        //         this.setState({statusSuggestion})
        //     }
		// })();

        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagtype', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': giventoken
        //         }
        //     });
        //     const content = await rawResponse.json();
        //     if (content.status == 200 ){
        //         console.log('tags types should be added to state as suggestion');
        //         const tagTypeSuggestion = content.result.dtos.map(each => {
        //             return({label: each.name, value: each.name, id: each.id})
        //         })
        //         this.setState({tagTypeSuggestion})
        //     }
		// })();
		
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                    'Accept-Language': 'fa'
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
            const content = await rawResponse.json();
            if (content.status == 200 ){
                const providerSuggestion = content.result.dtos.map(each => {
                    return({label: each.name, value: each.name, id: each.id})
                })
                this.setState({providerSuggestion})
            }
		})();
		
        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagpackagetype', {
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': giventoken
        //         }
        //     });
        //     const content = await rawResponse.json();
        //     if (content.status == 200 ){
        //         console.log('tags types should be added to state as suggestion');
        //         const packageTypeSuggestion = content.result.dtos.map(each => {
        //             return({label: each.name, value: each.name, id: each.id})
        //         })
        //         this.setState({packageTypeSuggestion})
        //     }
		// })();
	}
	
	handleFilterApply = () =>{
		this.callMainAPI()
	}

	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken,
					'Accept-Language': currentLanguagecode
				},
				body: JSON.stringify({
					"fromDate": this.state.chosenstartdate,
					"needPaginate": true,
					"pageNumber": 0,
					"pageSize": 10,
					"productProviderId": 0,
					"resultSize": 0,
					"tagBulkorderId": 0,
					"tagPackageId": 0,
					"tagPackageSeqEnd": 0,
					"tagPackageSeqStart": 0,
					"tagPackageTypeId": this.state.chosenpackagetype.id,
					"tagProviderId": this.state.chosentagprovider.id,
					"tagRequestId": 0,
					"tagTypeId": this.state.chosentagtype.id,
					"toDate": this.state.chosenenddate
				})
			});
			const response = await rawResponse.json();
			
			if (response.status == 200 ){
				const thetagsslist = response.result.dtos.map(each => {	
					return({
                        id: each.id,
                        provider: each.tagProviderDTO.name,
                        type: each.tagTypeDTO.title,
                        status: each.tagBulkorderstatusDTO.status,
                        statusCode: each.tagBulkorderstatusDTO.id,
                        createDate: each.creationDate,
						creator: each.userDTO.username,
						tagPackageCount: each.tagPackageCount,
						packageType: each.tagPackageTypeDTO.title
					})
				})
				this.setState(
					{thetagsslist}
				)
			}
		})();
	}

	actionClickhandler = (id, uname, action) => {
		// switch(action) { 
		// 	case "ViewPackage": { 
		// 		this.props.history.push({
		// 			pathname: '/horizontal/viewPackage',
		// 			state: { roleName: uname, role_id: id }
		// 		})
		// 		break;  
		// 	} 
		// 	case "ChangePackageStatus": { 
		// 		this.props.history.push({
		// 			pathname: '/horizontal/changePackageStatus',
		// 			state: { roleName: uname, role_id: id }
		// 		})
		// 		break;  
		// 	} 
		// 	case "EditBulkorder": { 
		// 		this.props.history.push({
		// 			pathname: '/horizontal/editBulkorder',
		// 			state: { roleName: uname, role_id: id }
		// 		})
		// 		break;  
		// 	} 
		// 	case "DeleteBulkorder": { 
		// 		this.props.history.push({
		// 			pathname: '/horizontal/deleteBulkorder',
		// 			state: { roleName: uname, role_id: id }
		// 		})
		// 		break;  
		// 	} 
		// 	case "MoreinfoBulkorder": { 
		// 		this.props.history.push({
		// 			pathname: '/horizontal/moreinfoBulkorder',
		// 			state: { roleName: uname, role_id: id }
		// 		})
		// 		break;  
		// 	} 
		// 	default: { 
		// 		console.log("Invalid choice"); 
		// 		break;
		// 	} 
		// } 
	}

	handleChangeOnautoComplete = (result, target) => {
		console.log('in balaaaaaaaaaaa');
		
		console.log('result', result, 'target', target);
		
        // switch(target) { 
		// 	case "statusSuggestion": { 
        //         this.state.statusSuggestion.map( each => {
        //             each.value == result && this.setState({chosenstatus: each.id})
        //         })
		// 		break;  
		// 	} 
		// 	case "tagTypeSuggestion": { 
        //         this.state.tagTypeSuggestion.map( each => {
        //             each.value == result && this.setState({chosentagtype: each.id})
        //         })
		// 		break; 
		// 	}
		// 	case "providerSuggestion": { 
        //         this.state.providerSuggestion.map( each => {
        //             each.value == result && this.setState({chosentagprovider: each.id})
        //         })
		// 		break; 
		// 	}
		// 	case "packageTypeSuggestion": { 
        //         this.state.packageTypeSuggestion.map( each => {
        //             each.value == result && this.setState({chosenpackagetype: each.id})
        //         })
		// 		break; 
		// 	}
		// 	default: { 
		// 		console.log("Invalid choice"); 
		// 		break;              
		// 	} 
		// } 
	}

	handleChange = (event) => {
		// const {name, value} = event.target
		// this.setState({
		// 	[name]: value
		// })
	}

	render() {
		const columns = ["Status", "Status Code", "Tag Type", "Package Type", "Number Of Package", "Actions"];
		const data = this.state.thetagsslist.map(eachtag => {
			return(
				[eachtag.status, eachtag.statusCode, eachtag.type, eachtag.packageType, eachtag.tagPackageCount,
					<div>
                        <IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'ViewPackage')} aria-label="view tags">
                            <i className="zmdi zmdi-smartphone-android"></i>
                        </IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'EditBulkorder')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'ChangePackageStatus')} aria-label="change status">
							<i className="zmdi zmdi-comment-edit"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'MoreinfoBulkorder')} aria-label="more details">
							<i className="zmdi zmdi-collection-text"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'DeleteBulkorder')} aria-label="Delete">
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
				<PageTitleBar title='موجودی برچسب ها' match={this.props.match} />
				<RctCollapsibleCard heading="Data Table" fullBlock>
						<div className="top-filter clearfix p-20">
							<FormGroup className="w-20">
								<Label for="startDate">Status:</Label>
								<ReactSelect id='filter_status' changeHandler={() => this.handleChangeOnautoComplete} target='statusSuggestion' suggestions={this.state.statusSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Tag Type:</Label>
								<ReactSelect id='filter_tagtype' changeHandler={() => this.handleChangeOnautoComplete} target='tagTypeSuggestion' suggestions={this.state.tagTypeSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Tag Provider:</Label>
								<ReactSelect id='filter_provider' changeHandler={() => this.handleChangeOnautoComplete} target='providerSuggestion' suggestions={this.state.providerSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Package Type:</Label>
								<ReactSelect id='filter_package' changeHandler={() => this.handleChangeOnautoComplete} target='packageTypeSuggestion' suggestions={this.state.packageTypeSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="Select">Number of Results:</Label>
								<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
									{ViewNumberOptions}
								</Input>
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Start Date:</Label>
								<Input type="date" onChange={this.handleChange} name="chosenstartdate" id="startDate" placeholder="dd/mm/yyyy" />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="endDate">End Date:</Label>
								<Input type="date" onChange={this.handleChange} name="chosenenddate" id="endDate" placeholder="dd/mm/yyyy" />
							</FormGroup>
							<FormGroup className="mb-5">
								<Label className="d-block">&nbsp;</Label>
								<Button onClick={this.handleFilterApply} color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="widgets.apply" /></Button>
							</FormGroup>
						</div>
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

// class DataTable extends React.Component {
// 	state = {
// 		thetagsslist: []
// 	}

// 	componentDidMount = () => {		
// 		(async () => {
// 		const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/filter', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
//                 'Authorization': giventoken,
//                 'Accept-Language': currentLanguagecode
// 			},
// 			body: JSON.stringify({
//                 "fromDate": "",
//                 "needPaginate": true,
//                 "pageNumber": 0,
//                 "pageSize": 10,
//                 "productProviderId": 0,
//                 "resultSize": 0,
//                 "tagBulkorderId": 0,
//                 "tagPackageId": 0,
//                 "tagPackageSeqEnd": 0,
//                 "tagPackageSeqStart": 0,
//                 "tagPackageTypeId": 0,
//                 "tagProviderId": 0,
//                 "tagRequestId": 0,
//                 "tagTypeId": 0,
//                 "toDate": ""
//               })
// 			});
// 			const response = await rawResponse.json();
// 			if (response.status == 200 ){
// 				const thetagsslist = response.result.dtos.map(each => {	
// 					return({
//                         id: each.id,
//                         provider: each.tagProviderDTO.name,
//                         type: each.tagTypeDTO.title,
//                         status: each.tagBulkorderstatusDTO.status,
//                         createDate: each.creationDate,
//                         creator: each.userDTO.username
// 					})
// 				})
// 				this.setState(
// 					{thetagsslist}
// 				)
// 			}
// 		})();
// 	}

// 	actionClickhandler = (id, uname, action) => {
// 		switch(action) { 
// 			case "ViewTags": { 
// 				this.props.history.push({
// 					pathname: '/horizontal/viewTags',
// 					state: { roleName: uname, role_id: id }
// 				})
// 				break;  
// 			} 
// 			case "Edit": { 
// 				this.props.history.push({
// 					pathname: '/horizontal/editTags',
// 					state: { roleName: uname, role_id: id }
// 				})
// 				break;
// 			}
// 			case "ChangeStatus": { 
// 				this.props.history.push({
// 					pathname: '/horizontal/tagChangeStatus',
// 					state: { roleName: uname, role_id: id }
// 				})
// 				break;  
// 			} 
// 			case "More": { 
// 				this.props.history.push({
// 					pathname: '/horizontal/tagMoreinfo',
// 					state: { roleName: uname, role_id: id }
// 				})
// 				break;  
// 			} 
// 			case "Delete": { 
// 				this.props.history.push({
// 					pathname: '/horizontal/tagDelete',
// 					state: { roleName: uname, role_id: id }
// 				})
// 				break;  
// 			} 
// 			default: { 
// 				console.log("Invalid choice"); 
// 				break;
// 			} 
// 		} 
// 	}

// 	render() {
// 		const columns = ["Code", "Tag Provider", "Tag Type", "Status", "Creation Date", "Creator", "Actions"];
// 		const data = this.state.thetagsslist.map(eachtag => {
// 			return(
// 				[eachtag.id, eachtag.provider, eachtag.type, eachtag.status, eachtag.createDate, eachtag.creator,
// 					<div>
//                         <IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'ViewTags')} aria-label="view tags">
//                             <i className="zmdi zmdi-smartphone-android"></i>
//                         </IconButton>
// 						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'Edit')} aria-label="Edit">
// 							<i className="zmdi zmdi-edit"></i>
// 						</IconButton>
// 						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'ChangeStatus')} aria-label="change status">
// 							<i className="zmdi zmdi-comment-edit"></i>
// 						</IconButton>
// 						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'More')} aria-label="more details">
// 							<i className="zmdi zmdi-collection-text"></i>
// 						</IconButton>
// 						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachtag.id, eachtag.name, 'Delete')} aria-label="Delete">
// 							<i className="zmdi zmdi-close"></i>
// 						</IconButton>
// 					</div>
// 				]
// 			)
// 		})
// 		const options = {
// 			filterType: 'dropdown',
// 			responsive: 'stacked'
// 		};
// 		return (
// 			<div className="data-table-wrapper">
// 				<PageTitleBar title='موجودی برچسب ها' match={this.props.match} />
// 				<RctCollapsibleCard heading="Data Table" fullBlock>
// 					<MUIDataTable
// 						title={"Users list"}
// 						data={data}
// 						columns={columns}
// 						options={options}
// 					/>
// 				</RctCollapsibleCard>
// 			</div>
// 		);
// 	}
// }

export default DataTable;
