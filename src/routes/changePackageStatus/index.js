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

import { Badge } from 'reactstrap';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

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
        tagStatusID: 0,
        statusSuggestion: [],
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
                    tagStatusID: _DTO.tagBulkorderstatusDTO.id,
                    tagRegisterer: _DTO.userDTO.fullName,
                    tagType: _DTO.tagTypeDTO.title,
                    tagProvider: _DTO.tagProviderDTO.name,
                })
            }
        })();
        
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
                    return({title: each.status, id: each.id, ckecked: false})
                })
                this.setState({statusSuggestion})
            }
		})();
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const toBsentData = {
            "id": this.props.location.state.tags_id,
            "tagBulkorderstatusDTO": {
              "id": this.state.tagStatusID 
            }
          }
        console.log('toBsentData', toBsentData);
        
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/bulkorder/changestatus', {
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
			// Show notification about success on editing...
			// Show notification about success on editing...
			// Show notification about success on editing...
            // Show notification about success on editing...
            setTimeout(() => {
                this.props.history.push('tagInventory');
            }, 1000);
		  }else{
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
		  }
		})();
    }
    
    handleChange = (e) => {
        this.setState({
            tagStatusID: e.target.value
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
        const status_suggestions = this.state.statusSuggestion.map(each => 
            {
                return(
                <FormGroup key={each.id} check>
                    <Label check>
                        <Input onChange={this.handleChange} type="radio" value={each.id} name="radio_status" checked={each.id == this.state.tagStatusID}/>{' '}
                        {each.title}
                    </Label>
                        {each.id == 0 ? 
                            <Badge style={badgestyle} color="success"> </Badge>
                        : 
                        each.id == 1 ? 
                            <Badge style={badgestyle} color="warning"> </Badge> 
                        : 
                        each.id == 2 ? 
                            <Badge style={badgestyle} color="danger"> </Badge> 
                        : 'unKnown status'}
                </FormGroup>
                )
            }
        )  
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"Chaneg Status of " + this.props.location.state.tags_id}>
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
                                </List>
                                <br></br>
								<FormGroup tag="fieldset">
									<legend>تغییر وضعیت به</legend>
									{status_suggestions}
								</FormGroup>
                                <br></br>
								<FormGroup check className="p-0">
                                    <Button
                                        onClick={this.handleSubmit}
                                        variant="raised"
                                        color="primary"
                                        className="text-white mr-10 mb-10 btn-xs"
                                    >
                                        <IntlMessages id="submit" />
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
