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
import { NotificationContainer, NotificationManager } from 'react-notifications';
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
		providername: null,
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
            "id": 0,
            "name": this.state.providername
        }
        console.log(toBsentData);
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/add', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': localStorage.getItem('given_token'),
                'Accept-Language': localStorage.getItem('Current_lang')
		      },
		      body: JSON.stringify(toBsentData)
		  });
		  const content = await rawResponse.json();
		  console.log(content);
		  if (content.status == 200) {	
				NotificationManager.success(<IntlMessages id="Edit.success"/>)
            // Show notification about success on editing...
            setTimeout(() => {
                this.props.history.push('tagProvidersList');
            }, 1000);
		  }else{
			// Show notification about the problem!!!!!!! on editing...
			NotificationManager.error(<IntlMessages id="Edit.fail"/>)
		  }
		})();
	}

	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={<IntlMessages id="AddnewProvider"/>}>
							<Form>
								<FormGroup row>
									<Label for="providername_1" sm={2}><IntlMessages id="NewTagProvide"/></Label>
									<Col sm={10}>
										<Input type="text" name="providername" id="providername_1" onChange={this.handleChange} value={this.state.providername} />
									</Col>
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
