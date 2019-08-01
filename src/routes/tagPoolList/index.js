/**
 * Data Table
 */
import React from 'react';
import MUIDataTable from "mui-datatables";
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import Pagination from 'rc-pagination';
import './paginatestyle.css'
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

class DataTable extends React.Component {
	state = {
        tagPackageSeqStart: 0,
        tagPackageSeqEnd: 0,
        chosennumofresults: 10,
		thetagPoolList: [],
		theTagQRCODEs:[{id:null, url:null}],
		isQRCodeLoaded: false,
		pagination: false,
		paginationTotal: 0,
		paginationCurrentpage: 1
	}
	componentDidMount = () => {		
        this.callMainAPI()
    }
	handleFilterApply = () => {
		this.callMainAPI()
	}
	callMainAPI = () => {
		const toBsentData = {
			"fromDate": "",
			"needPaginate": true,
			"pageNumber": this.state.paginationCurrentpage,
			"pageSize": this.state.chosennumofresults,
			"productProviderId": 0,
			"resultSize": 0,
			"tagBulkorderId": 0,
			"tagPackageId": this.props.location.state.package_id,
			"tagPackageSeqEnd": this.state.tagPackageSeqEnd,
			"tagPackageSeqStart": this.state.tagPackageSeqStart,
			"tagProviderId": 0,
			"tagRequestId": 0,
			"tagTypeId": 0,
			"toDate": ""
		}
		console.log('toBsentData', toBsentData);
		
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token'),
					'Accept-Language': localStorage.getItem('Current_lang')
				},
				body: JSON.stringify(toBsentData)
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				console.log('response.result.paginateModel', response.result.paginateModel);
				
				const thetagPoolList = response.result.dtos.map(each => {
                    return({
                        id: each.id,
                        tagPackageSequence: each.tagPackageSequence,
                        key: each.key,
                        theQRCodeurl: ''
                    })
				})
				if (response.result.paginateModel.pages.length > 0) {
					this.setState(
						{
						pagination: true,
						paginationTotal: response.result.paginateModel.pages.length,
						thetagPoolList
						},
						()=> this.handleGettingQRCode()
					)
				}else{
					this.setState(
						{thetagPoolList},
						()=> this.handleGettingQRCode()
					)
				}
				
			}
        })();
    }
    
    handleGettingQRCode = () => {	
		let theTagQRCODEs = []	
        this.state.thetagPoolList.map(each => {
			(async () => {
				const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/qrcode/' + each.key, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': localStorage.getItem('given_token'),
						'Accept-Language': localStorage.getItem('Current_lang')
					}
				});
				const response = await rawResponse;
				
				if (response.status == 200 ){
					theTagQRCODEs.push({id: each.id, url: response.url})
					this.setState({
						isQRCodeLoaded: true
					})
				}
			})();
		})
		this.setState(
			{theTagQRCODEs}
		)
    }
	actionClickhandler = (id) => {
        this.props.history.push({
            pathname: 'tagPoolEditTag',
            state: { tagID: id, package_id: this.props.location.state.package_id }
        })
	}
	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}
	paginatehandler = (SelectedPage,PageSize) => {
		console.log('SelectedPage', SelectedPage);
		console.log('PageSize', PageSize);
		this.setState({
			paginationCurrentpage: SelectedPage
		}, () => {
			this.callMainAPI();
		});
		
	}
	render() {  
		const columns = ["QR Code", "Tag ID", "Priority in Package", "Action"];
		const columnsfa = ["QR Code", "شناسه تگ", "اولویت در بسته", "اقدامات"];
		const data = this.state.thetagPoolList.map(each => { 
			let eachURL;
			this.state.theTagQRCODEs.map(eachQR => {
				eachQR.id === each.id ? eachURL = eachQR.url : null
			})
			return(
				[
					this.state.isQRCodeLoaded ? <img src={eachURL}></img> : each.id, 
					each.tagPackageSequence, each.key ,
                    <IconButton className="text-success" onClick={() => this.actionClickhandler(each.id)}>
                        <i className="zmdi zmdi-edit"></i>
                    </IconButton>
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
				<PageTitleBar title={<IntlMessages id="Tag Pool List" />} match={this.props.match} />
				<div className="report-status mb-30">
					<div className="row">
						<div className="col-md-12">
							<div className="top-filter clearfix p-20">
								<FormGroup className="w-20">
									<Label for="tagPackageIdStart"><IntlMessages id="PackageIDStartFrom" />:</Label>
									<Input onChange={this.handleChange} type="text" name="tagPackageIdStart" id="tagPackageIdStart" placeholder="Tag Package ID Start from" />							
								</FormGroup>
								<FormGroup className="w-20">
									<Label for="tagPackageIdEnd"><IntlMessages id="To" />:</Label>
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
								total={this.state.chosennumofresults * this.state.paginationTotal}
								pageSize={this.state.chosennumofresults} 
							/> 
						: ''}
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
