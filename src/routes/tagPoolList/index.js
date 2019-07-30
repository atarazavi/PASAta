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
import { callbackify } from 'util';

class DataTable extends React.Component {
	state = {
        tagPackageSeqStart: 0,
        tagPackageSeqEnd: 0,
        chosennumofresults: 10,
		thetagPoolList: [],
		theTagQRCODEs:[{id:null, url:null}],
		isQRCodeLoaded: false
	}
	componentDidMount = () => {		
        this.callMainAPI()
    }
	handleFilterApply = () => {
		this.callMainAPI()
	}
	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token'),
					'Accept-Language': localStorage.getItem('Current_lang')
				},
				body: JSON.stringify({
                    "fromDate": "",
                    "needPaginate": true,
                    "pageNumber": 0,
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
                })
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				const thetagPoolList = response.result.dtos.map(each => {
                    return({
                        id: each.id,
                        tagPackageSequence: each.tagPackageSequence,
                        key: each.key,
                        theQRCodeurl: ''
                    })
				})
				this.setState(
					{thetagPoolList}
				)
				this.handleGettingQRCode()
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

	render() {  
		const columns = ["QR Code", "Tag ID", "Priority in Package", "Action"];
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
			filterType: 'dropdown',
			responsive: 'stacked'
		};
        const ViewNumberOptions = []
        for(let i = 0; i< AppConfig.toBshownResultNumberOptions.length; i++){
            ViewNumberOptions.push(<option value={AppConfig.toBshownResultNumberOptions[i]}>{AppConfig.toBshownResultNumberOptions[i]}</option>)
        }  
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title='لیست برچسب های درخواست شده' match={this.props.match} />
				<RctCollapsibleCard heading="لیست درخواست ها" fullBlock>
						<div className="top-filter clearfix p-20">
							<FormGroup className="w-20">
								<Label for="tagPackageIdStart">ترتیب پکیج از:</Label>
								<Input onChange={this.handleChange} type="text" name="tagPackageIdStart" id="tagPackageIdStart" placeholder="Tag Package ID Start from" />							
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="tagPackageIdEnd">تا:</Label>
								<Input onChange={this.handleChange} type="text" name="tagPackageIdEnd" id="tagPackageIdEnd" placeholder="Tag Package ID Start to" />							
							</FormGroup>
							<FormGroup className="w-20">
								<Label for="Select">Number of Results:</Label>
								<Input type="select" onChange={this.handleChange} name="chosennumofresults" id="Select">
									{ViewNumberOptions}
								</Input>
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
