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
        username: this.props.location.state.username,
        user_id: this.props.location.state.user_id,
        userGroups: [],
        suggestions: [],
        chosenNEWgroupid: 0,
        emptyArr:false
	}

    componentDidMount = () => {  
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/findbyuserid', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "id": this.state.user_id
                })
            });
            const response = await rawResponse.json();
            console.log('changerole',response);
            if (response.status == 200 ){
                if(response.result.dtos){
                    const userGroups = response.result.dtos.map(eachGroup => {
                        return({
                            groupID: eachGroup.groupDTO.id,
                            groupName: eachGroup.groupDTO.name,
                            groupDescription: eachGroup.groupDTO.description
                        })
                    })        
                    this.setState({
                        userGroups,
                        emptyArr:true
                    })
                }
               
            }
        })();

        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/filter', {
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
            console.log('changegroup',response);
            if (response.status == 200 ){
                console.log('success');
                const suggestions = response.result.dtos.map(eachGroup => {
                    console.log('eachGroup', eachGroup);
                    
                    return({label: eachGroup.name, value: eachGroup.name, id: eachGroup.id, description: eachGroup.description})
                })
                this.setState({
                    suggestions
                })
            }
        })();        
    } 

	handleChangeOnGroupSelection = (result) => {
		this.state.suggestions.map( role => {
			role.value == result ? this.setState({chosenNEWgroupid: role.id}) : null
		})
	}

	handleSubmit = () => {
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/userassigntogroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "userDTO": {
                      "id": this.state.user_id
                    },
                    "groupDTO": {
                      "id": this.state.chosenNEWgroupid
                    }
                  })
            });
            const response = await rawResponse.json();
            console.log('addrole',response);
            if (response.result.messageModel.type == 'success' ){
                this.state.suggestions.map(group => {
                    group.id == this.state.chosenNEWgroupid && this.setState({userGroups: [...this.state.userGroups, {
                        groupID: group.id,
                        groupName: group.value,
                        groupDescription: group.description
                    }]})
                })
            }
        })();
        // this.forceUpdate()
    }
    deletehandler = (toBdeletedgroupID) => {
        console.log('delete', toBdeletedgroupID);
        
        (async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/permission/group/userunassignfromgroup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('given_token')
                },
                body: JSON.stringify({
                    "userDTO": {
                      "id": this.state.user_id
                    },
                    "groupDTO": {
                      "id": toBdeletedgroupID
                    }
                  })
            });
            const response = await rawResponse.json();
            if (response.result.messageModel.type == 'success' ){
                console.log('delete response', response);
                this.setState(state => {
                    const userGroups = state.userGroups.filter(role => role.groupID !== toBdeletedgroupID);
                    console.log('delete after filter', userGroups);
                    return {
                        userGroups,
                    };
                });
            }
        })();
    }

    returntolist = () => {
        this.props.history.push('tables/data-table');
    }
    sd =()=> {
        console.log(this.state,"state");
        
    }
	render() {
        
		return (
			<div className="formelements-wrapper" onMouseEnter={this.sd}>
				<div className="row">
					<div className="col-sm-12 col-md-12 col-xl-6">
                        <RctCollapsibleCard heading={this.state.username + "'s current Groups"}>
                            <div className="table-responsive">
                                <div className="flip-scroll">
                                    <table className="table table-bordered table-striped flip-content">
                                        <thead>
                                            <tr className="bg-primary text-white">
                                                <th> Group title </th>
                                                <th> Action </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.emptyArr?
                                                this.state.userGroups.map(eachGroup => {
                                                    return(<tr>
                                                        <td> {eachGroup.groupName} </td>
                                                        <td style={{padding:0}}> 
                                                            <IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ this.state.username +"'s role?")) this.deletehandler(eachGroup.groupID) } } aria-label="Delete">
                                                                <i className="zmdi zmdi-close"></i>
                                                            </IconButton>
                                                        </td>
                                                    </tr>)
                                                })
                                                :
                                                <tr>
                                                    <td>NoGroup</td>

                                                </tr>
                                            }
                                        
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </RctCollapsibleCard>

                    </div>
                    <div className="col-sm-12 col-md-12 col-xl-6">

                        <RctCollapsibleCard heading={"Add New Group For The " + this.state.username}>
							<Form>
								<FormGroup row>
									<Label for="Group_" sm={2}>Choose Group</Label>
									<Col sm={10}>
										<ReactSelect id={'Group_'} changeHandler={this.handleChangeOnGroupSelection} suggestions={this.state.suggestions} />
									</Col>
								</FormGroup>
                                <div className="d-flex">
                                    <Button
                                        onClick={this.handleSubmit}
                                        variant="raised"
                                        color="primary"
                                        className="text-white mr-10 mb-10 btn-xs"
                                    >
                                        <IntlMessages id="button.add_the_new_group" />
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
