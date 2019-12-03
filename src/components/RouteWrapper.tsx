import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

type RouteWrapperProps = {
  component: typeof React.Component | React.FC;
  isPrivate?: boolean;
  path: string;
  exact?: boolean;
};

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const signedId = useSelector(state => state.general.signedin);
  if (isPrivate && !signedId) {
    return <Redirect path="/" />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default RouteWrapper;
