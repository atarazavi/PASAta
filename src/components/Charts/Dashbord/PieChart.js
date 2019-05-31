import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';


class PieChart extends Component {

    options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        elements: {
            line: {
                tension: 0
            }
        }  
    };

	render() {

       
		return (

            <Line
                data={""}
                options={this.options}
                width={100}
                height={30}
            />
			
		);
	}
}


export default (PieChart);
