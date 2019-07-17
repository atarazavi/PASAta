import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
// import HeatmapLayer from './HeatLayer';
// import { addressPoints } from './HeatData/realworld.10000.js';

class LocationMapChart extends Component {

    constructor(props){
        super(props);
        this.state = {
            locy:props.locy,
            locx:props.locx
        }
    }
    componentDidMount(){
        // console.log(this.state);
        this.setState(prev=>({
            ...prev,
            locx:this.props.locx,
            locy:this.props.locy
        }));
    }

    componentWillReceiveProps(nexProps){
        this.setState(prev=>({
            ...prev,
            locx:nexProps.locx,
            locy:this.props.locy
        }));
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        console.info('heat map crashed and its state is ',this.state);

      }

  render() {
        let position = [this.state.locx,this.state.locy];
        return (
            <div>
            <Map center={position} zoom={13}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={position}>
                    <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                </Marker>
            </Map>
            </div>
        );
        }


}

export default LocationMapChart;