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
import AppConfig from 'Constants/AppConfig';

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
                    'Authorization': localStorage.getItem('given_token'),
                    'Accept-Language': localStorage.getItem('Current_lang')
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
                    if (localStorage.getItem('Current_lang') == eachlang.languageDTO.code && _DTO.userDTO.productproviderDTO.productproviderLangDTOS.length > 0){
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

	render() {         
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"More about" + this.props.location.state.tags_id}>
							<Form>
                                <List className="p-0 fs-14">
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="tag Code"/>:
                                        </span>
                                        <span>
                                            {this.state.tagCode}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Tag type"/>:
                                        </span>
                                        <span>
                                            {this.state.tagType}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Package Type"/>:
                                        </span>
                                        <span>
                                            {this.state.tagPackageType}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Number Of Packages"/>:
                                        </span>
                                        <span>
                                            {this.state.tagPackageCount}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Tag Status"/>:
                                        </span>
                                        <span>
                                            {this.state.tagStatus}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Tag Provider"/>:
                                        </span>
                                        <span>
                                            {this.state.tagRegisterer}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="TagCreation Date"/>:
                                        </span>
                                        <span>
                                            {this.state.tagCreationDate}
                                        </span>
                                    </ListItem>
                                    <ListItem className="d-flex justify-content-between border-bottom  align-items-center p-15">
                                        <span>
                                            <IntlMessages id="Tag Confirmation Date"/>:
                                        </span>
                                        <span>
                                            {this.state.tagConfirmTime}
                                        </span>
                                    </ListItem>
                                </List>
                                <br></br>
								<FormGroup check className="p-0">
									<Button
										onClick={() => this.props.history.push('requestedTagsList')}
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
