/**
 * React-Chartjs2
 */
import React, { Component } from 'react';

import {
	RevenueWidget,
} from "Components/Widgets";

import {
	totalRevenue,
} from '../widgets/data';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class ReactCharts extends Component {
	render() {
		return (
            <div>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Doughnut">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Pie Chart">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Doughnut">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Pie Chart">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Doughnut">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                    <div className="col-sm-12 col-md-3 col-xl-3">
                        <RctCollapsibleCard heading="Pie Chart">
                            <RevenueWidget data={totalRevenue}/>
                        </RctCollapsibleCard>
                    </div>
                </div>
            </div>
        );
	}
}

export default ReactCharts;
