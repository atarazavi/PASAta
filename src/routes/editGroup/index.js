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
	Col,
} from 'reactstrap';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

import { NotificationManager } from 'react-notifications';

export default class AutoComplete extends Component {
	state = {
		groupID: this.props.location.state.grouup_id,
		groupname: this.props.location.state.grouupname,
		description: '',
	}

    componentDidMount = () => {      
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.props.location.state.grouup_id
                })
            });
            const response = await rawResponse.json();
            console.log(response);
            if (response.status == 200 ){
                this.setState({
                    groupname: response.result.dto.name,
                    description: response.result.dto.description,
                    groupID: response.result.dto.id
                })
                console.log(this.state.groupname);
            }
		})();
    } 

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const toBsentData = {
            "id": this.state.groupID,
            "name": this.state.groupname,
            "description": this.state.description,
		}
		console.log(toBsentData);
		
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/edit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify(toBsentData)
			});
			const content = await rawResponse.json();
			if (content.status == 200 ){
				if (content.result.messageModel.type == 'success' ){
					NotificationManager.success(content.result.messageModel.text)
					this.props.history.push('groupsList');
				}else{
					NotificationManager.error(content.result.messageModel.text)
				}
			}else{
				NotificationManager.error(content.result.messageModel.text)
			}
		})();
	}

	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={localStorage.getItem('Current_lang') == 'en' ? 'Edit the group: ' + this.state.groupname : localStorage.getItem('Current_lang') == 'fa' ? 'ویرایش گروه: ' + this.state.groupname : '' }>
							<Form>
								<FormGroup row>
									<Label for="groupName-1" sm={2}><IntlMessages id="groupname"/></Label>
									<Col sm={10}>
										<Input value={this.state.groupname} type="text" name="groupname" id="groupName-1" onChange={this.handleChange} placeholder="group Name" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description_1" sm={2}><IntlMessages id="description"/></Label>
									<Col sm={10}>
										<Input value={this.state.description} type="text" name="description" id="description_1" onChange={this.handleChange} placeholder="group description" />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button onClick={this.handleSubmit} color="primary"><IntlMessages id="components.submit"/></Button>
									<Button style={{margin: '0 7px'}} onClick={() => this.props.history.push('groupsList')} ><IntlMessages id="components.return"/></Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>
		);
	}
}
