/**
 * Prevent Scroll Buttons
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Col,
} from 'reactstrap';

import FilterContent from '../filterContent'

// intl messages
import IntlMessages from 'Util/IntlMessages';

import {DatePicker} from "react-advance-jalaali-datepicker";
// app config
import AppConfig from 'Constants/AppConfig';
const giventoken = localStorage.getItem('given_token')
const currentLanguagecode = localStorage.getItem('Current_lang')
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 3 * 3 }}>
            {children}
        </Typography>
    );
}

class PreventScrollButtons extends Component {

    state = {
        activeIndex: 0,
        STARTING_DATE: [],
        HISTORGAM_INTERVAL: [],
        TAP_AUTH_RESULT_TYPE: [],
        chosenstartdate : '',
        chosenenddate: '',

    }

    handleChange(e, value) {
        this.setState({ activeIndex: value });
    }
    componentDidMount = () => {     
        console.log('currentLanguagecode', currentLanguagecode);
           
		(async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': giventoken,
                  'Accept-Language': currentLanguagecode
                },
                body: JSON.stringify({
                    "key" : "STARTING_DATE"
                })
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.messageModel.type == "success") {
                this.setState({
                    STARTING_DATE: content.dtos
                })
            }
        })();
        
		(async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': giventoken,
                  'Accept-Language': currentLanguagecode
                },
                body: JSON.stringify({
                    "key" : "HISTORGAM_INTERVAL"
                  })
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.messageModel.type == "success") {
                this.setState({
                    HISTORGAM_INTERVAL: content.dtos
                })
            }
        })();
        
		(async () => {
            const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': giventoken,
                  'Accept-Language': currentLanguagecode
                },
                body: JSON.stringify({
                    "key" : "TAP_AUTH_RESULT_TYPE"
                })
            });
            const content = await rawResponse.json();
            console.log(content);
            if (content.messageModel.type == "success") {
                this.setState({
                    TAP_AUTH_RESULT_TYPE: content.dtos
                })
            }
        })();
    }
    
	handleChange_DatePicker_EndDate = (selectedunix, selectedformatted) => {
		this.setState({
			chosenenddate: selectedformatted
		})
	}
	handleChange_DatePicker_StartDate = (selectedunix, selectedformatted) => {
		this.setState({
			chosenstartdate: selectedformatted
		})
	}
    render() {
        const { activeIndex } = this.state;
        return (
            <RctCollapsibleCard
                heading={
                    <RctCollapsibleCard heading="Filter">
                        <Form>
                            <FormGroup row style={{marginBottom: 0}}>
                                <Label for="roleName-1" style={{fontSize:12}} sm={5}>starting date from</Label>
                                <Col sm={7}>
                                    <Input className="mb-20" type="select" bsSize="sm">
                                        <option selected disabled>Choose starting date</option>
                                        {this.state.STARTING_DATE.map(each => {
                                            return(
                                                <option value={each.value}>{each.title}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                                <Label for="roleName-1" style={{fontSize:12}} sm={5}>Auth result type</Label>
                                <Col sm={7}>
                                    <Input className="mb-20" type="select" bsSize="sm">
                                        <option selected disabled>Choose Auth result type</option>
                                        {this.state.TAP_AUTH_RESULT_TYPE.map(each => {
                                            return(
                                                <option value={each.value}>{each.title}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                
								<Label style={{fontSize:12}} sm={5} for="startDate">Start Date:</Label>
								<Col style={{fontSize:12}} sm={7}>
                                    <DatePicker
                                        placeholder="انتخاب تاریخ آغاز"
                                        format="jYYYY/jMM/jDD"
                                        onChange={this.handleChange_DatePicker_StartDate}
                                        id="smallerDatePickerClass"
                                    />
                                </Col>
								<Label style={{fontSize:12}} sm={5} for="endDate">End Date:</Label>
								<Col style={{fontSize:12}} sm={7}>
                                    <DatePicker 
                                        inputComponent={this.DatePickerInput}
                                        placeholder="انتخاب تاریخ پایان"
                                        format="jYYYY/jMM/jDD"
                                        onChange={this.handleChange_DatePicker_EndDate}
                                        id="smallerDatePickerClass"
                                    />
                                </Col>
                            </FormGroup>
                            <Button className="mb-10" color="primary">Submit</Button>
                        </Form>
                    </RctCollapsibleCard>
                }
            >
                <AppBar position="static" color="primary">
                    <Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} scrollable scrollButtons="off">
                        <Tab style={{minWidth: 90}} label="کالا" />
                        <Tab style={{minWidth: 90}} label="گروه بندی کالا" />
                        <Tab style={{minWidth: 90}} label="اطلاعات جغرافیایی" />
                    </Tabs>
                </AppBar>
                {activeIndex === 0 && 
                    <TabContainer>
                        <FilterContent />
                        <FilterContent />
                        <FilterContent />
                        <FilterContent />
                    </TabContainer>}
                {activeIndex === 1 && 
                    <TabContainer>
                        سیبلا
                    </TabContainer>}
                {activeIndex === 2 && 
                    <TabContainer>
                        <FilterContent />
                    </TabContainer>}
            </RctCollapsibleCard>
        );
    }
}

export default PreventScrollButtons;
