import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const currentUserID = useSelector((state) => state.users.currentUserID);

  // Private route inspired by: https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs

  const isLoggedIn = currentUserID !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    />
  );
}

export default PrivateRoute;
