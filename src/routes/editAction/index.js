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

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// app config
import AppConfig from '../../constants/AppConfig';

export default class AutoComplete extends Component {
	state = {
		actionID: this.props.location.state.action_id,
		actionname: this.props.location.state.actionname,
		description: '',
		actionpath: '',
	}

    componentDidMount = () => {      
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/findbyid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.actionID
                })
            });
            const response = await rawResponse.json();
            console.log(response);
            if (response.status == 200 ){
                this.setState({
                    actionname: response.result.dto.name,
                    description: response.result.dto.description,
                    actionID: response.result.dto.id,
                    actionpath: response.result.dto.path
                })
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
            "id": this.state.actionID,
            "name": this.state.actionname,
            "description": this.state.description,
            "path": this.state.actionpath,
		}
		console.log(toBsentData);
		
		(async () => {
		  const rawResponse = await fetch(AppConfig.baseURL + '/permission/action/edit', {
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
              this.props.history.push('actionList');
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
									<Label for="actionName-1" sm={2}>نام گروه کاربری</Label>
									<Col sm={10}>
										<Input value={this.state.actionname} type="text" name="actionname" id="actionName-1" onChange={this.handleChange} placeholder="action Name" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="description_1" sm={2}>توضیحات</Label>
									<Col sm={10}>
										<Input value={this.state.description} type="text" name="description" id="description_1" onChange={this.handleChange} placeholder="action description" />
									</Col>
								</FormGroup>
								<FormGroup row>
									<Label for="actionpath_1" sm={2}>مسیر مجوز</Label>
									<Col sm={10}>
										<Input value={this.state.actionpath} type="text" name="actionpath" id="actionpath_1" onChange={this.handleChange} placeholder="action path" />
									</Col>
								</FormGroup>
								<FormGroup check className="p-0">
									<Button 
										onClick={this.handleSubmit} 
										color="primary"
										variant="raised"
										className="text-white mr-10 mb-10 btn-xs"
									>
										<IntlMessages id="button.submit" />
									</Button>
									<Button
										onClick={() => this.props.history.push('actionList')}
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
