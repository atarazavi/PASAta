/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route,Link } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import AppConfig from 'Constants/AppConfig';
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
import { privateEncrypt, privateDecrypt } from 'crypto';
const isPermitted = localStorage.getItem('isAuthenticated')
const ispermitted2 = PAS_Authentication.authenticated
 function PrivateRoute({...rest }) {
	return (
	  <Route
		{...rest}
		render={props =>
		  isPermitted ? null : (
			<Redirect
			  to={{
				pathname: "/session/login",
				state: { from: props.location }
			  }}
			/>
		  )
		}
	  />
	);
  }
 
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
	componentDidMount(){
	
	}

	render() {
		const { location, match, user } = this.props;
		// const isPermitted = localStorage.getItem('isAuthenticated')
		// const ispermitted2 = PAS_Authentication.authenticated
		const giventoken = localStorage.getItem('given_token')
		console.log('auth from localstorage', isPermitted);
		const isPermitted = localStorage.getItem('isAuthenticated')
		const ispermitted2 = PAS_Authentication.authenticated
		console.log('isPermitted', isPermitted);
		console.log('auth from localstorage', localStorage.getItem('given_token'));

		console.log('auth from PAS', ispermitted2);
		console.log(location.pathname);
		
		if (location.pathname !== '/session/login'){
			(async () => {
				const rawResponse = await fetch(AppConfig.baseURL + '/permission/user/findbyid', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': giventoken
					},
					body: JSON.stringify({
						"id":20
					})
				});
				console.log('rawResponse.status', rawResponse.status);
				if (rawResponse.status == 200){
					
				} else {
					console.log("falseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
					this.props.history.push({
						pathname: '/session/login',
						state: {from: window.location.href}
					})
				}
			})();
		}
		return (
			<RctThemeProvider>
				<NotificationContainer />
				<InitialPath
					path={`${match.url}app`}
					authUser={user}
					component={RctDefaultLayout}
				/>
				<PrivateRoute path="/session/login"/>
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
				{/* <Route component={AsyncSessionPage404Component} /> */}
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
