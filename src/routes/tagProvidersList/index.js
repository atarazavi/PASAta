import React from 'react';
import MUIDataTable from "mui-datatables";
import { FormGroup, Label, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Pagination from 'rc-pagination';
// app config
import AppConfig from 'Constants/AppConfig';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';
import {DatePicker} from "react-advance-jalaali-datepicker";

class tagProvidersList extends React.Component {
	state = {
		theProviderslist: [],
		pagination: false,
		chosennumofresults: 10,
		paginationTotal: 0,
		paginationCurrentpage: 0,
		toBsearched: ''
	}
	componentDidMount = () => {	
		this.callMainAPI();	
	}
	callMainAPI = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/filter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token'),
					'Accept-Language': localStorage.getItem('Current_lang')
				},
				body: JSON.stringify({
					"fromDate": "",
					"needPaginate": true,
					"pageNumber": this.state.paginationCurrentpage,
					"pageSize": this.state.chosennumofresults,
					"resultSize": 0,
					"termToFind": this.state.toBsearched,
					"toDate": ""
				  })
			});
			const response = await rawResponse.json();
			
			if (response.status == 200 ){
				const theProviderslist = response.result.dtos.map(each => {	
					return({
						id: each.id,
						name: each.name,
					})
				})
				if (response.result.paginateModel.totalCount / this.state.chosennumofresults > 1) {
					this.setState(
						{
							theProviderslist,
							pagination: true,
							paginationTotal: response.result.paginateModel.totalCount,
						}
					)
				}else{
					this.setState(
						{theProviderslist}
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
	actionClickhandler = (id, name, action) => {
		console.log('id', id, 'name', name, 'action', action);
		
		switch(action) { 
			case "edit": { 
				this.props.history.push({
					pathname: 'editTagProvider',
					state: { provider_id: id, provider_name: name }
				})
				break;  
			} 
			case "delete": { 
				this.props.history.push({
					pathname: 'deleteTagProvider',
					state: { provider_id: id, provider_name: name }
				})
				break;  
			} 
		} 
	}
	handleFilterApply = () =>{
		this.callMainAPI()
	}
	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}
	render() {  
		const lang=localStorage.getItem('Current_lang')
		const columns = ["ID", "Provider Title", "Actions"];
		const columnsfa = ["آی دی", "تامین کننده", "اقدامات"];
		const data = this.state.theProviderslist.map(each => {
			return(
				[
					each.id, each.name,
					<div>
						<IconButton className="text-success" onClick={() => this.actionClickhandler(each.id, each.name, 'edit')} aria-label="more info">
							<i className="zmdi zmdi-edit"></i>
						</IconButton>
						<IconButton className="text-danger" onClick={() => this.actionClickhandler(each.id, each.name, 'delete')} aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
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
				<PageTitleBar title={<IntlMessages id="providers.list" />} match={this.props.match} />
				<div className="report-status mb-30">
					<div className="row">
						<div className="col-md-12">
							<div className="top-filter clearfix p-20">
								<FormGroup className="w-20 mb-5">
									<Label for="search"><IntlMessages id="searchword" />:</Label>
									<Input onChange={this.handleChange} type="text" name="toBsearched" id="search" placeholder="type a word to search..." />							
								</FormGroup>
								<FormGroup className="w-20 mb-5">
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
				<RctCollapsibleCard
					heading={<IntlMessages id="providers.list" />}
					fullBlock
				>
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

export default tagProvidersList;
