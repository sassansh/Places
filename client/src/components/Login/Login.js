import './Login.css';

import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../redux/actions/userActions';
import logo from '../../assets/logo.png';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  // Login page inspired by: https://codepen.io/colorlib/pen/rxddKy
  function handleLogin() {
    dispatch(loginUser({ email, password }));
  }

  return isAuthenticated ? (
    <Redirect to={{ pathname: '/' }} />
  ) : (
    <div className='login-page'>
      <img alt='logo' src={logo} width='100px' />
      <h2>Places</h2>
      <div className='login-container'>
        <form className='login-form'>
          <input
            type='text'
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
          <button type='button' onClick={handleLogin}>
            login
          </button>
          <p className='message'>
            Not registered? <Link to='/register'>Create an account</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
