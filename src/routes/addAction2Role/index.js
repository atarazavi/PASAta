/**
 * Auto Complete Advance UI Components
 */
import React, { Component } from 'react';
import {
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from 'reactstrap';

import MUIDataTable from "mui-datatables";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

import Button from '@material-ui/core/Button';

// Components
import ReactSelect from '../advance-ui-components/autoComplete/component/ReactSelect';

// app config
import AppConfig from '../../constants/AppConfig';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

import IconButton from '@material-ui/core/IconButton';

// intl messages
import IntlMessages from 'Util/IntlMessages';

import { NotificationManager } from 'react-notifications';

export default class AutoComplete extends Component {
	state = {
        rolename: this.props.location.state.roleName,
        role_id: this.props.location.state.role_id,
        roleActions: [],
        suggestions: [],
        chosenNEWactionid: 0
	}

    componentDidMount = () => {  
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/findactionbyroleid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.role_id
                })
            });
            const response = await rawResponse.json();
            console.log('actions',response);
            if (response.status == 200 ){
                const roleActions = response.result.dtos.map(eachActionRoleObject => {
                    return({
                        actionID: eachActionRoleObject.actionDTO.id,
                        actionName: eachActionRoleObject.actionDTO.name,
                        actionDescription: eachActionRoleObject.actionDTO.description
                    })
                })        
                this.setState({
                    roleActions
                })
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/findnotassignedactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.role_id
                  })
            });
            const response = await rawResponse.json();
            console.log('changerole',response);
            if (response.status == 200 ){
                console.log('success');
                const suggestions = response.result.dtos.map(eachAction => {                    
                    return({label: eachAction.name, value: eachAction.name, id: eachAction.id, description: eachAction.description})
                })
                this.setState({
                    suggestions
                })
            }
        })();
    } 

	handleChangeOnRoleSelection = (result) => {
		this.state.suggestions.map( action => {
			action.value == result ? this.setState({chosenNEWactionid: action.id}) : null
		})
	}

	handleSubmit = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/actionassigntorole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "actionDTO": {
                      "id": this.state.chosenNEWactionid
                    },
                    "roleDTO": {
                      "id": this.state.role_id
                    }
                  })
            });
            const response = await rawResponse.json();
            console.log('addrole',response);
            if (response.result.messageModel.type == 'success' ){
                this.state.suggestions.map(action => {
                        action.id == this.state.chosenNEWactionid && this.setState({roleActions: [...this.state.roleActions, {
                        actionID: action.id,
                        actionName: action.value,
                        actionDescription: action.description
                    }]})
                })
            }
        })();
    }
    deletehandler = (toBdeletedRoleID) => {
        console.log('delete', toBdeletedRoleID);
        
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/userunassignfromrole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "userDTO": {
                      "id": this.state.user_id
                    },
                    "roleDTO": {
                      "id": toBdeletedRoleID
                    }
                  })
            });
            const response = await rawResponse.json();
            if (response.result.messageModel.type == 'success' ){
                console.log('delete response', response);
                this.setState(state => {
                    const roleActions = state.roleActions.filter(role => role.roleID !== toBdeletedRoleID);
                    console.log('delete after filter', roleActions);
                    return {
                        roleActions,
                    };
                });
            }
        })();
    }

    returntolist = () => {
        this.props.history.push('roleList');
    }

	render() {
        
		const columns = ["Action Title", "Action"];
		const data = this.state.roleActions.map(eachaction => {
			return(
				[eachaction.actionName, 
					<div>
						<IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ eachaction.actionName +'?')) this.deletehandler(eachaction.actionID) } } aria-label="Delete">
							<i className="zmdi zmdi-close"></i>
						</IconButton>
					</div>
				]
			)
        })
        console.log('data', data);
        
		const options = {
			filterType: 'dropdown',
			responsive: 'stacked'
		};
		return (
			<div className="formelements-wrapper">
                <PageTitleBar title={<IntlMessages id="sidebar.dataTable" />} match={this.props.match} />
				<div className="row">                    
					<div className="col-sm-12 col-md-12 col-xl-6">
                        <RctCollapsibleCard heading={this.state.rolename + "'s current Actions"}>
                            <div className="table-responsive">
                                <div className="flip-scroll">
                                    <table className="table table-bordered table-striped flip-content">
                                        <thead>
                                            <tr className="bg-primary text-white">
                                                <th> <IntlMessages id="Action title" /> </th>
                                                <th> <IntlMessages id="Delete?" /> </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.roleActions.map(eachAction => {
                                                return(<tr>
                                                    <td> {eachAction.actionName} </td>
                                                    <td style={{padding:0}}> 
                                                        <IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ this.state.rolename +"'s Action?")) this.deletehandler(eachAction.actionID) } } aria-label="Delete">
                                                            <i className="zmdi zmdi-close"></i>
                                                        </IconButton>
                                                    </td>
                                                </tr>)
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-6">
                        <RctCollapsibleCard heading={"Add New Action to The " + this.state.rolename}>
							<Form>
								<FormGroup row>
									<Label for="Role_" sm={2}><IntlMessages id="ChooseRole" /></Label>
									<Col sm={10}>
										<ReactSelect defaultValue={this.state.productownerName} id={'Role_'} changeHandler={this.handleChangeOnRoleSelection} suggestions={this.state.suggestions} />
									</Col>
								</FormGroup>
                                <div className="d-flex">
                                    <Button
                                        onClick={this.handleSubmit}
                                        variant="raised"
                                        color="primary"
                                        className="text-white mr-10 mb-10 btn-xs"
                                    >
                                        <IntlMessages id="button.add_the_new_role" />
                                    </Button>
                                    <Button
                                        onClick={this.returntolist}
                                        variant="raised"
                                        color="secondary"
                                        className="text-white btn-xs mb-10"
                                    >
                                        <IntlMessages id="button.return_to_table_list" />
                                    </Button>
                                </div>
							</Form>
						</RctCollapsibleCard>
					
                    </div>
				</div>
			</div>

		);
	}
}
