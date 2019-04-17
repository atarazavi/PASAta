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
	FormText,
	Col,
	FormFeedback
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
        tagKey: null,
        tagisActive: null,
        theTagQRCODE: '',
        isQRCodeLoaded: false
	}

	componentDidMount = () => {
		(async () => {
			const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/findbyid', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': giventoken,
				},
				body: JSON.stringify({
                    "id": this.props.location.state.tagID
                  })
			});
			const response = await rawResponse.json();
			if (response.status == 200 ){
				this.setState({
                        tagKey: response.result.dto.key,
                        tagisActive: response.result.dto.isActive
                    }
				)
				this.handleGettingQRCode(response.result.dto.key)
			}
        })();
	}

    handleGettingQRCode = (key) => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/qrcode/' + key, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': giventoken,
                    'Accept-Language': currentLanguagecode
                }
            });
            const response = await rawResponse;
            if (response.status == 200 ){
                this.setState({
                    isQRCodeLoaded: true,
                    theTagQRCODE: response.url
                })
            }
        })();
    }

	handleSubmit = (e) => {        
        e.preventDefault();
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/tag/pool/edit', {
		      method: 'POST',
		      headers: {
		        'Content-Type': 'application/json',
		        'Authorization': giventoken
		      },
		      body: JSON.stringify({
                "id" : this.props.location.state.tagID,
                "key": this.state.tagKey,
                "isActive": this.state.tagisActive
              })
		  });
		  const content = await rawResponse.json()
		  if (content.status == 200) {
			// Show notification about success on editing...
			// Show notification about success on editing...
			// Show notification about success on editing...
            // Show notification about success on editing...
            setTimeout(() => {
                this.props.history.push({
                    pathname: '/horizontal/tagPoolList',
                    state: { package_id: this.props.location.state.package_id }
                });
            }, 1000);
		  }else{
            console.log('Show notification about the problem!!!!!!! on editing...');
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
			// Show notification about the problem!!!!!!! on editing...
		  }
		})();
	}

	handleChange = (event) => {		
		const {name, value} = event.target
		this.setState({
			[name]: value
		})
    }
    
	render() { 
        const TagCodeURL = this.state.isQRCodeLoaded ? <img src={this.state.theTagQRCODE}></img> : this.props.location.state.tagID
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
						<RctCollapsibleCard heading={"Edit " + this.props.location.state.tagID}>
							<Form>
                                {TagCodeURL}
								<FormGroup row>
									<Label for="tagKey" sm={2}>شناسه برچسب</Label>
									<Col sm={10}>
										<Input value={this.state.tagKey} type="text" name="tagKey" id="tagKey" onChange={this.handleChange} placeholder="Tag Key" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="Select-1" sm={2}>Select</Label>
									<Col sm={10}>
										<select 
											value = {this.state.tagisActive}
											name = 'tagisActive'
											onChange = {this.handleChange}
										>
											<option value="ACTIVE">Active</option>
											<option value="DEACTIVE">inActive</option>
										</select>
									</Col>
								</FormGroup>
                                <br></br>
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
										onClick={() => 
                                            this.props.history.push({
                                                pathname: '/horizontal/tagPoolList',
                                                state: { package_id: this.props.location.state.package_id }
                                            })
                                        }
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
