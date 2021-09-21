import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router";
import { selectIsAuthenticated } from "../../store/activeUser/selectors";

export default function GuestRoute({ children, ...props }) {
  const isGuest = !useSelector(selectIsAuthenticated);

  return (
    <Route {...props}>
      {isGuest ? children : <Redirect to="/" />}
    </Route>
  );
}