import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {Line} from 'react-chartjs-2';
import {  getHistogramCharts,getHistogramFilterData } from "../../../services/_dashbordChartsService";
import { connect } from "react-redux";
import {histogramIntervalChange} from "../../../actions/DashbordChartsActions"

import IntlMessages from 'Util/IntlMessages';


class HistogramChart extends Component {

    options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        
      
    };

    constructor(props){
        super(props);
        this.state = {
            data: [],
            labels: [],
            locale:props.locale,
            filter:[]
        }
    }
    componentDidMount = ()=>{
        console.log(this.props.settings);
        this.getData(this.props.settings,this.props.locale,this.dataIsReceived);
    };

    componentWillReceiveProps(nextProps) {
        console.log('new locale', nextProps.locale);
        console.log('old locale', this.props.locale);
        // if(this.props.locale !== nextProps.locale){
            this.getData(nextProps.settings,nextProps.locale,this.dataIsReceived)
        // }
        
    }

    dataIsReceived = (title,value)=>{
        getHistogramFilterData({"key" : "HISTORGAM_INTERVAL"},this.props.locale)
            .then((res)=>{
                this.setState((prev)=>{
                    return {
                        ...prev,
                        labels:title,
                        data:value,
                        filter:res
                    }
                })
            });
        // this.setState({
        //     labels:title,
        //     data:value

        // });
    };

    getData = (settings,locale,dataReceived) => {
        getHistogramCharts(settings,locale,dataReceived);
    }

    intervalChange = (event)=>{
        this.props.intervalChange(event.target.value);
    }

	render() {
        let header = this.props.header;
        // console.info("header",header);
        let data={
            labels: this.state.labels,
            datasets: [{
                label: header,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                fill:false,
                lineTension:0,
                data: this.state.data
            }]
        };
		return (
            <div>
                <select onChange={this.intervalChange} >

                    { this.state.filter.map((data, key)=><option selected={this.props.settings.intervalChange === key ? true:false} key={key} value={data.key}>{data.title}</option>) }

                </select>
                 <Line
                    data={data}
                    options={this.options}
                    width={100}
                    height={30}
                />
           </div>

			
		);
	}
}

function mapStateToProps(state) {

    return { settings: state.chartsSetting,locale:state.settings.locale.locale }
  }

export default connect(mapStateToProps,{intervalChange:histogramIntervalChange})(HistogramChart);
