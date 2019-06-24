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
const currentLanguagecode = localStorage.getItem('Current_lang')

export default class AutoComplete extends Component {
	state = {
		providername: this.props.location.state.provider_name,
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
            "id": this.props.location.state.provider_id,
            "name": this.state.providername
        }
        console.log(toBsentData);
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/provider/edit', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': giventoken,
                'Accept-Language': currentLanguagecode
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
                this.props.history.push('tagProvidersList');
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
						<RctCollapsibleCard heading={"Edit "+ this.props.location.state.provider_name}>
							<Form>
								<FormGroup row>
									<Label for="providername_1" sm={2}>Provider Name:</Label>
									<Col sm={10}>
										<Input type="text" name="providername" id="providername_1" onChange={this.handleChange} value={this.state.providername} />
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
										onClick={() => this.props.history.push('tagProvidersList')}
										variant="raised"
										color="secondary"
										className="text-white btn-xs mb-10"
									>
										<IntlMessages id="button.return_to_tagProvider_list" />
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
