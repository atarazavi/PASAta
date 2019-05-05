/**
 * Auto Complete Advance UI Components
 */
import React, { Component } from 'react';

import {
	RevenueWidget,
} from "Components/Widgets";

import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Col,
	FormFeedback
} from 'reactstrap';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ChartConfig from 'Constants/chart-config';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

const giventoken = localStorage.getItem('given_token')

export default class AutoComplete extends Component {
	state = {
        tagCode: null,
        tagPackageCount: null,
        tagPackageType: null,
        tagStatus: null,
        tagRegisterer: null,
        tagProvider: null,
        tagType: null,
        RAWchartgottenData: null,
        thechartData: {
            chartData: {
                labels: ['allocated', 'NotAllocated'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: [
                        ChartConfig.color.info,
                        ChartConfig.color.primary
                    ],
                    hoverBackgroundColor: [
                        ChartConfig.color.info,
                        ChartConfig.color.primary
                    ]
                }],
                title: 'موجودی'
            }
        }
	}

	componentDidMount = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                    'Accept-Language': 'fa'
                },
                body: JSON.stringify({
                    "id": this.props.location.state.tags_id
                  }) 
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                let _DTO = content.result.dto
                this.setState({
                    tagCode: _DTO.id,
                    tagPackageCount: _DTO.tagPackageCount,
                    tagPackageType: _DTO.tagPackageTypeDTO.title,
                    tagStatus: _DTO.tagBulkorderstatusDTO.status,
                    tagRegisterer: _DTO.userDTO.fullName,
                    tagType: _DTO.tagTypeDTO.title,
                    tagProvider: _DTO.tagProviderDTO.name,
                })
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/report/tag/status/baseon/tagbulkorderallocation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                },
                body: JSON.stringify({
                    "id": this.props.location.state.tags_id
                }) 
            });
            const content = await rawResponse.json();
            
            if (content.messageModel.type == 'success' ){
                this.setState(
                    {
                        thechartData:{
                            chartData: {
                            labels: [content.dtos[0].title, content.dtos[1].title],
                            datasets: [{
                                data: [content.dtos[0].aggregationValue, content.dtos[1].aggregationValue],
                                backgroundColor: [
                                    ChartConfig.color.info,
                                    ChartConfig.color.primary
                                ],
                                hoverBackgroundColor: [
                                    ChartConfig.color.info,
                                    ChartConfig.color.primary
                                ]
                            }],
                            title: 'موجودی'
                        },
                        // target: '$50000',
                        // lastWeek: '$100000'
                    }
                    }
                )
            }
        })();
	}

	render() { 
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"More about " + this.props.location.state.tags_id}>
							<Form>
                                <List className="p-0 fs-14">
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Code:
                                        </span>
                                        <span>
                                            {this.state.tagCode}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Tag Type:
                                        </span>
                                        <span>
                                            {this.state.tagType}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Tag Provider:
                                        </span>
                                        <span>
                                            {this.state.tagProvider}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Number of Packages:
                                        </span>
                                        <span>
                                            {this.state.tagPackageCount}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Package Type:
                                        </span>
                                        <span>
                                            {this.state.tagPackageType}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            status:
                                        </span>
                                        <span>
                                            {this.state.tagStatus}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Registerer:
                                        </span>
                                        <span>
                                            {this.state.tagRegisterer}
                                        </span>
                                    </ListItem>
                                    
                                    <div className="col-sm-6 col-md-5 col-xl-5 w-xs-half-block">
                                        <RevenueWidget data={this.state.thechartData} />
                                    </div>
                                </List>
                                <br></br>
								<FormGroup check className="p-0">
									<Button
										onClick={() => this.props.history.push('tagInventory')}
										variant="raised"
										color="secondary"
										className="text-white btn-xs mb-10"
									>
										<IntlMessages id="button.return_to_table_list" />
									</Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>

		);
	}
}
