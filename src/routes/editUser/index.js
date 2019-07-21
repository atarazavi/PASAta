/**
 * Auto Complete Advance UI Components
 */
import React, { Component } from 'react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from 'reactstrap';
import Button from '@material-ui/core/Button';
import EmailReg from "../../constants/AppConfig"
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
		username: '',
		email: '',
		password: '',
		password_2: '',
		familyanme: '',
		mobileNumber: '',
		description: '',
        productownerid: 0,
		productownerName: '',
		suggestions: [],
		userState : 'active'
	}

    componentDidMount = () => {      
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.props.location.state.user_id
                })
            });
            const response = await rawResponse.json();
            console.log(response);
            if (response.status == 200 ){
				const currentlanguage = localStorage.getItem('Current_lang')
				console.log('currentlanguage', currentlanguage);
				
				let nameinCurrentLang = {}
				response.result.dto.productproviderDTO.productproviderLangDTOS.map(each => {	
					if (currentlanguage == each.languageDTO.code){
						nameinCurrentLang = {
							lang_code: each.languageDTO.code,
							nameinthisLang: each.name,
							companynameinthislang: each.companyName,
							descriptioninthislang: each.describtion
						}
					}
				})

                this.setState({
                    username: response.result.dto.username,
                    familyanme: response.result.dto.fullName,
                    email: response.result.dto.email,
                    mobileNumber: response.result.dto.mobile,
                    description: response.result.dto.description,
                    productownerid: response.result.dto.productproviderDTO.id,
					productownerName: nameinCurrentLang.nameinthisLang
                })
            }
		})();
		
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/product/provider/filter', {
				method: 'POST',
				headers: {
				  'Content-Type': 'application/json',
				  'Authorization': localStorage.getItem('given_token')
				},
				body: JSON.stringify({
					"fromDate": "",
					"needPaginate": true,
					"pageNumber": 0,
					"pageSize": 10,
					"resultSize": 0,
					"termToFind": "",
					"toDate": ""
				})
			});
			const content = await rawResponse.json();
			console.log('yohooooooooooo',content);
			if (content.status == 200 ){
				let dtos_ = content.result.dtos
				const suggestions = dtos_.map(eachOwner => {
				  return({label: eachOwner.productproviderLangDTOS[0].name, value: eachOwner.productproviderLangDTOS[0].name, id: eachOwner.productproviderLangDTOS[0].productProviderId})
				})
				this.setState({suggestions})
			}
		})();
    } 

	handleChange = (event) => {
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
	}

	handleChangeOnOwner = (result) => {
		result == 0 && this.setState({productownerid: 0})
		this.state.suggestions.map( owner => {
			owner.value == result && this.setState({productownerid: owner.id})
		})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		const toBsentData = {
            "id": this.props.location.state.user_id,
            "username": this.state.username,
            "description": this.state.description,
            "fullName": this.state.familyanme,
            "email": this.state.email,
            "mobile": this.state.mobileNumber,
            "productproviderDTO": {
                "id": this.state.productownerid
			}
		}
		const User= this.state.username;
		const describtion= this.state.description
		const name= this.state.familyanme
		const Email= this.state.email
		const regex= EmailReg.RegExpEmail
		const Mnumber= this.state.mobileNumber
		if (User.length>35){
			NotificationManager.error(<IntlMessages id="notif.exceed"/>);
		} else {
			if (describtion.length>128){
				NotificationManager.error(<IntlMessages id="notif.exceed"/>);
			} else {
				if (name.length>128){
					NotificationManager.error(<IntlMessages id="notif.exceed"/>);
				} else {
					if (Email.match(regex)&&Email.length<150){
						if (Mnumber.length>30){
							NotificationManager.error(<IntlMessages id="notif.Mobile"/>)
						}
					} else {
						NotificationManager.error(<IntlMessages id="notif.Email"/>)
					}
				}
			}
		}
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/edit', {
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
		      this.forceUpdate()
		  }
		})();
	}
	sss (){
		console.log("Sss");
		
	}
    returntolist = () => {
        this.props.history.push('tables/data-table');
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
										<Input value={this.state.username} type="text" name="username" id="Username-1" onChange={this.handleChange} placeholder="Username" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Email" sm={2}>Email</Label>
									<Col sm={10}>
										<Input value={this.state.email} type="email" name="email" id="Email" onChange={this.handleChange} placeholder="Email address" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="familyanme" sm={2}>Name</Label>
									<Col sm={10}>
										<Input value={this.state.familyanme} type="text" name="familyanme" id="familyanme" onChange={this.handleChange} placeholder="Name & Family" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="mobileNumber" sm={2}>Mobile Number</Label>
									<Col sm={10}>
										<Input value={this.state.mobileNumber} type="number" name="mobileNumber" id="mobileNumber" onChange={this.handleChange} placeholder="mobile number" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Product_Owner" sm={2}>Product_Owner</Label>
									<Col sm={10}>
										<ReactSelect defaultValue={this.state.productownerName} id={'Product_Owner'} changeHandler={this.handleChangeOnOwner} suggestions={this.state.suggestions} />
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
										<Input value={this.state.description} type="textarea" name="description" onChange={this.handleChange} id="description" />
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
