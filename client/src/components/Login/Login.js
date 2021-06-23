import "./Login.css";

import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../../redux/actions/userActions";

function Login() {
  const dispatch = useDispatch();
  const currentUserID = useSelector((state) => state.users.currentUserID);
  const users = useSelector((state) => state.users.allUsers);

  // Login page inspired by: https://codepen.io/colorlib/pen/rxddKy
  function handleLogin() {
    console.log("login");
    dispatch(loginUser("sassan_shokoohi@me.com", "1234"));
    if (currentUserID === null) {
      console.log("login failed");
    } else {
      console.log("login good");
    }
  }

  const currentUser = users.find((user) => user.user_id === currentUserID);

  return (
    <div className="login-page">
      Logged in user: {currentUserID ? currentUser.name : "null"}
      <div className="form">
        <form className="login-form">
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <button type="button" onClick={handleLogin}>
            login sassan
          </button>
          <p className="message">Not registered? Create an account</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
