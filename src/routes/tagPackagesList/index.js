import React from 'react';
import MUIDataTable from "mui-datatables";
import { FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Badge } from 'reactstrap';
import Pagination from 'rc-pagination';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// app config
import AppConfig from 'Constants/AppConfig';

class tagPackagesList extends React.Component {
	state = {
        thetagPackagesList: [],
        tagPackageIdStart: 0,
        tagPackageIdEnd: 0,
		pagination: false,
		chosennumofresults: 10,
		paginationTotal: 0,
		paginationCurrentpage: 0,
		tagRequestId: this.props.location.state ? this.props.location.state.tagRequestId : 0
	}
	componentDidMount = () => {		
		this.callMainAPI();
	}
	handleFilterApply = () =>{
		this.callMainAPI()
	}
	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/package/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token'),
					'Accept-Language': localStorage.getItem('Current_lang')
				},
				body: JSON.stringify({
					"needPaginate": true,
					"pageNumber": this.state.paginationCurrentpage,
					"pageSize": this.state.chosennumofresults,
                    "resultSize": 0,
                    "tagPackaged": 0,
                    "tagBulkorderId": 0,
                    "tagPackageIdEnd": this.state.tagPackageIdEnd,
                    "tagPackageIdStart": this.state.tagPackageIdStart,
                    "tagRequestId": this.state.tagRequestId
                  })
			});
			const response = await rawResponse.json();
			
			if (response.status == 200 ){
				let nameinCurrentLang = {
                    lang_code: null,
                    nameinthisLang: null,
                    companynameinthislang: null,
                    descriptioninthislang: null
                }
				const thetagPackagesList = response.result.dtos.map(each => {	
					each.tagBulkorderDTO.userDTO.productproviderDTO.productproviderLangDTOS.map(eachlang => {
						if (localStorage.getItem('Current_lang') == eachlang.languageDTO.code && eachlang.length > 0){
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
						statusCode: each.tagRequestDTO.id,
						status: each.tagRequestDTO.tagrequeststatusDTO.status,
                        packageType: each.tagBulkorderDTO.tagPackageTypeDTO.title,
                        packageCount: each.tagBulkorderDTO.packageCount
					})
				})
				if (response.result.paginateModel.totalCount / this.state.chosennumofresults > 1) {
					this.setState(
						{
							thetagPackagesList,
							pagination: true,
							paginationTotal: response.result.paginateModel.totalCount,
						}
					)
				}else{
					this.setState(
						{thetagPackagesList}
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
	actionClickhandler = (id,name) => {
        this.props.history.push({
            pathname: 'tagPoolList',
            state: { package_id: id, package_name: name }
        })
	}
	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	render() {  
		const lang=localStorage.getItem('Current_lang')
        const badgestyle = {
            width: "20px",
            height: "20px",
            borderRadius: "50px",
            padding: 0,
            marginBottom: "-4px"
        }
		const columns = ["Status", "Package Code", "Package Type", "Actions"];
		const columnsfa = ["وضعیت", "کد بسته", "توع بسته", "اقدامات"];
		const data = this.state.thetagPackagesList.map(each => {
			return(
				[
					each.statusCode == null ? 
						<Tooltip id="tooltip-fab" title={<IntlMessages id="hanooz ekhtesas dade nashode"/>}>
							<Badge style={badgestyle} color="success"> </Badge>
						</Tooltip>
					: 
						<Tooltip id="tooltip-fab" title={each.status}>
							<Badge style={badgestyle} color="warning"> </Badge> 
						</Tooltip>	
                    ,
					each.id, each.packageType,
					<div>
					<Tooltip id="tooltip-fab" title={<IntlMessages id="View Tags"/>}>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(each.id, each.name)}>
							<i className="zmdi zmdi-eye"></i>
						</IconButton>
					</Tooltip>
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
		
        const ViewNumberOptions = []
        for(let i = 0; i< AppConfig.toBshownResultNumberOptions.length; i++){
            ViewNumberOptions.push(<option value={AppConfig.toBshownResultNumberOptions[i]}>{AppConfig.toBshownResultNumberOptions[i]}</option>)
        }  
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title={<IntlMessages id="PackageCode.Requested.List" />} match={this.props.match} />
				<div className="report-status mb-30">
					<div className="row">
						<div className="col-md-12">
							<div className="top-filter clearfix p-20">
								<FormGroup className="w-20">
									<Label for="tagPackageIdStart"><IntlMessages id="PackageCode.From" />:</Label>
									<Input onChange={this.handleChange} type="text" name="tagPackageIdStart" id="tagPackageIdStart" placeholder="Tag Package ID Start from" />							
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="tagPackageIdEnd"><IntlMessages id="PackageCode.to" />:</Label>
									<Input onChange={this.handleChange} type="text" name="tagPackageIdEnd" id="tagPackageIdEnd" placeholder="Tag Package ID Start to" />							
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="Select"><IntlMessages id="numberofresults" />:</Label>
									<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
										{ViewNumberOptions}
									</Input>
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
						columns={ lang =="en"?columns:columnsfa}
						options={options}
					/>
				</RctCollapsibleCard>
			</div>
		);
	}
}

export default tagPackagesList;
