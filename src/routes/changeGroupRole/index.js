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
import { Table } from 'reactstrap';

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

const giventoken = localStorage.getItem('given_token')

export default class AutoComplete extends Component {
	state = {
        groupname: this.props.location.state.groupname,
        group_id: this.props.location.state.group_id,
        groupRoles: [],
        suggestions: [],
        chosenNEWroleid: 0
	}

    componentDidMount = () => {                     
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/findbyrgroupid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.group_id
                })
            });
            const response = await rawResponse.json();
            console.log('changerole',response);
            if (response.status == 200 ){
                // const groupRoles = response.result.dtos.map(eachrole => {
                //     return({
                //         roleID: eachrole.roleDTO.id,
                //         roleName: eachrole.roleDTO.name,
                //         roleDescription: eachrole.roleDTO.description
                //     })
                // })        
                // this.setState({
                //     groupRoles
                // })
                
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/filter', {
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
            const response = await rawResponse.json();
            console.log('changerole',response);
            if (response.status == 200 ){
                console.log('success');
                const suggestions = response.result.dtos.map(eachRole => {
                    console.log('eachRole', eachRole);
                    
                    return({label: eachRole.name, value: eachRole.name, id: eachRole.id, description: eachRole.description})
                })
                this.setState({
                    suggestions
                })
            }
        })();
    } 

	handleChangeOnRoleSelection = (result) => {
		this.state.suggestions.map( role => {
			role.value == result ? this.setState({chosenNEWroleid: role.id}) : null
		})
	}

	handleSubmit = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/groupassigntorole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "groupDTO": {
                      "id": this.state.group_id
                    },
                    "roleDTO": {
                      "id": this.state.chosenNEWroleid
                    }
                  })
            });
            const response = await rawResponse.json();
            console.log('addrole',response);
            if (response.result.messageModel.type == 'success' ){
                this.state.suggestions.map(roles => {
                    roles.id == this.state.chosenNEWroleid && this.setState({groupRoles: [...this.state.groupRoles, {
                        roleID: roles.id,
                        roleName: roles.value,
                        roleDescription: roles.description
                    }]})
                })
            }
        })();
    }
    deletehandler = (toBdeletedRoleID) => {
        console.log('delete', toBdeletedRoleID);
        
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/role/groupunassignfromrole', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "groupDTO": {
                      "id": this.state.group_id
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
                    const groupRoles = state.groupRoles.filter(role => role.roleID !== toBdeletedRoleID);
                    console.log('delete after filter', groupRoles);
                    return {
                        groupRoles,
                    };
                });
            }
        })();
    }

    returntolist = () => {
        this.props.history.push('groupsList');
    }

	render() {        
		return (
			<div className="formelements-wrapper">
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
                        <RctCollapsibleCard heading={this.state.username + "'s current Roles"}>
                            <div className="table-responsive">
                                <div className="flip-scroll">
                                    <table className="table table-bordered table-striped flip-content">
                                        <thead>
                                            <tr className="bg-primary text-white">
                                                <th> Role title </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.groupRoles.map(eachRole => {
                                                return(<tr>
                                                    <td> {eachRole.roleName} </td>
                                                    <td style={{padding:0}}> 
                                                        <IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ this.state.username +"'s role?")) this.deletehandler(eachRole.roleID) } } aria-label="Delete">
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

                        <RctCollapsibleCard heading={"Add New Role For The " + this.state.username}>
							<Form>
								<FormGroup row>
									<Label for="Role_" sm={2}>Choose New Role</Label>
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
