import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRouteUsers = ({ children, ...rest }) => {
  const { isItUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isItUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRouteUsers;
