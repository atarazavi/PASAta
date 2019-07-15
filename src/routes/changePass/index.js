/**
 * Auto Complete Advance UI Components
 */
import React, { Component } from 'react';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Col
} from 'reactstrap';
import Button from '@material-ui/core/Button';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// app config
import AppConfig from 'Constants/AppConfig';
// intl messages
import IntlMessages from 'Util/IntlMessages';

import { NotificationManager } from 'react-notifications';

export default class AutoComplete extends Component {
	state = {
		username: this.props.location.state.username,
		password: '',
		password_2: '',
		oldPassword:''
    }
    
    componentDidMount = () => {        
    } 

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		console.log('submit');
		const toBsentData = {
			"oldPassword": this.state.oldPassword,
			"newPassword1": this.state.password,
			"newPassword2": this.state.password_2
	  	};
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/changepassword', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify(toBsentData)
			});
			const content = await rawResponse.json();
			console.log(content);
			if (content.status == 200 ){
				NotificationManager.success(content.result.messageModel.text)
				this.props.history.push('/sidemenu/tables/data-table');
			}else{
				NotificationManager.error(content.result.messageModel.text)
			}
		})();
	}
	returntolist = () => {
        this.props.history.push('/sidemenu/tables/data-table');
    }
	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading="Change Password">
							<Form>
								<FormGroup row>
									<Label for="Username-1" sm={2}><IntlMessages id="form.username" /></Label>
									<Col sm={10}>
										<Input type="text" name="username" id="Username-1" readonly="readonly" placeholder={this.state.username} value={this.state.username} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="oldPassword" sm={2}>Old Password</Label>
									<Col sm={10}>
										<Input type="password" name="oldPassword" id="oldPassword" onChange={this.handleChange} placeholder="old password" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Password-1" sm={2}>New Password</Label>
									<Col sm={10}>
										<Input type="password" name="password" id="Password-1" onChange={this.handleChange} placeholder="new password" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Password-2" sm={2}>Repeat New Password</Label>
									<Col sm={10}>
										<Input type="password" name="password_2" id="Password-2" onChange={this.handleChange} placeholder="type password again" />
									</Col>
								</FormGroup>
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
                                        onClick={this.returntolist}
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
