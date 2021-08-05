import './Register.css';

import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import logo from '../../assets/logo.png';
import { registerUser } from '../../redux/actions/userActions';
import { useState } from 'react';

function Register (props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [profPicData, setprofPicData] = useState('');
  const [profPicButtonName, setprofPicButtonName] = useState(
    '👤 Add Profile Picture (Optional)'
  );
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  function handleRegister () {
    const newUser = new FormData();
    newUser.append('name', name);
    newUser.append('email', email);
    newUser.append('password', password);
    newUser.append('password2', password2);
    newUser.append('profpic', profPicData);
    dispatch(registerUser(newUser, props.history));
  }

  const profilePicHandler = (e) => {
    const imageSelected = e.target.files.length > 0;
    if (imageSelected) {
      let fileName = e.target.files[0].name;
      if (fileName.length > 20) {
        fileName =
          fileName.substring(0, 10) +
          '...' +
          fileName.substring(fileName.length - 10);
      }
      setprofPicButtonName('👤 ' + fileName);
      setprofPicData(e.target.files[0]);
    } else {
      setprofPicButtonName('👤 Add Profile Picture (Optional)');
      setprofPicData('');
    }
  };

  return isAuthenticated
    ? (
      <Redirect to={{ pathname: '/' }} />
      )
    : (
      <div className='register-page'>
        <img alt='logo' src={logo} width='100px' />
        <h2>Places</h2>
        <div className='register-container'>
          <form className='register-form'>
            <input
              type='text'
              value={name}
              onInput={(e) => setName(e.target.value)}
              placeholder='Name'
            />
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
            <input
              type='password'
              value={password2}
              onInput={(e) => setPassword2(e.target.value)}
              placeholder='Confirm Password'
            />
            <br />
            <input type='file' id='profilepic' onChange={profilePicHandler} />
            <label htmlFor='profilepic'>{profPicButtonName}</label>
            <br />
            <br />
            <br />
            <button type='button' onClick={handleRegister}>
              Register
            </button>
            <p className='message'>
              Registered already? <Link to='/login'>Login here</Link>
            </p>
          </form>
        </div>
      </div>
      );
}

export default Register;
