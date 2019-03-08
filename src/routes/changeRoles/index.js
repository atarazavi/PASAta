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

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

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
        userRoles: [],
        suggestions: [],
        chosenNEWroleid: 0
	}

    componentDidMount = () => {      
        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + 'permission/role/findbyuserid', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': givenToken
        //         },
        //         body: JSON.stringify({
        //             "id": this.state.user_id
        //         })
        //     });
        //     const response = await rawResponse.json();
        //     console.log(response);
        //     if (response.status == 200 ){
        //         console.log('success');
        //         this.userRoles = response.result.dtos.map(eachrole => {
        //             return({
        //                 roleID: eachrole.roleDTO.id,
        //                 roleName: eachrole.roleDTO.name,
        //                 roleDescription: eachrole.roleDTO.description
        //             })
        //         })
        //     }
        // })();

        let response = {
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
                    "pageSize": 0
                },
                "dtos": [
                    {
                        "roleDTO": {
                            "id": 47,
                            "name": "null",
                            "description": "null"
                        },
                        "userDTO": {
                            "id": 165,
                            "username": "user_test",
                            "password": "$2a$10$rxHoy6LXZwW0x7Kr3wD1n.wBAkPbfM4ka2Ks19EIDsr/t2fGTPhMq",
                            "password2": null,
                            "description": null,
                            "fullName": "User Test",
                            "email": "user_test@kisc.co.ir",
                            "mobile": null,
                            "creationDate": "1397/11/10 12:46",
                            "editionDate": null,
                            "productproviderDTO": {
                                "id": 76,
                                "productproviderLangDTOS": [
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
                                        "productProviderId": 76,
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
                                ]
                            }
                        }
                    },
                    {
                        "roleDTO": {
                            "id": 62,
                            "name": "Test Group 1234",
                            "description": "Test Group Desc"
                        },
                        "userDTO": {
                            "id": 165,
                            "username": "user_test",
                            "password": "$2a$10$rxHoy6LXZwW0x7Kr3wD1n.wBAkPbfM4ka2Ks19EIDsr/t2fGTPhMq",
                            "password2": null,
                            "description": null,
                            "fullName": "User Test",
                            "email": "user_test@kisc.co.ir",
                            "mobile": null,
                            "creationDate": "1397/11/10 12:46",
                            "editionDate": null,
                            "productproviderDTO": {
                                "id": 76,
                                "productproviderLangDTOS": [
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
                                        "productProviderId": 76,
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
                                ]
                            }
                        }
                    },
                    {
                        "roleDTO": {
                            "id": 69,
                            "name": "ProductProvider",
                            "description": "Product Provider Role"
                        },
                        "userDTO": {
                            "id": 165,
                            "username": "user_test",
                            "password": "$2a$10$rxHoy6LXZwW0x7Kr3wD1n.wBAkPbfM4ka2Ks19EIDsr/t2fGTPhMq",
                            "password2": null,
                            "description": null,
                            "fullName": "User Test",
                            "email": "user_test@kisc.co.ir",
                            "mobile": null,
                            "creationDate": "1397/11/10 12:46",
                            "editionDate": null,
                            "productproviderDTO": {
                                "id": 76,
                                "productproviderLangDTOS": [
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
                                        "productProviderId": 76,
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
                                ]
                            }
                        }
                    }
                ]
            }
        }
        
        const userRoles = response.result.dtos.map(eachrole => {
            return({
                roleID: eachrole.roleDTO.id,
                roleName: eachrole.roleDTO.name,
                roleDescription: eachrole.roleDTO.description
            })
        })
        
        const suggestions = userRoles.map(eachRole => {
            return({label: eachRole.roleName, value: eachRole.roleName, id: eachRole.roleID})
        })

        this.setState({
            userRoles,
            suggestions
        })

		// // it should be gotten from sth like localstorage
		// const currentlanguage = 'fa'
		// // it should be gotten from sth like localstorage
		// let nameinCurrentLang = {}
		// response.result.dtos.productproviderDTO.productproviderLangDTOS.map(each => {	
        //     if (currentlanguage == each.languageDTO.code){
        //         nameinCurrentLang = {
        //             lang_code: each.languageDTO.code,
        //             nameinthisLang: each.name,
        //             companynameinthislang: each.companyName,
        //             descriptioninthislang: each.describtion
        //         }
        //     }
        // })
    } 

	handleChangeOnRoleSelection = (result) => {
		this.state.suggestions.map( role => {
			role.value == result ? this.setState({chosenNEWroleid: role.id}) : null
		})
	}

	handleSubmit = (e) => {
		// e.preventDefault()
		console.log('submit');
		const toBsentData = 
        {
            "id": this.state.user_id,
        }
    }
    
    deletehandler = () => {
    }

    returntolist = () => {
        this.props.history.push('/horizontal/tables/data-table');
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
                                            this.state.userRoles.map(eachRole => {
                                                return(<tr>
                                                    <td> {eachRole.roleName} </td>
                                                    <td style={{padding:0}}> 
                                                        <IconButton className="text-danger" onClick={() => { if (window.confirm('Are you sure you wish to delete'+ this.state.username +"'s role?")) this.deletehandler } } aria-label="Delete">
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
									<Label for="Role_" sm={2}>Choose Role</Label>
									<Col sm={10}>
										<ReactSelect defaultValue={this.state.productownerName} id={'Role_'} changeHandler={this.handleChangeOnRoleSelection} suggestions={this.state.suggestions} />
									</Col>
								</FormGroup>
                                <div className="d-flex">
                                    <Button
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
