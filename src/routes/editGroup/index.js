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

const giventoken = localStorage.getItem('given_token')

export default class AutoComplete extends Component {
	state = {
		groupID: this.props.location.state.grouup_id,
		groupname: '',
		description: '',
	}

    componentDidMount = () => {      
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken
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
		        'Authorization': giventoken
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
						<RctCollapsibleCard heading="Form Grid">
							<Form>
								<FormGroup row>
									<Label for="groupName-1" sm={2}>نام گروه کاربری</Label>
									<Col sm={10}>
										<Input value={this.state.groupname} type="text" name="groupname" id="groupName-1" onChange={this.handleChange} placeholder="group Name" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description_1" sm={2}>توضیحات</Label>
									<Col sm={10}>
										<Input value={this.state.description} type="text" name="description" id="description_1" onChange={this.handleChange} placeholder="group description" />
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
