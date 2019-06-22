/**
 * React-Chartjs2
 */
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {  getPieChart } from "../../services/_dashbordChartsService";
import {
	RevenueWidget,
} from "Components/Widgets";

import {
	totalRevenue,
} from '../widgets/data';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// import {Line} from 'react-chartjs-2';
import Histogram from '../../components/Charts/Dashbord/Histogram';
import PieChart from '../../components/Charts/Dashbord/PieChart';
import MapChart from '../../components/Charts/Dashbord/MapChart'
import HeatMapChart from '../../components/Charts/Dashbord/HeatMapChart'

import {customFilterChange} from '../../actions/DashbordChartsActions';
import IntlMessages from 'Util/IntlMessages';

class ReactCharts extends Component {

    constructor(props){
        super(props);
        this.state = {
            pie:{
                productPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                industryPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                catPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                subCatPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                providerPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                manufacturerPie:{
                    title:[],
                    aggregationValue:[],
                    ids:[]
                },
                province:{
                    title:[],
                    aggregationValue:[],
                    keys:[],
                    ids:[]
                },
                heatmap:[ [] ]
             }
        };
    }

    componentDidMount(){

        this.getPieChartData(this.props.settings,this.props.locale);
        
    }
    componentWillReceiveProps(nextProps) {
        console.log('new locale', nextProps.locale);
        console.log('old locale', this.props.locale);
        // console.info('nexprops is',nextProps);
        // if(this.props.locale !== nextProps.locale){
            this.getPieChartData(nextProps.settings,nextProps.locale);
        // }
        
    }

    getPieChartData = (settings,locale)=>{
        getPieChart(settings,locale)
            .then(res=>{ 
                this.setState(prev => {
                    return {
                        ...prev,
                        pie:res
                    }
                });
            });
    };

	render() {
        // console.info('Histogram title is: ',<IntlMessages id='charts.histogram' />);
		return (
            <div>

                <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-12">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.histogram' />}>
                        <Histogram header={""}
                        />
                        </RctCollapsibleCard>
                    </div>
                    
                </div>

                <div className="row">

                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.productPie' />}>
                            <PieChart 
                                    customFilterChange={(id)=>{
                                        this.props.customFilter('productTypes',id);
                                    }} 
                                    data={this.state.pie.productPie.aggregationValue}
                                    title={this.state.pie.productPie.title}
                                    ids={this.state.pie.productPie.ids}
                                    settings={this.props.settings}
                                    locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.industryPie' />}>
                            <PieChart customFilterChange={(id)=>{
                                            this.props.customFilter('industries',id);
                                      }}
                                      data={this.state.pie.industryPie.aggregationValue}
                                      title={this.state.pie.industryPie.title}
                                      ids={this.state.pie.industryPie.ids}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.catPie' />}>
                        <PieChart customFilterChange={(id)=>{
                                            this.props.customFilter('productcategories',id);
                                   }} 
                                      data={this.state.pie.catPie.aggregationValue}
                                      title={this.state.pie.catPie.title}
                                      ids={this.state.pie.catPie.ids}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.subCatPie' />}>
                            <PieChart 
                                    customFilterChange={(id)=>{
                                            this.props.customFilter('productSubcategories',id);
                                    }}
                                      data={this.state.pie.subCatPie.aggregationValue}
                                      title={this.state.pie.subCatPie.title}
                                      ids={this.state.pie.subCatPie.ids}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.providerPie' />}>
                            <PieChart 
                                    customFilterChange={(id)=>{
                                        this.props.customFilter('productproviders',id);
                                    }}
                                      data={this.state.pie.providerPie.aggregationValue}
                                      title={this.state.pie.providerPie.title}
                                      ids={this.state.pie.providerPie.ids}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.manufacturerPie' />}>
                            <PieChart 
                                    customFilterChange={(id)=>{
                                        this.props.customFilter('manufacturers',id);
                                    }}
                                      data={this.state.pie.manufacturerPie.aggregationValue}
                                      title={this.state.pie.manufacturerPie.title}
                                      ids={this.state.pie.manufacturerPie.ids}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                </div>
                    
                <div className="row" >
                    <div className="col-sm-12 col-md-6 ">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.province' />}>
                            <MapChart 
                                keys={this.state.pie.province.keys}
                                id={this.state.pie.province.ids}
                                data={this.state.pie.province.aggregationValue}
                                title={this.state.pie.province.title}
                            />
                        </RctCollapsibleCard>
                    </div> 
                    <div className="col-sm-12 col-md-6">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.heatmap' />}>
                            <HeatMapChart
                                data={this.state.pie.heatmap} 
                            />
                        </RctCollapsibleCard>
                    </div> 
                </div>
            </div>

            
        );
	}
}


function mapStateToProps(state) {

    return { settings: state.chartsSetting,locale:state.settings.locale.locale }
  }

export default connect(mapStateToProps,{customFilter:customFilterChange})(ReactCharts);
