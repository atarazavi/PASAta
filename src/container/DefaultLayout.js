/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ProtectedRouter } from '../Auth/ProtectedRouter'

// app default layout
import RctAppLayout from 'Components/RctAppLayout';

// router service
import routerService from "../services/_routerService";

class DefaultLayout extends Component {
	render() {
		const { match } = this.props;
		return (
			<RctAppLayout>
				{routerService && routerService.map((route,key)=>
					<ProtectedRouter key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctAppLayout>
		);
	}
}

export default withRouter(connect(null)(DefaultLayout));
