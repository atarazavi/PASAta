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
        console.info('refrence is ',this.ref)
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
                onElementsClick={ (param)=>{
                    let label = param[0]._model.label;
                    let itemLabel = this.props.title.indexOf(label);
                    // console.info('labels ',this.props.ids[itemLabel]);
                    if(itemLabel !== -1){
                        console.info('props',this.props.ids[itemLabel]);
                        this.props.customFilterChange(this.props.ids[itemLabel]);
                    } 
                    }
                 }

            />
			
		);
	}
}


export default (PieChart);
