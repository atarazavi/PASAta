/**
* Report Page
*/
import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Alert } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { Helmet } from "react-helmet";
//components
import { OrderStatusWidget } from "Components/Widgets";
import ReportStats from './components/ReportStats';
import {DatePicker, DateTimePicker, DateRangePicker, DateTimeRangePicker} from "react-advance-jalaali-datepicker";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct collapsible card
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class Report extends Component {
	// Alert Dismiss
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			FirstCalendare:"",
			SecondtCalendare:""
		};
		this.onDismiss = this.onDismiss.bind(this);
	}
	onDismiss() {
		this.setState({ visible: false });
	}
	change= (e)=> {
		
		this.setState({
			FirstCalendare:e
		})
		
	}
	changeSecond= (e)=> {
		
		this.setState({
			SecondtCalendare:e
		})
	}
		
	render() {
		return (
			<div className="report-wrapper">
				<Helmet>
					<title>پاس</title>
					<meta name="description" content="Reactify Reports" />
				</Helmet>
				<PageTitleBar title={<IntlMessages id="sidebar.report" />} match={this.props.match} />

				<div className="report-status mb-30">
					<div className="row">
						<div className="col-md-12">
							<div className="top-filter clearfix p-20">
								<FormGroup className="w-20 mb-5">
									<Label for="startDate">Start Date</Label>
									<DatePicker
										inputComponent={this.DatePickerInput}
										placeholder="انتخاب تاریخ"
										format="jYYYY/jMM/jDD"
										onChange={this.change}
										id="datePicker"
										preSelected="1396/05/15"
										/>
								</FormGroup>
								<FormGroup className="w-20 mb-5">
									<Label for="endDate">End Date</Label>
									<DatePicker
										inputComponent={this.DatePickerInput}
										placeholder="انتخاب تاریخ"
										format="jYYYY/jMM/jDD"
										onChange={this.changeSecond}
										id="datePicker2"
										preSelected="1396/05/15"
										/>
								</FormGroup>
								<FormGroup className="w-20 mb-5">
									<Label for="Select-1"><IntlMessages id="Report.Owner"/></Label>
									<div className="app-selectbox-sm">
										<Input type="select" name="select" id="Select-2">
											<option>1</option>
											<option>2</option>
											<option>3</option>
											<option>4</option>
											<option>5</option>
										</Input>
									</div>
								</FormGroup>
								<FormGroup className="mb-5">
									<Label className="d-block">&nbsp;</Label>
									<Button color="primary" variant="raised" className="mr-10 text-white"><IntlMessages id="widgets.apply" /></Button>
								</FormGroup>
								<FormGroup className="mb-5">
									<Label className="d-block">&nbsp;</Label>
									<Button className="btn-success text-white">Download .pdf Report</Button>
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
				<RctCollapsibleCard
					heading="Order Status"
					fullBlock
				>
					<OrderStatusWidget />
				</RctCollapsibleCard>
			</div>
		);
	}
}
