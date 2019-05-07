/**
 * React-Chartjs2
 */
import React, { Component } from 'react';

import Doughnut from './doughnut';
import LineChart from './line-chart';
import Bubble from './bubble';
import Bar from './bar';
import Polar from './polar';
import Pie from './pie';
import Radar from './radar';
import HorizontalBar from './horizontal-bar';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

class ReactCharts extends Component {
	render() {
		return (
			<div className="chartjs-wrapper">
				<PageTitleBar
					title={<IntlMessages id="sidebar.reactChartjs2" />}
					match={this.props.match}
				/>
				<div className="row">
					<div className="col-sm-12 col-md-3 col-xl-3">
						<RctCollapsibleCard heading="Doughnut">
							<Doughnut />
						</RctCollapsibleCard>
						<RctCollapsibleCard heading="Pie Chart">
							<Pie />
						</RctCollapsibleCard>
					</div>
					<div className="col-sm-12 col-md-3 col-xl-3">
						<RctCollapsibleCard heading="Pie Chart">
							<Pie />
						</RctCollapsibleCard>
						<RctCollapsibleCard heading="Doughnut">
							<Doughnut />
						</RctCollapsibleCard>
					</div>
					<div className="col-sm-12 col-md-3 col-xl-3">
						<RctCollapsibleCard heading="Doughnut">
							<Doughnut />
						</RctCollapsibleCard>
						<RctCollapsibleCard heading="Pie Chart">
							<Pie />
						</RctCollapsibleCard>
					</div>
					<div className="col-sm-12 col-md-3 col-xl-3">
						<RctCollapsibleCard heading="Pie Chart">
							<Pie />
						</RctCollapsibleCard>
						<RctCollapsibleCard heading="Doughnut">
							<Doughnut />
						</RctCollapsibleCard>
					</div>
				</div>
			</div>
		);
	}
}

export default ReactCharts;
