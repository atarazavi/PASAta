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

// intl messages
import IntlMessages from 'Util/IntlMessages';

const giventoken = localStorage.getItem('given_token')

export default class AutoComplete extends Component {
	state = {
		username: '',
		password: '',
		password_2: '',
    }
    
    componentDidMount = () => {        
        this.setState({
            username: this.props.location.state.username
        })
    } 

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleSubmit = (e) => {
		// e.preventDefault()
		console.log('submit');
		const toBsentData = {
		
			"description": this.state.description,
			"email": this.state.email,
			"fullName": this.state.familyanme,
			"id": 0,
			"mobile": this.state.mobileNumber,
			"password": this.state.password,
			"password2": this.state.password_2,
			"productproviderDTO": {
				"id": this.state.productownerid
			},
			"username": this.state.username
		}
		// (async () => {
		//   const rawResponse = await fetch(AppConfig.baseURL + '/product/provider/filter', {
		//       method: 'POST',
		//       headers: {
		//         'Content-Type': 'application/json',
		//         'Authorization': givenToken
		//       },
		//       body: JSON.stringify(toBsentData)
		//   });
		//   const content = await rawResponse.json();
		//   console.log(content);
		//   if (content.status == 200 ){
		//       console.log('success');
		//       let dtos_ = content.result.dtos
		//       suggestions = dtos_.map(eachOwner => {
		//         return({label: eachOwner.name, value: eachOwner.name, id: eachOwner.productProviderId})
		//       })
		//   }
		// })();
	}
	returntolist = () => {
        this.props.history.push('/horizontal/tables/data-table');
    }
	render() {
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading="Form Grid">
							<Form>
								<FormGroup row>
									<Label for="Username-1" sm={2}><IntlMessages id="form.username" /></Label>
									<Col sm={10}>
										<Input type="text" name="username" id="Username-1" readonly="readonly" placeholder={this.state.username} value={this.state.username} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Password-1" sm={2}>New Password</Label>
									<Col sm={10}>
										<Input type="password" name="password" id="Password-1" onChange={this.handleChange} placeholder="password" />
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
                                        // onClick={this.handleSubmit}
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
