import "./Login.css";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { loginUser } from "../../redux/actions/userActions";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const users = useSelector((state) => state.users.allUsers);

  useEffect(() => {
    if (loginAttempts > 0) {
      currentUserID === null ? alert("Login failed") : alert("Login succeeded");
    }
  }, [currentUserID, loginAttempts]);

  // Login page inspired by: https://codepen.io/colorlib/pen/rxddKy
  function handleLogin() {
    if (username === "" || password === "") {
      alert("Please fill out username and password");
      return;
    }
    dispatch(loginUser(username, password));
    setLoginAttempts(loginAttempts + 1);
  }

  const currentUser = users.find((user) => user.user_id === currentUserID);

  return (
    <div className="login-page">
      Logged in user: {currentUserID ? currentUser.name : "null"}
      <div className="login-container">
        <form className="login-form">
          <input
            type="text"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
            placeholder="username"
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
