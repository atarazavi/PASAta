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
        suggestions_providers:[],
        suggestions_packages: [],
        suggestions_TagTypes: [],
        chosen_TagTypes_id : 0,
        chosen_packages_id : 0,
        chosen_providers_id: 0,
        numberOftags: 0
	}

	componentDidMount = () => {
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
                const suggestions_providers = content.result.dtos.map(each => {
                    return({label: each.name, value: each.name, id: each.id})
                })
                this.setState({suggestions_providers})
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/package/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "needPaginate": true,
                    "pageNumber": 0,
                    "pageSize": 10,
                    "resultSize": 0,
                    "tagBulkorderId": 0,
                    "tagPackageSeqEnd": 56,
                    "tagPackageSeqStart": 54,
                    "tagRequestId": 0
                  })
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
                const suggestions_packages = content.result.dtos.map(each => {
                    return({label: each.tagBulkorderDTO.tagPackageTypeDTO.title, value: each.tagBulkorderDTO.tagPackageTypeDTO.title, id: each.tagBulkorderDTO.tagPackageTypeDTO.id})
                })
                this.setState({suggestions_packages})
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/alltagtype', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token'),
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

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
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
			case "chosen_packages_id": { 
                this.state.suggestions_packages.map( each => {
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
			"id": 0,
			"tagPackageCount": this.state.numberOftags,
			"tagPackageTypeDTO": {
			  "id": this.state.chosen_packages_id
			},
			"tagProviderDTO": {
			  "id": this.state.chosen_providers_id
			},
			"tagTypeDTO": {
			  "id": this.state.chosen_TagTypes_id
			}
		  }
		console.log('toBsentData', toBsentData);
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/add', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': localStorage.getItem('given_token')
		      },
		      body: JSON.stringify(toBsentData)
		  });
		  const content = await rawResponse.json();
		  console.log(content);
		  if (content.status == 200) {
			NotificationManager.success(<IntlMessages id="Edit.success"/>)
			setTimeout(() => {
                this.props.history.push("tagInventory");
            }, 1000);
			// Show notification about success on adding ...
		  }else{
			NotificationManager.error(<IntlMessages id="Edit.fail"/>)
			// Show notification about the problem!!!!!!! on adding ...
		  }
		})();
	}

	render() {
        const TagNumberOptions = []
        for(let i = AppConfig.tagBulkRequestMinimum; i<= AppConfig.tagBulkRequestMaximum; i++){
            TagNumberOptions.push(<option>{i}</option>)
        }        
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={<IntlMessages id="Generate.Tags"/>}>
							<Form>
								<FormGroup row>
									<Label for="tagType" sm={2}><IntlMessages id="Tag.Type"/></Label>
									<Col sm={10}>
										<ReactSelect id={'tagType'} changeHandler={this.handleChangeOnautoComplete} target='chosen_TagTypes_id' suggestions={this.state.suggestions_TagTypes} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="tagProviders" sm={2}><IntlMessages id="sidebar.tagProvidersList"/></Label>
									<Col sm={10}>
										<ReactSelect id={'tagProviders'} changeHandler={this.handleChangeOnautoComplete} target='chosen_providers_id' suggestions={this.state.suggestions_providers} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="tagPackages" sm={2}><IntlMessages id="Tag.Packages"/></Label>
									<Col sm={10}>
										<ReactSelect id={'tagPackages'} changeHandler={this.handleChangeOnautoComplete} target='chosen_packages_id' suggestions={this.state.suggestions_packages} />
									</Col>
								</FormGroup>
								<FormGroup>
									<Label for="Select"><IntlMessages id="Number.Tag"/></Label>
									<Input type="select" onChange={this.handleChange} name="numberOftags" id="Select">
                                        {TagNumberOptions}
									</Input>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button onClick={this.handleSubmit} color="primary"><IntlMessages id="components.submit"/></Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>

		);
	}
}
