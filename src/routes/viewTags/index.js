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
// const currentLanguagecode = localStorage.getItem('currentLanguagecode')
const currentLanguagecode = 'fa'

class DataTable extends React.Component {
	state = {
		thetagsslist: []
	}

	componentDidMount = () => {		
		(async () => {
		const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/filter', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('given_token'),
                'Accept-Language': currentLanguagecode
			},
			body: JSON.stringify({
                "fromDate": "",
                "needPaginate": true,
                "pageNumber": 0,
                "pageSize": 10,
                "productProviderId": 0,
                "resultSize": 0,
                "tagBulkorderId": 0,
                "tagPackageId": 0,
                "tagPackageSeqEnd": 0,
                "tagPackageSeqStart": 0,
                "tagProviderId": 0,
                "tagRequestId": 0,
                "tagTypeId": 0,
                "toDate": ""
              })
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				const thetagsslist = response.result.dtos.map(each => {	
					return({
                        id: each.id,
                        status: each.tagStatusDTO.title,
                        printedCode: each.key,
                        tagPackageId: each.tagPackageDTO.id
					})
				})
				this.setState(
					{thetagsslist}
				)
			}
		})();
	}

	actionClickhandler = (id, uname, action) => {
		switch(action) { 
			case "Edit": { 
				this.props.history.push({
					pathname: 'editTags',
					state: { roleName: uname, role_id: id }
				})
				break;
			}
			default: { 
				console.log("Invalid choice"); 
				break;
			} 
		} 
	}

	render() {
		const columns = ["Code", "Tag Provider", "Tag Type", "Status", "Creation Date", "Creator"];
		const data = this.state.thetagsslist.map(eachtag => {
			return(
				[eachtag.id, eachtag.provider, eachtag.type, eachtag.status, eachtag.createDate, eachtag.creator]
			)
		})
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
		return (
			<div className="data-table-wrapper">
				<PageTitleBar title='موجودی برچسب ها' match={this.props.match} />
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
