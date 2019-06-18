import React, { Component } from 'react'
import ReactHighcharts from "react-highcharts/ReactHighmaps";
import mapData from "./mapData"


// const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700]
// ];
class MapChart extends Component {

  constructor(props){
    super(props);
    
    const mapOptions = {
      title: {
        text: ''
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#4444FF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },
      series: [{
        mapData: mapData,
        
        name: 'Iran',
        data: []
            
        }]
    };
    this.state = {mapOptions};
  }

  componentDidMount(){

    let data = this.calHcKeys(this.props);
    const mapOptions = {
      title: {
        text: ''
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#4444FF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },

      series: [{
        mapData: mapData,
        
        name: 'Iran',
        data: data
            
        }]
    };
    this.setState(prev=>({
      ...prev,
      mapOptions:mapOptions

    }));
    
  }


  componentWillReceiveProps(nextProps){
    let data = this.calHcKeys(nextProps);
    console.info(data);
    const mapOptions = {
      title: {
        text: ''
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#4444FF'],
          [0.67, '#4444FF'],
          [1, '#000022']
        ]
      },

      series: [{
        mapData: mapData,
        
        name: 'Iran',
        data: data
            
        }]
    };
    this.setState(prev=>({
      ...prev,
      mapOptions:mapOptions

    })); 
  }

  calHcKeys = (param)=>{
    var keys = param.keys;
    var data = param.data;

    console.info(data,keys);
    let res=[];
    for(let i=0;i<keys.length;i++){
      let arr = [];
      arr.push(keys[i]);
      arr.push(data[i]);
      res.push(arr);
    }
    return res;
  }

  render() {
    console.info(this.state);
    return (
      <div className="App">
        <ReactHighcharts
          config={this.state.mapOptions}
        />
      </div>
    );
  }
}

export default MapChart;