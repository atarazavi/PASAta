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

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')

export default class AutoComplete extends Component {
	state = {
        tagCode: null,
        tagPackageCount: null,
        tagPackageType: null,
        tagStatus: null,
        tagRegisterer: null,
        tagProvider: null,
        tagType: null,
	}

	componentDidMount = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/request/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                    'Accept-Language': currentLanguagecode
                },
                body: JSON.stringify({
                    "id": this.props.location.state.tags_id
                  }) 
            });
            const content = await rawResponse.json();
            if (content.status == 200 ){
				let nameinCurrentLang = {
                    lang_code: null,
                    nameinthisLang: null,
                    companynameinthislang: null,
                    descriptioninthislang: null
                }
                let _DTO = content.result.dto
                _DTO.userDTO.productproviderDTO.productproviderLangDTOS.map(eachlang => {
                    if (currentLanguagecode == eachlang.languageDTO.code && _DTO.userDTO.productproviderDTO.productproviderLangDTOS.length > 0){
                        nameinCurrentLang = {
                            lang_code: eachlang.languageDTO.code,
                            nameinthisLang: eachlang.name,
                            companynameinthislang: eachlang.companyName,
                            descriptioninthislang: eachlang.describtion
                        }
                    }
                })
                this.setState({
                    tagCode: _DTO.id,
                    tagPackageCount: _DTO.packageCount,
                    tagPackageType: _DTO.tagPackageTypeDTO.title,
                    tagStatus: _DTO.tagrequeststatusDTO.status,
                    tagRegisterer: nameinCurrentLang.nameinthisLang,
                    tagType: _DTO.tagtypeDTO.title,
                    tagCreationDate: _DTO.creationDate,
                    tagConfirmTime: _DTO.confirmTime
                })
            }
        })();
	}

    handleClick = () => {
        
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/request/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken
                },
                body: JSON.stringify({
                    "id": this.props.location.state.tags_id
                })
            });
            const content = await rawResponse.json();
            if (content.status == 200) {
              // Show notification about success on editing...
              // Show notification about success on editing...
              // Show notification about success on editing...
              // Show notification about success on editing...
              setTimeout(() => {
                  this.props.history.push('requestedTagslist');
              }, 1000);
            }else{
              // Show notification about the problem!!!!!!! on editing...
              // Show notification about the problem!!!!!!! on editing...
              // Show notification about the problem!!!!!!! on editing...
              // Show notification about the problem!!!!!!! on editing...
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
                                            Package Type:
                                        </span>
                                        <span>
                                            {this.state.tagPackageType}
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
                                            status:
                                        </span>
                                        <span>
                                            {this.state.tagStatus}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Tag Provider:
                                        </span>
                                        <span>
                                            {this.state.tagRegisterer}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Creation Date:
                                        </span>
                                        <span>
                                            {this.state.tagCreationDate}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            Confirmation Date:
                                        </span>
                                        <span>
                                            {this.state.tagConfirmTime}
                                        </span>
                                    </ListItem>
                                </List>
                                <br></br>
								<FormGroup check className="p-0">
									<Button
										onClick={this.handleClick}
										variant="raised"
										color="danger"
										className="text-white btn-xs mr-10 mb-10"
									>
										<IntlMessages id="Delete" />
									</Button>
									<Button
										onClick={() => this.props.history.push('requestedTagsList')}
										variant="raised"
										color="secondary"
										className="text-white btn-xs mr-10 mb-10"
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
