/**
 * Prevent Scroll Buttons
 */
import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import {golbalFilterChange,customFilterChange} from '../../../actions/DashbordChartsActions';
import {  getAllFilterData } from "../../../services/_dashbordChartsService";
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

import "react-datepicker/dist/react-datepicker.css";
import EnDatePicker from "react-datepicker"
// app config
import AppConfig from 'Constants/AppConfig';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
const giventoken = localStorage.getItem('given_token')


function TabContainer({ children }) {
    return (
        <Typography component="div" style={{ padding: 3 * 3 }}>
            {children}
        </Typography>
    );
}

class PreventScrollButtons extends Component {
constructor(props){
        super(props);
        this.state = {
            activeIndex: 0,
            STARTING_DATE: [],
            HISTORGAM_INTERVAL: [],
            TAP_AUTH_RESULT_TYPE: [],
            chosenstartdate : '',
            chosenenddate: '',
            filter:{
                pieData:{
                    productPie:{title:[],ids:[]},
                    providerPie:{title:[],ids:[]},
                    industryPie:{title:[],ids:[]},
                    catPie:{title:[],ids:[]},
                    subCatPie:{title:[],ids:[]},
                    manufacturerPie:{title:[],ids:[]},
                },
                geoData:{
                    city:{title:[],ids:[]},
                    province:{title:[],ids:[]},
                    country:{title:[],ids:[]},
                }
            },
            form:{
                startingDate:this.props.settings.reportStarting,
                fromDate:this.props.settings.fromDate,
                toDate:this.props.settings.toDate,
                tapAuthResult:this.props.settings.tapAuthResult,
                
            }
        }
    }

    // state = {
    //     activeIndex: 0,
    //     STARTING_DATE: [],
    //     HISTORGAM_INTERVAL: [],
    //     TAP_AUTH_RESULT_TYPE: [],
    //     chosenstartdate : '',
    //     chosenenddate: '',
        
    //     form:{
    //         startingDate:'',
    //         fromDate:'',
    //         toDate:'',
    //         authResult:[],
            
    //     }

    // }

    handleFromDataChange = (e) => {
        // console.log({[e.target.name]:e.target.value});
        const value = e.target.value;
        const name = e.target.name;
        console.log(this.state);
        this.setState(prev=>{
            return {
                ...prev,
                form:{
                    ...prev.form,
                    [name]:value
                }
            }
        });
        
    }

    handleChange(e, value) {
        this.setState({ activeIndex: value });
    }
    componentDidMount = () => {     
        // this.getData();

        getAllFilterData(this.props.locale).then(res=>{
            // console.log("all filter data is",res.HISTORGAM_INTERVAL);
            this.setState(prev=>{
                return {
                    ...prev,
                    HISTORGAM_INTERVAL:res.HISTORGAM_INTERVAL,
                    TAP_AUTH_RESULT_TYPE:res.TAP_AUTH_RESULT_TYPE,
                    STARTING_DATE:res.STARTING_DATE,
                    filter:{
                        pieData:res.pieData,
                        geoData:res.geoData
                    }
                }
            })
        })
    }

    getData = ()=>{
        // const currentLanguagecode = this.props.locale;
        // console.log('currentLanguagecode', currentLanguagecode);
           
		// this.getStartingDate();
        
		// (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': localStorage.getItem('given_token'),
        //           'Accept-Language': localStorage.getItem('Current_lang')
        //         },
        //         body: JSON.stringify({
        //             "key" : "HISTORGAM_INTERVAL"
        //           })
        //     });
        //     const content = await rawResponse.json();
        //     console.log(content);
        //     if (content.messageModel.type === "success") {
        //         this.setState({
        //             HISTORGAM_INTERVAL: content.dtos
        //         })
        //     }
        // })();
        
		// this.getTapData();
    }

    getTapData = ()=>{
        // const currentLanguagecode = this.props.locale;
        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': localStorage.getItem('given_token'),
        //           'Accept-Language': localStorage.getItem('Current_lang')
        //         },
        //         body: JSON.stringify({
        //             "key" : "TAP_AUTH_RESULT_TYPE"
        //         })
        //     });
        //     const content = await rawResponse.json();
        //     console.log(content);
        //     if (content.messageModel.type == "success") {
        //         this.setState({
        //             TAP_AUTH_RESULT_TYPE: content.dtos
        //         })
        //     }
        // })();
    }

    getStartingDate = ()=>{
        // const currentLanguagecode = this.props.locale;
        // (async () => {
        //     const rawResponse = await fetch(AppConfig.baseURL + '/report/param/filter', {
        //         method: 'POST',
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': localStorage.getItem('given_token'),
        //           'Accept-Language': localStorage.getItem('Current_lang')
        //         },
        //         body: JSON.stringify({
        //             "key" : "STARTING_DATE"
        //         })
        //     });
        //     const content = await rawResponse.json();
        //     console.log(content);
        //     if (content.messageModel.type === "success") {
        //         this.setState({
        //             STARTING_DATE: content.dtos
        //         })
        //     }
        // })();
    }
    
