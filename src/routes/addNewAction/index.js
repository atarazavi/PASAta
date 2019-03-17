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
		actionname: '',
        description: '',
        path: ''
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
            "path": this.state.path,
            "name": this.state.actionname
        }
        console.log(toBsentData);
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/add', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': giventoken
		      },
		      body: JSON.stringify(toBsentData)
		  });
		  const content = await rawResponse.json();
		  console.log(content);
		  if (content.status == 200 ){
              console.log('success');
              this.props.history.push('/horizontal/actionList');
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
									<Label for="actionname_1" sm={2}>Action name</Label>
									<Col sm={10}>
										<Input type="text" name="actionname" id="actionname_1" onChange={this.handleChange} value={this.state.actionname} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description" sm={2}>description</Label>
									<Col sm={10}>
										<Input type="text" name="description" id="description" onChange={this.handleChange} value={this.state.description} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="path" sm={2}>path</Label>
									<Col sm={10}>
										<Input type="text" name="path" id="path" onChange={this.handleChange} value={this.state.path} />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button onClick={this.handleSubmit} color="primary">Submit</Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>

		);
	}
}
