import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Redirect } from "react-router";
import { loginUser } from "../../redux/actions/userActions";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.users.currentUserID);

  const isLoggedIn = currentUserID !== null;

  useEffect(() => {
    if (loginAttempts > 0) {
      currentUserID === null ? alert("Login failed") : console.log("logged in");
    }
  }, [currentUserID, loginAttempts]);

  // Login page inspired by: https://codepen.io/colorlib/pen/rxddKy
  function handleLogin() {
    if (email === "" || password === "") {
      alert("Please fill out email and password");
      return;
    }
    dispatch(loginUser(email, password));
    setLoginAttempts(loginAttempts + 1);
  }

  return isLoggedIn ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <div className="login-page">
      <div className="login-container">
        <form className="login-form">
          <input
            type="text"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="button" onClick={handleLogin}>
            login
          </button>
          <p className="message">Not registered? Create an account</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
