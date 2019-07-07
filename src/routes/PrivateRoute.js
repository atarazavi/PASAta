import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('given_token')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/session/login', state: { from: props.location } }} />
    )} />
)