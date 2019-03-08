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

export default class AutoComplete extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		password_2: '',
		familyanme: '',
		mobileNumber: '',
		description: '',
		productownerid: '',
		userState : 'active'
	}

	beforeMount = () => {
		
    // (async () => {
    //   const rawResponse = await fetch(AppConfig.baseURL + '/product/provider/filter', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': givenToken
    //       },
    //       body: JSON.stringify({
    //         "fromDate": "",
    //         "needPaginate": true,
    //         "pageNumber": 0,
    //         "pageSize": 10,
    //         "resultSize": 0,
    //         "termToFind": "",
    //         "toDate": ""
    //       })
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
		let the_data = {
			"status": 200,
			"message": "success",
			"token": "",
			"result": {
				"messageModel": {
					"type": "success",
					"title": null,
					"text": "درخواست با موفقیت آمیز انجام گرفت",
					"messagesKey": "requestSuccess",
					"violations": null
				},
				"paginateModel": {
					"pages": [],
					"currentPage": 0,
					"pageSize": 10
				},
				"dtos": [
					{
						"productProviderId": 76,
						"name": "چونک",
						"companyName": "چونک ستر ایران",
						"mainOfficeAddress": "آدرس چونک",
						"mainOfficeTel": "454654",
						"mainOfficeFax": "646546",
						"managerFullname": null,
						"describtion": "توضیحات چونک",
						"languageDTO": {
							"id": 1,
							"code": "fa",
							"title": "فارسی"
						}
					},
					{
						"productProviderId": 77,
						"name": "choonak",
						"companyName": "Choonak goster",
						"mainOfficeAddress": "Address choonak",
						"mainOfficeTel": "454654",
						"mainOfficeFax": "646546",
						"managerFullname": null,
						"describtion": "choonak desc",
						"languageDTO": {
							"id": 2,
							"code": "en",
							"title": "English"
						}
					}
				]}}
		  let dtos_ = the_data.result.dtos
		  this.suggestions = dtos_.map(eachOwner => {
			return({label: eachOwner.name, value: eachOwner.name, id: eachOwner.productProviderId})
		  })
		  console.log('suggestions', this.suggestions);
	}

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleChangeOnOwner = (result) => {
		this.suggestions.map( owner => {
			owner.value == result ? this.setState({productownerid: owner.id}) : null
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

	render() {
		this.beforeMount()
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading="Form Grid">
							<Form>
								<FormGroup row>
									<Label for="Username-1" sm={2}><IntlMessages id="form.username" /></Label>
									<Col sm={10}>
										<Input type="text" name="username" id="Username-1" onChange={this.handleChange} placeholder="Username" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Email" sm={2}>Email</Label>
									<Col sm={10}>
										<Input type="email" name="email" id="Email" onChange={this.handleChange} placeholder="Email address" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Password-1" sm={2}>Password</Label>
									<Col sm={10}>
										<Input type="password" name="password" id="Password-1" onChange={this.handleChange} placeholder="password" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Password-2" sm={2}>Repeat Password</Label>
									<Col sm={10}>
										<Input type="password" name="password_2" id="Password-2" onChange={this.handleChange} placeholder="type password again" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="familyanme" sm={2}>Name</Label>
									<Col sm={10}>
										<Input type="text" name="familyanme" id="familyanme" onChange={this.handleChange} placeholder="Name & Family" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="mobileNumber" sm={2}>Mobile Number</Label>
									<Col sm={10}>
										<Input type="number" name="mobileNumber" id="mobileNumber" onChange={this.handleChange} placeholder="mobile number" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Product_Owner" sm={2}>Product_Owner</Label>
									<Col sm={10}>
										<ReactSelect id={'Product_Owner'} changeHandler={this.handleChangeOnOwner} suggestions={this.suggestions} />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Select-1" sm={2}>Select</Label>
									<Col sm={10}>
										<select 
											value = {this.state.userState}
											name = 'userState'
											onChange = {this.handleChange}
										>
											<option value="active">Active</option>
											<option value="inactive">inActive</option>
										</select>
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description" sm={2}>description</Label>
									<Col sm={10}>
										<Input type="textarea" name="description" onChange={this.handleChange} id="description" />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button color="primary">Submit</Button>
								</FormGroup>
							</Form>
						</RctCollapsibleCard>
					</div>
				</div>
			</div>

		);
	}
}
