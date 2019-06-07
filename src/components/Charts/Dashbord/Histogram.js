import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {  getHistogramCharts } from "../../../services/_dashbordChartsService";
import { connect } from "react-redux";


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
            locale:props.locale
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
        this.setState({
            labels:title,
            data:value

        });
    };

    getData = (settings,locale,dataReceived) => {
        getHistogramCharts(settings,locale,dataReceived);
    }

	render() {

        let data={
            labels: this.state.labels,
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                fill:false,
                lineTension:0,
                data: this.state.data
            }]
        };
		return (

            <Line
                data={data}
                options={this.options}
                width={100}
                height={30}
            />
			
		);
	}
}

function mapStateToProps(state) {

    return { settings: state.chartsSetting,locale:state.settings.locale.locale }
  }

export default connect(mapStateToProps)(HistogramChart);
