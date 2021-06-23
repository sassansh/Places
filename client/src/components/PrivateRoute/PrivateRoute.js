import { Redirect, Route } from "react-router-dom";

import { useSelector } from "react-redux";

function PrivateRoute({ component: Component, ...rest }) {
  const currentUserID = useSelector((state) => state.users.currentUserID);
  // Add your own authentication on the below line.
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
