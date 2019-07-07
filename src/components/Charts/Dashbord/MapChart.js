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
    this.mapOptions = {
      title: {
        text: ''
      },
      colorAxis: {
        min: 0,
        stops: [
          [0, '#E3E3FB'],
          [0.10, '#9D9DFC'],
          [0.40, '#4444FF'],
          [1, '#000022']
        ]
      },
      series: [{
        mapData: mapData,
        
        name: 'Iran',
        data: []
            
        }]
    };
    this.provincesData = [
      ['ir-5428', 0],
      ['ir-hg', 0],
      ['ir-bs', 0],
      ['ir-kb', 0],
      ['ir-fa', 0],
      ['ir-es', 0],
      ['ir-sm', 0],
      ['ir-go', 0],
      ['ir-mn', 0],
      ['ir-th', 0],
      ['ir-mk', 0],
      ['ir-ya', 0],
      ['ir-cm', 0],
      ['ir-kz', 0],
      ['ir-lo', 0],
      ['ir-il', 0],
      ['ir-ar', 0],
      ['ir-qm', 0],
      ['ir-hd', 0],
      ['ir-za', 0],
      ['ir-qz', 0],
      ['ir-wa', 0],
      ['ir-ea', 0],
      ['ir-bk', 0],
      ['ir-gi', 0],
      ['ir-kd', 0],
      ['ir-kj', 0],
      ['ir-kv', 0],
      ['ir-ks', 0],
      ['ir-sb', 0],
      ['ir-ke', 0],
      ['ir-al', 0]
  ];
    // console.info("provincesData",this.provincesData[0]);
    this.state = {mapOptions:this.mapOptions};
  }

  
  componentDidMount(){

    let data = this.calHcKeys(this.props);
    this.mapOptions.series[0].data = data;
    this.setState(prev=>({
      ...prev,
      mapOptions:this.mapOptions

    }));
    
  }


  componentWillReceiveProps(nextProps){
    // console.info('next props',nextProps);
    let data = this.calHcKeys(nextProps);
    this.mapOptions.series[0].data = data;
    this.setState(prev=>({
      ...prev,
      mapOptions:this.mapOptions
    })); 
  }

  calHcKeys = (param)=>{
    var keys = param.keys;
    var data = param.data;

    this.provincesData = this.getProvincesData();
    // console.info(data,keys);
    // let res=[];
    for(let i=0;i<keys.length;i++){
      let arr = [];
      arr.push(keys[i]);
      arr.push(data[i]);
      this.provincesData.push(arr);
    }

    // res.forEach((item)=>{
    //   let provinceIndex = this.provincesData.indexOf(item);
    //   console.info("provinceIndex",provinceIndex);
    //   if( provinceIndex !== -1){
    //     this.provincesData.splice(provinceIndex);
    //     this.provincesData.push(item);
    //   }
    // })
    // this.provincesData.push(res);
    console.info("provincesData",this.originalData);
    return this.provincesData;
  }

  getProvincesData(){
    return [
        ['ir-5428', 0],
        ['ir-hg', 0],
        ['ir-bs', 0],
        ['ir-kb', 0],
        ['ir-fa', 0],
        ['ir-es', 0],
        ['ir-sm', 0],
        ['ir-go', 0],
        ['ir-mn', 0],
        ['ir-th', 0],
        ['ir-mk', 0],
        ['ir-ya', 0],
        ['ir-cm', 0],
        ['ir-kz', 0],
        ['ir-lo', 0],
        ['ir-il', 0],
        ['ir-ar', 0],
        ['ir-qm', 0],
        ['ir-hd', 0],
        ['ir-za', 0],
        ['ir-qz', 0],
        ['ir-wa', 0],
        ['ir-ea', 0],
        ['ir-bk', 0],
        ['ir-gi', 0],
        ['ir-kd', 0],
        ['ir-kj', 0],
        ['ir-kv', 0],
        ['ir-ks', 0],
        ['ir-sb', 0],
        ['ir-ke', 0],
        ['ir-al', 0]
    ];
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