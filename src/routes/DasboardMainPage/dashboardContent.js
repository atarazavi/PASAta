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

import IntlMessages from 'Util/IntlMessages';

class ReactCharts extends Component {

    constructor(props){
        super(props);
        this.state = {
            pie:{
                productPie:{
                    title:[],
                    aggregationValue:[]
                },
                industryPie:{
                    title:[],
                    aggregationValue:[]
                },
                catPie:{
                    title:[],
                    aggregationValue:[]
                },
                subCatPie:{
                    title:[],
                    aggregationValue:[]
                },
                providerPie:{
                    title:[],
                    aggregationValue:[]
                },
                manufacturerPie:{
                    title:[],
                    aggregationValue:[]
                },
                province:{
                    title:[],
                    aggregationValue:[],
                    keys:[],
                    ids:[]
                },
                heatmap:[]
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
		return (
            <div>

                <div className="row">
                    <div className="col-sm-12 col-md-12 col-xl-12">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.histogram' />}>
                        <Histogram header={<IntlMessages id='charts.label.histogram' />}
                        />
                        </RctCollapsibleCard>
                    </div>
                    
                </div>

                <div className="row">

                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.productPie' />}>
                            <PieChart data={this.state.pie.productPie.aggregationValue}
                                    title={this.state.pie.productPie.title}
                                    settings={this.props.settings}
                                    locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.industryPie' />}>
                            <PieChart data={this.state.pie.industryPie.aggregationValue}
                                      title={this.state.pie.industryPie.title}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.catPie' />}>
                        <PieChart data={this.state.pie.catPie.aggregationValue}
                                      title={this.state.pie.catPie.title}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.subCatPie' />}>
                            <PieChart data={this.state.pie.subCatPie.aggregationValue}
                                      title={this.state.pie.subCatPie.title}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.providerPie' />}>
                            <PieChart data={this.state.pie.providerPie.aggregationValue}
                                      title={this.state.pie.providerPie.title}
                                      settings={this.props.settings}
                                      locale={this.props.locale}
                            />
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading={<IntlMessages id='charts.manufacturerPie' />}>
                            <PieChart data={this.state.pie.manufacturerPie.aggregationValue}
                                      title={this.state.pie.manufacturerPie.title}
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

export default connect(mapStateToProps)(ReactCharts);
