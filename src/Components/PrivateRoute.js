import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  //...rest innebär att vi kan slänga in oändligt med random props från app utan att behöva specificera dem
  //component är vår prop som vi skickat med från app. vi döper om den till Component
  const { currentUser } = useAuth();
  //...rest = all the rest of the properties
  //the PrivateRoute is just a wrapper around the current route
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
