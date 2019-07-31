/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';

import DeleteConfirmationDialog from "Components/DeleteConfirmationDialog/DeleteConfirmationDialog"
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
import AppConfig from 'Constants/AppConfig';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';
import {DatePicker} from "react-advance-jalaali-datepicker";

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
                    'Authorization': localStorage.getItem('given_token')
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
                    'Authorization': localStorage.getItem('given_token')
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
                    'Authorization': localStorage.getItem('given_token'),
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
                    'Authorization': localStorage.getItem('given_token')
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
					'Authorization': localStorage.getItem('given_token'),
					'Accept-Language': localStorage.getItem('Current_lang')
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
					pathname: 'viewPackage',
					state: { tags_id: id }
				})
				break;  
			} 
			case "changePackageStatus": { 
				this.props.history.push({
					pathname: 'changePackageStatus',
					state: { tags_id: id }
				})
				break;  
			} 
			case "EditBulkOrder": { 
				this.props.history.push({
					pathname: 'editBulkOrder',
					state: { tags_id: id }
				})
				break;  
			} 
			case "DeleteBulkOrder": { 
				this.props.history.push({
					pathname: 'deleteBulkOrder',
					state: { tags_id: id }
				})
				break;  
			} 
			case "bulkOrderMoreinfo": { 
				this.props.history.push({
					pathname: 'bulkOrderMoreinfo',
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
		const columnsfa = ["وضعیت", "نوع تگ", "نوع بسته", "تعداد پکیج", "اقدامات"];
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
                        <Tooltip id="tooltip-fab" title={<IntlMessages id="ViewPackage"/>}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'ViewPackage')} aria-label="view tags">
								<i className="zmdi zmdi-smartphone-android"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="Edit"/>}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'EditBulkOrder')} aria-label="Edit">
								<i className="zmdi zmdi-edit"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="changePackageStatus"/>}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'changePackageStatus')} aria-label="change status">
								<i className="zmdi zmdi-refresh-alt"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="moreinfo"/>}>
							<IconButton className="text-success" onClick={() => this.actionClickhandler(eachtag.id, 'bulkOrderMoreinfo')} aria-label="more details">
								<i className="zmdi zmdi-info"></i>
							</IconButton>
						</Tooltip>
						<Tooltip id="tooltip-fab" title={<IntlMessages id="delete"/>}>
							<IconButton className="text-danger" onClick={() => this.actionClickhandler(eachtag.id, 'DeleteBulkOrder')} aria-label="Delete">
								<i className="zmdi zmdi-close"></i>
							</IconButton>
						</Tooltip>
					</div>
				]
			)
		})
		const options = {
			filter: false,
			responsive: 'stacked',
			selectableRows: false,
			download: false,
			print: false,
			search: false,
			viewColumns: false,
			sort: true
		};
		
        const ViewNumberOptions = []
        for(let i = 0; i< AppConfig.toBshownResultNumberOptions.length; i++){
            ViewNumberOptions.push(<option value={AppConfig.toBshownResultNumberOptions[i]}>{AppConfig.toBshownResultNumberOptions[i]}</option>)
        }  
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title={<IntlMessages id="tag inventory"/>} match={this.props.match} />
				<div className="report-status mb-30">
					<div className="row">
						<div className="col-md-12">
							<div className="top-filter clearfix p-20">
								<FormGroup className="w-20">
									<Label for="startDate">{<IntlMessages id="status"/>}:</Label>
									<ReactSelect fullWidth makeitlarger='please' id='filter_status' changeHandler={this.handleChangeOnautoComplete} target='statusSuggestion' suggestions={this.state.statusSuggestion} />
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="startDate">{<IntlMessages id="tag type"/>}:</Label>
									<ReactSelect fullWidth id='filter_tagtype' changeHandler={this.handleChangeOnautoComplete} target='tagTypeSuggestion' suggestions={this.state.tagTypeSuggestion} />
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="startDate">{<IntlMessages id="tag provider"/>}:</Label>
									<ReactSelect fullWidth id='filter_provider' changeHandler={this.handleChangeOnautoComplete} target='providerSuggestion' suggestions={this.state.providerSuggestion} />
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="startDate">{<IntlMessages id="package type"/>}:</Label>
									<ReactSelect fullWidth id='filter_package' changeHandler={this.handleChangeOnautoComplete} target='packageTypeSuggestion' suggestions={this.state.packageTypeSuggestion} />
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="Select">{<IntlMessages id="num of results"/>}:</Label>
									<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
										{ViewNumberOptions}
									</Input>
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="startDate">{<IntlMessages id="start date"/>}:</Label>
									<DatePicker
										inputComponent={this.DatePickerInput}
										placeholder="انتخاب تاریخ آغاز"
										format="jYYYY/jMM/jDD"
										onChange={this.handleChange_DatePicker_StartDate}
										id="datePicker"
									/>
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="endDate">{<IntlMessages id="end date"/>}:</Label>
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
						</div>
					</div>
				</div>
				<RctCollapsibleCard>
					<MUIDataTable
						title={<IntlMessages id="tag inventory" />}
						data={data}
						columns={localStorage.getItem('Current_lang') == 'en' ? columns : columnsfa}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default DataTable;