	handleChange_DatePicker_EndDate = (selectedunix, selectedformatted) => {
		this.setState(prev=>{
            return {
                ...prev,
                chosenenddate:selectedformatted,
                form:{
                    ...prev.form,
                    toDate:selectedformatted
                }
            }
        });
    }

    appendLeadingZeroes = (n)=>{
        if(n <= 9){
          return "0" + n;
        }
        return n
    }

    handleStartDateChange = (date)=>{
        console.log(date);
        var formatted_date = date.getFullYear() +  "/" + this.appendLeadingZeroes(date.getMonth() + 1) + "/" + this.appendLeadingZeroes(date.getDate());
        console.log(formatted_date);
        this.setState(prev=>{
            return {
                ...prev,
                chosenstartdate:date,
                form:{
                    ...prev.form,
                    fromDate:formatted_date
                    
                }
            }
        });
    }
    handleEndDateChange = (date)=>{
        var formatted_date = date.getFullYear() +  "/" + this.appendLeadingZeroes(date.getMonth() + 1) + "/" + this.appendLeadingZeroes(date.getDate());
        this.setState(prev=>{
            return {
                ...prev,
                chosenenddate:date,
                form:{
                    ...prev.form,
                    toDate: formatted_date
                }
            }
        });
    }

	handleChange_DatePicker_StartDate = (selectedunix, selectedformatted) => {
        console.log(selectedformatted,selectedunix);
        this.setState(prev=>{
            return {
                ...prev,
                chosenstartdate:selectedformatted,
                form:{
                    ...prev.form,
                    fromDate:selectedformatted
                }
            }
        });
    }
    
    componentWillReceiveProps(nextProps) {
        console.log('new locale', nextProps.locale);
        console.log('old locale', this.props.locale);
        // this.getStartingDate();
        // this.getTapData();

        if(this.props.locale !== nextProps.locale){
            getAllFilterData(nextProps.locale).then(res=>{
                this.setState(prev=>{
                    return {
                        ...prev,
                        HISTORGAM_INTERVAL:res.HISTORGAM_INTERVAL,
                        TAP_AUTH_RESULT_TYPE:res.TAP_AUTH_RESULT_TYPE,
                        STARTING_DATE:res.STARTING_DATE,
                        filter:{
                            pieData:res.pieData,
                            geoData:res.geoData
                        },
                        chosenenddate:'',
                        chosenstartdate:'',
                        form:{
                            ...prev.form,
                            fromDate:'',
                            toDate:''
                        }
                    }
                })
            }); 
            // this.setState(prev=>{
            //     return {
            //         ...prev,
            //         chosenenddate:'',
            //         chosenstartdate:'',
            //         form:{
            //             ...prev.form,
            //             fromDate:'',
            //             toDate:''
            //         }
            //     }
            // }); 
        }
        
    }

    formSubmit =(e)=>{
        e.preventDefault();
        const payload = (this.state.form);
        this.props.globalFilter(payload);
    }

