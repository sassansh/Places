import './Register.css';

import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import { registerUser } from '../../redux/actions/userActions';
import { useState } from 'react';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [avatarURL, setAvatarURL] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  function handleRegister() {
    dispatch(
      registerUser(
        { name, email, password, password2, avatarURL },
        props.history
      )
    );
  }

  return isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <div className="register-page">
      <img alt="logo" src={logo} width="100px" />
      <h2>Places</h2>
      <div className="register-container">
        <form className="register-form">
          <input
            type="text"
            value={name}
            onInput={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="text"
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <input
            type="password"
            value={password2}
            onInput={(e) => setPassword2(e.target.value)}
            placeholder="Confirm Password"
          />
          <input
            type="url"
            value={avatarURL}
            onInput={(e) => setAvatarURL(e.target.value)}
            placeholder="Avatar URL"
          />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
          <p className="message">
            Registered already? <Link to="/login">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
