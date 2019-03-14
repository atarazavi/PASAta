/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

// rct theme provider
import RctThemeProvider from './RctThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Agency Layout
import AgencyLayout from './AgencyLayout';

//Main App
import RctDefaultLayout from './DefaultLayout';

// boxed layout
import RctBoxedLayout from './RctBoxedLayout';

// app signin
import AppSignIn from './SigninFirebase';
import AppSignUp from './SignupFirebase';

// async components
import {
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionLockScreenComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncSessionPage404Component,
	AsyncSessionPage500Component,
	AsyncTermsConditionComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
import Auth from '../Auth/Auth';

// callback component
import Callback from "Components/Callback/Callback";

//Auth0 Handle Authentication
const auth = new Auth();

//PAS_Authentication
import PAS_Authentication from '../Auth/PAS_Auth'


const handleAuthentication = ({ location }) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
}

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest, authUser }) =>
	<Route
		{...rest}
		render={props =>
			{			
				authUser
				? <Component {...props} />
				: <Redirect
					to={{
						pathname: '/signin',
						state: { from: props.location }
					}}
				/>}
			}
	/>;

class App extends Component {

	render() {
		const { location, match, user } = this.props;
		const isPermitted = localStorage.getItem('isAuthenticated')
		const ispermitted2 = PAS_Authentication.authenticated
		console.log('isPermitted', isPermitted);
		console.log('auth from localstorage', localStorage.getItem('given_token'));
		console.log('auth from PAS', ispermitted2);
		

		if (location.pathname !== '/session/login') {
			console.log('location.pathname', location.pathname);
			
			if (isPermitted == undefined || isPermitted == null || isPermitted == '') {
				return (<Redirect to={'/session/login'} />);
			} else {
				console.log('Welcome');
			}
		}		

		if (location.pathname === '/') {
			// here, the token should be checked with server
			// unless we are in login page
			// be careful about getting in infinit loop
			if (!localStorage.getItem('given_token')) {
				return (<Redirect to={'/session/login'} />);
			} else {
				return (<Redirect to={'/horizontal/tables/data-table'} />);
			}
		}
		return (
			<RctThemeProvider>
				<NotificationContainer />
				<InitialPath
					path={`${match.url}app`}
					authUser={user}
					component={RctDefaultLayout}
				/>
				<Route path="/horizontal" component={HorizontalLayout} />
				<Route path="/agency" component={AgencyLayout} />
				<Route path="/boxed" component={RctBoxedLayout} />
				<Route path="/signin" component={AppSignIn} />
				<Route path="/signup" component={AppSignUp} />
				<Route path="/session/login" component={AsyncSessionLoginComponent} />
				<Route path="/session/register" component={AsyncSessionRegisterComponent} />
				<Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
				<Route
					path="/session/forgot-password"
					component={AsyncSessionForgotPasswordComponent}
				/>
				<Route path="/session/404" component={AsyncSessionPage404Component} />
				<Route path="/session/500" component={AsyncSessionPage500Component} />
				<Route path="/terms-condition" component={AsyncTermsConditionComponent} />
				<Route path="/callback" render={(props) => {
					handleAuthentication(props);
					return <Callback {...props} />
				}} />
			</RctThemeProvider>
		);
	}
}

// map state to props
const mapStateToProps = ({ authUser }) => {
	const { user } = authUser;
	return { user };
};

export default connect(mapStateToProps)(App);
