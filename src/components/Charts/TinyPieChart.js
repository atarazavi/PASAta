/**
 * Tiny Pie Chart
 */
import React from 'react';
import { Pie } from 'react-chartjs-2';

// chart congig
import ChartConfig from 'Constants/chart-config';

const options = {
    legend: {
        display: false,
        labels: {
            fontColor: ChartConfig.legendFontColor
        }
    }
};

const TinyPieChart = ({ labels, datasets, width, height }) => {
    const data = {
        labels,
        datasets
    };
    return (
        <Pie height={height} width={width} data={data} options={options} onElementsClick={(elemen) => console.log('salaaaaaaaaaam', elemen[0]._index)} />
    );
}

export default TinyPieChart;
