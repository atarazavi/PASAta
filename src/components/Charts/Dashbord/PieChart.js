import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

class PieChart extends Component {



    // options = {
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero: true,
    //             }
    //         }]
    //     },
    //     elements: {
    //         line: {
    //             tension: 0
    //         }
    //     }  
    // };



	render() {
        let data = {
            labels: [
            ],
            datasets: [{
                data: [],
                backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
                ],
                

            }],
                
            
        };
        data.datasets[0].data = this.props.data;
        data.labels = this.props.title;

		return (

            <Pie
                data={data}
            />
			
		);
	}
}


export default (PieChart);
