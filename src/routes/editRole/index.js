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

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

import { NotificationManager } from 'react-notifications';

export default class AutoComplete extends Component {
	state = {
		roleID: this.props.location.state.role_id,
		roleName: this.props.location.state.roleName,
		description: '',
	}

    componentDidMount = () => {      
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.roleID
                })
            });
            const response = await rawResponse.json();
            console.log(response);
            if (response.status == 200 ){
                this.setState({
                    roleName: response.result.dto.name,
                    description: response.result.dto.description,
                    roleID: response.result.dto.id
                })
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
            "id": this.state.roleID,
            "name": this.state.roleName,
            "description": this.state.description,
		}
		console.log(toBsentData);
		
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/edit', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify(toBsentData)
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				if (response.result.messageModel.type == 'success' ){
					NotificationManager.success(response.result.messageModel.text)
					this.props.history.push('roleList');
				}else{
					NotificationManager.error(response.result.messageModel.text)
				}
			}else{
				NotificationManager.error(response.result.messageModel.text)
			}
		})();
	}

	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading="Form Grid">
							<Form>
								<FormGroup row>
									<Label for="roleName-1" sm={2}><IntlMessages id="RoleName" /></Label>
									<Col sm={10}>
										<Input value={this.state.roleName} type="text" name="roleName" id="roleName-1" onChange={this.handleChange} placeholder="Role Name" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description_1" sm={2}><IntlMessages id="Description" /></Label>
									<Col sm={10}>
										<Input value={this.state.description} type="text" name="description" id="description_1" onChange={this.handleChange} placeholder="Role description" />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button onClick={this.handleSubmit} color="primary">Submit</Button>
									<Button style={{margin: '0 7px'}} onClick={() => this.props.history.push('roleList')} >Return</Button>
								</FormGroup>
					
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>
		);
	}
}
