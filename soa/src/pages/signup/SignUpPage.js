import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';

const qs = require('querystring');
const BASE_URL = 'http://localhost:3000';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: white;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -200px;
  margin-left: -240px;
}
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignUpPage = () => {

  const [errorMessage, setErrorMessage] = useState('');

  const [credentialsState, dispatchCredentials] = useState({ username: '', password: '', reEnterPassword: '' });

  const usernameChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, username: event.target.value });

  };

  const passwordChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, password: event.target.value });

  };

  const reEnterPasswordChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, reEnterPassword: event.target.value });

  };
  const history = useHistory();

  const goToStartingPage = () => {
    dispatchCredentials({ username: '', password: '', reEnterPassword: '' });
    return history.push('/');
  };
  const goToSignIn = () => {
    dispatchCredentials({ username: '', password: '', reEnterPassword: '' });
    console.log(credentialsState);
    setErrorMessage('');
    console.log(errorMessage);
    return history.push('/signin');
  };


  function signUpHandler() {

    if (credentialsState.password !== credentialsState.reEnterPassword) {
      setErrorMessage('The passwords must match. Please enter the correct password twice.')
    }
    else {
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
      //Create Request Body
      const requestBody = {
        username: credentialsState.username,
        password: credentialsState.password
      };
      //Send post request

      axios.post(`${BASE_URL}/auth/signup`, qs.stringify(requestBody), config)
        .then(response => {
          let signUpAccessToken = response.data.accessToken;
          localStorage.setItem('accessToken', signUpAccessToken);
          localStorage.setItem('username', requestBody.username);
          goToStartingPage();
        })
        .catch(error => { console.log(error.response.data); setErrorMessage(error.response.data.message); });

    }
  }

  return (
    <div fullscreen-wrapper>
      <header className="header">
        <Link to={'/'} className="logo"> AskMeAnything </Link>
      </header >
      <FormContainer className="style_font">
        <Heading>Welcome!</Heading>
        <p className="style_font">Please enter your credentials.</p>
        {errorMessage && <ErrorMessage message={errorMessage} />}
        <div>
          <FormField
            id="outlined-name"
            label="Username"
            margin="dense"
            variant="outlined"
            type="username"
            value={credentialsState.username}
            onChange={usernameChangeHandler}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Password"
            margin="dense"
            variant="outlined"
            type="password"
            value={credentialsState.password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div>
          <FormField
            id="outlined-name"
            label="Re-enter password"
            margin="dense"
            variant="outlined"
            type="password"
            value={credentialsState.reEnterPassword}
            onChange={reEnterPasswordChangeHandler}
          />
        </div>
        <hr />
        <div>
          <Button
            style={{ marginBottom: '10px' }}
            fullWidth
            variant="contained"
            color="primary"
            onClick={signUpHandler}>
            SIGN UP
            </Button>
          {/* <Link className='btn' to={'/signin'}>
            Already have an account? Sign in now!
            </Link> */}
          <Button fullWidth onClick={goToSignIn}>
            Already have an account? Sign in now!
          </Button>
        </div>
      </FormContainer>
    </div>


  );
}


export default SignUpPage;
