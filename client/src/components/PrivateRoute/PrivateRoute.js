import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  // Private route inspired by: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
