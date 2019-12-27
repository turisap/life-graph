import React from "react";
import { Route, useHistory } from "react-router-dom";
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
  const history = useHistory();

  if (isPrivate && !signedId) {
    return history.push("/");
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

export default RouteWrapper;
