import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import HeatmapLayer from './HeatLayer';
import { addressPoints } from './HeatData/realworld.10000.js';

class HeatMapChart extends Component {

    componentDidMount(){
        // console.log('heat map charrrrrt');
        // console.log(L.heatLayer);
        // this.creatMap();
    }

  render() {
        return (
            <div>
            <Map center={[32.4279,53.6880]} zoom={4}>
                <HeatmapLayer
                fitBoundsOnLoad
                fitBoundsOnUpdate
                points={addressPoints}
                longitudeExtractor={m => m[1]}
                latitudeExtractor={m => m[0]}
                intensityExtractor={m => parseFloat(m[2])} />
                <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution=''
                />
            </Map>
            </div>
        );
        }
        // const position = [51.505, -0.09]
        // const map = (
        // <Map center={position} zoom={13}>
        //     <TileLayer
        //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        //     attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        //     />
        //     <Marker position={position}>
        //     <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
        //     </Marker>
        // </Map>
        // )
        // return map;

}

export default HeatMapChart;