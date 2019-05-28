/**
 * Auto Complete Advance UI Components
 */
import React, { Component } from 'react';
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
import { NotificationContainer, NotificationManager } from 'react-notifications';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';

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
        suggestions_providers:[],
        suggestions_TagTypes: [],
        chosen_TagTypes_id : 0,
        chosen_providers_id: 0,
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
                    chosen_TagTypes_id: _DTO.tagTypeDTO.id,
                    tagProvider: _DTO.tagProviderDTO.name,
                    chosen_providers_id: _DTO.tagProviderDTO.id
                })
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
                const suggestions_providers = content.result.dtos.map(each => {
                    return({label: each.name, value: each.name, id: each.id})
                })
                this.setState({suggestions_providers})
                console.log('this.state.suggestions_providers', this.state.suggestions_providers);
                
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagtype', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': giventoken,
					'Accept-Language': 'fa'
                }
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                console.log('tags types should be added to state as suggestion');
                
				let dtos_ = content.result.dtos
				const suggestions_TagTypes = dtos_.map(each => {
				  return({label: each.title, value: each.title, id: each.id, price: each.price, description: each.description})
				})
				this.setState({suggestions_TagTypes})
            }
        })();
	}

	handleChangeOnautoComplete = (result, target) => {
        console.log('result', result, 'target', target);
        switch(target) { 
			case "chosen_TagTypes_id": { 
                this.state.suggestions_TagTypes.map( each => {
                    each.value == result && this.setState({[target]: each.id})
                })
				break;  
			} 
			case "chosen_providers_id": { 
                this.state.suggestions_providers.map( each => {
                    each.value == result && this.setState({[target]: each.id})
                })
				break; 
			}
			default: { 
				console.log("Invalid choice"); 
				break;              
			} 
		} 
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const toBsentData = {
			"id": this.props.location.state.tags_id,
			"tagProviderDTO": {
			  "id": this.state.chosen_providers_id
			},
            "tagPackageCount": 1,
			"tagTypeDTO": {
			  "id": this.state.chosen_TagTypes_id
			}
        }
        console.log('toBsentData', toBsentData);
        
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/edit', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': giventoken
		      },
		      body: JSON.stringify(toBsentData)
		  });
		  const content = await rawResponse.json();
		  console.log(content);
		  if (content.status == 200) {
			NotificationManager.success(<IntlMessages id="Edit.success"/>)
			// Show notification about success on editing...
            setTimeout(() => {
                this.props.history.push('tagInventory');
            }, 1000);
		  }else{
            NotificationManager.error(<IntlMessages id="Edit.fail"/>)
			// Show notification about the problem!!!!!!! on editing...
		  }
		})();
	}

	render() { 
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"Edit " + this.props.location.state.tags_id}>
							<Form>
								<FormGroup row>
									<Label for="tagType" sm={2}>Tag Type</Label>
									<Col sm={10}>
										<ReactSelect defaultValue={this.state.tagType} id={'tagType'} changeHandler={this.handleChangeOnautoComplete} target='chosen_TagTypes_id' suggestions={this.state.suggestions_TagTypes} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="tagProviders" sm={2}>Tag Providers</Label>
									<Col sm={10}>
										<ReactSelect defaultValue={this.state.tagProvider} id={'tagProviders'} changeHandler={this.handleChangeOnautoComplete} target='chosen_providers_id' suggestions={this.state.suggestions_providers} />
									</Col>
								</FormGroup>
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
                                </List>
                                <br></br>
								<FormGroup check className="p-0">
									<Button
										onClick={this.handleSubmit}
										variant="raised"
										color="primary"
										className="text-white mr-10 mb-10 btn-xs"
									>
										<IntlMessages id="components.submit" />
									</Button>
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
