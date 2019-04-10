/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

import { Badge } from 'reactstrap';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import IconButton from '@material-ui/core/IconButton';
import { Route, Redirect } from "react-router-dom";

import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from '../../constants/AppConfig';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';
import {DatePicker} from "react-advance-jalaali-datepicker";

const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')

class DataTable extends React.Component {
	state = {
		thetagsslist: [],
		chosenenddate: '',
		chosenstartdate: '',
		chosennumofresults: 10,
		chosenpackagetypeID: 0,
		chosentagproviderID: 0,
		chosentagtypeID: 0,
		chosenstatus: 0,
		packageTypeSuggestion: [],
		statusSuggestion: [],
		tagTypeSuggestion: [],
		providerSuggestion: [],
	}
	componentDidMount = () => {		
		this.callMainAPI();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/alltagbulkorderstatus', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken
                }
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                const statusSuggestion = content.result.dtos.map(each => {
                    return({label: each.status, value: each.status, id: each.id})
                })
                this.setState({statusSuggestion})
            }
		})();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagtype', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken
                }
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                const tagTypeSuggestion = content.result.dtos.map(each => {
                    return({label: each.title, value: each.title, id: each.id, price: each.price, desciption: each.desciption})
                })
                this.setState({tagTypeSuggestion})
            }
		})();
		
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
		
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagpackagetype', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken
                }
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                const packageTypeSuggestion = content.result.dtos.map(each => {
                    return({label: each.title, value: each.title, id: each.id, quantity: each.qty})
                })
                this.setState({packageTypeSuggestion})
            }
		})();
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
					"tagPackageTypeId": this.state.chosenpackagetypeID,
					"tagProviderId": this.state.chosentagproviderID,
					"tagRequestId": 0,
					"tagTypeId": this.state.chosentagtypeID,
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

	actionClickhandler = (id, action) => {
		switch(action) { 
			case "ViewPackage": { 
				this.props.history.push({
					pathname: '/horizontal/viewPackage',
					state: { tags_id: id }
				})
				break;  
			} 
			case "changePackageStatus": { 
				this.props.history.push({
					pathname: '/horizontal/changePackageStatus',
					state: { tags_id: id }
				})
				break;  
			} 
			case "EditBulkOrder": { 
				this.props.history.push({
					pathname: '/horizontal/editBulkOrder',
					state: { tags_id: id }
				})
				break;  
			} 
			case "DeleteBulkOrder": { 
				this.props.history.push({
					pathname: '/horizontal/deleteBulkOrder',
					state: { tags_id: id }
				})
				break;  
			} 
			case "bulkOrderMoreinfo": { 
				this.props.history.push({
					pathname: '/horizontal/bulkOrderMoreinfo',
					state: { tags_id: id }
				})
				break;  
			} 
			default: { 
				console.log("Invalid choice"); 
				break;
			} 
		} 
	}

	handleChangeOnautoComplete = (result, target) => {
		console.log('result', result, 'target', target);
		
        switch(target) { 
			case "statusSuggestion": { 
                this.state.statusSuggestion.map( each => {
                    each.value == result && this.setState({chosenstatus: each.id})
                })
				break;  
			} 
			case "tagTypeSuggestion": { 
                this.state.tagTypeSuggestion.map( each => {
                    each.value == result && this.setState({chosentagtypeID: each.id})
                })
				break; 
			}
			case "providerSuggestion": { 
                this.state.providerSuggestion.map( each => {
                    each.value == result && this.setState({chosentagproviderID: each.id})
                })
				break; 
			}
			case "packageTypeSuggestion": { 
                this.state.packageTypeSuggestion.map( each => {
                    each.value == result && this.setState({chosenpackagetypeID: each.id})
                })
				break; 
			}
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}

	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleChange_DatePicker_EndDate = (selectedunix, selectedformatted) => {
		this.setState({
			chosenenddate: selectedformatted
		})
	}
	handleChange_DatePicker_StartDate = (selectedunix, selectedformatted) => {
		this.setState({
			chosenstartdate: selectedformatted
		})
	}

	render() {  
        const badgestyle = {
            width: "20px",
            height: "20px",
            borderRadius: "50px",
            padding: 0,
            marginBottom: "-4px"
        }
		const columns = ["Status", "Tag Type", "Package Type", "Number Of Package", "Actions"];
		const data = this.state.thetagsslist.map(eachtag => {
			return(
				[
					eachtag.statusCode == 0 ? 
						<Tooltip id="tooltip-fab" title={eachtag.status}>
							<Badge style={badgestyle} color="success"> </Badge>
						</Tooltip>
					: 
					eachtag.statusCode == 1 ? 
						<Tooltip id="tooltip-fab" title={eachtag.status}>
							<Badge style={badgestyle} color="warning"> </Badge> 
						</Tooltip>	
					: 
					eachtag.statusCode == 2 ? 
						<Tooltip id="tooltip-fab" title={eachtag.status}>
							<Badge style={badgestyle} color="danger"> </Badge> 
						</Tooltip>
					: 'unKnown status',
					eachtag.type, eachtag.packageType, eachtag.tagPackageCount,
					<div>
                        <IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'ViewPackage')} aria-label="view tags">
                            <i className="zmdi zmdi-smartphone-android"></i>
                        </IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'EditBulkOrder')} aria-label="Edit">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'changePackageStatus')} aria-label="change status">
							<i className="zmdi zmdi-refresh-alt"></i>
						</IconButton>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'bulkOrderMoreinfo')} aria-label="more details">
							<i className="zmdi zmdi-info"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachtag.id, 'DeleteBulkOrder')} aria-label="Delete">
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
								<ReactSelect makeitlarger='please' id='filter_status' changeHandler={this.handleChangeOnautoComplete} target='statusSuggestion' suggestions={this.state.statusSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Tag Type:</Label>
								<ReactSelect id='filter_tagtype' changeHandler={this.handleChangeOnautoComplete} target='tagTypeSuggestion' suggestions={this.state.tagTypeSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Tag Provider:</Label>
								<ReactSelect id='filter_provider' changeHandler={this.handleChangeOnautoComplete} target='providerSuggestion' suggestions={this.state.providerSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Package Type:</Label>
								<ReactSelect id='filter_package' changeHandler={this.handleChangeOnautoComplete} target='packageTypeSuggestion' suggestions={this.state.packageTypeSuggestion} />
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="Select">Number of Results:</Label>
								<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
									{ViewNumberOptions}
								</Input>
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="startDate">Start Date:</Label>
								<DatePicker
									inputComponent={this.DatePickerInput}
									placeholder="انتخاب تاریخ آغاز"
									format="jYYYY/jMM/jDD"
									onChange={this.handleChange_DatePicker_StartDate}
									id="datePicker"
								/>
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="endDate">End Date:</Label>
								{/* <Input type="date" onChange={this.handleChange} name="chosenenddate" id="endDate" placeholder="dd/mm/yyyy" /> */}
								<DatePicker
									inputComponent={this.DatePickerInput}
									placeholder="انتخاب تاریخ پایان"
									format="jYYYY/jMM/jDD"
									onChange={this.handleChange_DatePicker_EndDate}
									id="datePicker"
								/>
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

export default DataTable;
