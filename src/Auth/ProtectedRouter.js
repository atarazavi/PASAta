import React from "react";
import { Route, Redirect } from "react-router-dom";
import pas_auth from "./PAS_Auth";

export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        console.log('entered in protectesRouter')
        if (pas_auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/session/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};