    render() {
        const { activeIndex } = this.state;
        return (
            <RctCollapsibleCard
                heading={
                    <RctCollapsibleCard heading="Filter">
                        <Form onSubmit={this.formSubmit}>
                            <FormGroup row style={{marginBottom: 0}}>
                                <Label for="roleName-1" style={{fontSize:12}} sm={5}><IntlMessages id="dashbord.filter.start.date.from" /></Label>
                                <Col sm={7}>

                                    <Input onChange={this.handleFromDataChange} name="startingDate" className="mb-20" type="select" bsSize="sm">
                                        {this.state.STARTING_DATE.map(each => {
                                            return(
                                                <option selected={this.props.settings.reportStarting === each.key ? true : false} value={each.key}>{each.title}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                                <Label for="roleName-1" style={{fontSize:12}} sm={5}><IntlMessages id="dashbord.filter.auth.result.type" /></Label>
                                <Col sm={7}>
                                    <Input onChange={this.handleFromDataChange} name="tapAuthResult" className="mb-20" type="select" bsSize="sm">
                                        {this.state.TAP_AUTH_RESULT_TYPE.map(each => {
                                            return(
                                                <option selected={this.props.settings.tapAuthResult === each.key ? true : false} value={each.key}>{each.title}</option>
                                            )
                                        })}
                                    </Input>
                                </Col>
                            </FormGroup>
                            { (this.props.locale ==='ar' || this.props.locale === 'fa') ? 

                            (
                                <FormGroup>
                                
								<Label style={{fontSize:12}} sm={5} for="startDate"><IntlMessages id="dashbord.filter.start.date" /></Label>
								<Col style={{fontSize:12}} sm={7}>
                                    <DatePicker
                                        placeholder="انتخاب تاریخ آغاز"
                                        format="jYYYY/jMM/jDD"
                                        onChange={this.handleChange_DatePicker_StartDate}
                                        id="smallerDatePickerClass"
                                    />
                                </Col>
								<Label style={{fontSize:12}} sm={5} for="endDate"><IntlMessages id="dashbord.filter.end.date" /></Label>
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
                            ):
                            (
                                <FormGroup>
                                
								<Label style={{fontSize:12}} sm={5} for="startDate"><IntlMessages id="dashbord.filter.start.date" /></Label>
								<Col style={{fontSize:12}} sm={7}>
                                <EnDatePicker
                                    selected={this.state.chosenstartdate}
                                    onChange={this.handleStartDateChange}
                                />
                                </Col>
								<Label style={{fontSize:12}} sm={5} for="endDate"><IntlMessages id="dashbord.filter.end.date" /></Label>
								<Col style={{fontSize:12}} sm={7}>
                                    <EnDatePicker
                                        selected={this.state.chosenenddate}
                                        onChange={this.handleEndDateChange}
                                    />
                                </Col>
                            </FormGroup>
                            )
                                
                            
                            
                            
                            }
                            <Button className="mb-10" color="primary">Submit</Button>
                        </Form>
                    </RctCollapsibleCard>
                }
            >
                <AppBar position="static" color="primary">
                    <Tabs value={activeIndex} onChange={(e, value) => this.handleChange(e, value)} scrollable scrollButtons="off">
                        <Tab style={{minWidth: 90}} label={<IntlMessages id="dashbord.filter.product" />} />
                        <Tab style={{minWidth: 90}} label={<IntlMessages id="dashbord.filter.product.category" />}/>
                        <Tab style={{minWidth: 90}} label={<IntlMessages id="dashbord.filter.geo" />} />
                    </Tabs>
                </AppBar>
                {activeIndex === 0 && 
                    <TabContainer>
                        <FilterContent header={<IntlMessages id="dashbord.filter.product.brand" />}
                                        checkedItems={this.props.settings.productTypes}
                                       data={this.state.filter.pieData.productPie.title}
                                        ids={this.state.filter.pieData.productPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('productTypes',id);
                                        }}
                        />
                        <FilterContent  header={<IntlMessages id="dashbord.filter.product.owner" />}
                                        checkedItems={this.props.settings.productproviders}
                                       data={this.state.filter.pieData.providerPie.title}
                                        ids={this.state.filter.pieData.providerPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('productproviders',id);
                                        }}
                        />
                        <FilterContent  header={<IntlMessages id="dashbord.filter.product.type" />} 
                                        checkedItems={this.props.settings.manufacturers}
                                       data={this.state.filter.pieData.manufacturerPie.title}
                                        ids={this.state.filter.pieData.manufacturerPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('manufacturers',id);
                                        }}
                        />
                        
                    </TabContainer>}
                {activeIndex === 1 && 
                    <TabContainer>
                        <FilterContent  header={<IntlMessages id="dashbord.filter.product.inustry" />}
                                        checkedItems={this.props.settings.industries}
                                        data={this.state.filter.pieData.industryPie.title}
                                        ids={this.state.filter.pieData.industryPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('industries',id);
                                        }}
                        />
                        <FilterContent  header={<IntlMessages id="dashbord.filter.product.category" />}
                                        checkedItems={this.props.settings.productcategories}
                                        data={this.state.filter.pieData.catPie.title}
                                        ids={this.state.filter.pieData.catPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('productcategories',id);
                                        }}
                        />
                        <FilterContent  header={<IntlMessages id="dashbord.filter.product.subcategory" />}
                                        checkedItems={this.props.settings.productSubcategories}
                                        data={this.state.filter.pieData.subCatPie.title}
                                        ids={this.state.filter.pieData.subCatPie.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('productSubcategories',id);
                                        }}
                        />
                    </TabContainer>}
                {activeIndex === 2 && 
                    <TabContainer>
                    <FilterContent      header={<IntlMessages id="dashbord.filter.country" />}
                                        checkedItems={this.props.settings.countries}
                                        data={this.state.filter.geoData.country.title}
                                        ids={this.state.filter.geoData.country.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('countries',id);
                                        }}
                        />
                    <FilterContent      header={<IntlMessages id="dashbord.filter.province" />}
                                        checkedItems={this.props.settings.provinces}
                                        data={this.state.filter.geoData.province.title}
                                        ids={this.state.filter.geoData.province.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('provinces',id);
                                        }}
                        />
                    <FilterContent      header={<IntlMessages id="dashbord.filter.geo" />}
                                        checkedItems={this.props.settings.cities}
                                        data={this.state.filter.geoData.city.title}
                                        ids={this.state.filter.geoData.city.ids}
                                        filter={(id)=>{
                                            this.props.customFilter('cities',id);
                                        }}
                        />
                    </TabContainer>}
            </RctCollapsibleCard>
        );
    }
}

function mapStateToProps(state) {

    return { settings: state.chartsSetting,locale:state.settings.locale.locale }
  }


export default connect(mapStateToProps,{globalFilter:golbalFilterChange,customFilter:customFilterChange})(PreventScrollButtons);
