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
	Col
} from 'reactstrap';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

const giventoken = localStorage.getItem('given_token')

export default class AutoComplete extends Component {
	state = {
		groupname: '',
		description: '',
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
            "description": this.state.description,
            "id": 0,
            "name": this.state.groupname
        }
        console.log(toBsentData);
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/add', {
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
              console.log('success');
              this.props.history.push('groupsList');
		  }
		})();
	}

	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={<IntlMessages id="compenets.groupname" />}>
							<Form>
								<FormGroup row>
									<Label for="groupname_1" sm={2}><IntlMessages id="compenets.groupname" /></Label>
									<Col sm={10}>
										<Input type="text" name="groupname" id="groupname_1" onChange={this.handleChange} placeholder={this.state.username} value={this.state.groupname} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description" sm={2}><IntlMessages id="widgets.description" /></Label>
									<Col sm={10}>
										<Input type="text" name="description" id="description" onChange={this.handleChange} placeholder={this.state.username} value={this.state.description} />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button onClick={this.handleSubmit} color="primary"><IntlMessages id="components.submit" /></Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>

		);
	}
}
