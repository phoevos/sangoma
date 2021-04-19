import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components';
import './SignInPage.css';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';

const qs = require('querystring');


const BASE_URL = 'http://localhost:3000';


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

const SignInPage = (props) => {

  const [errorMessage, setErrorMessage] = useState('');


  const [credentialsState, dispatchCredentials] = useState({ username: '', password: '' });

  const usernameChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, username: event.target.value });

  };

  const passwordChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, password: event.target.value });

  };


  const history = useHistory();

  const goToStartingPage = () => {
    dispatchCredentials({ username: '', password: ''});
    return history.push('/');
  };
  const goToSignUp = () => {
    dispatchCredentials({ username: '', password: ''});
    console.log(credentialsState);
    setErrorMessage('');
    console.log(errorMessage);
    return history.push('/signup');
  };


  function signInHandler() {

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

    axios.post(`${BASE_URL}/auth/signin`, qs.stringify(requestBody), config)
      .then(response => {
        let signInAccessToken = response.data.accessToken;
        localStorage.setItem('accessToken', signInAccessToken);
        localStorage.setItem('username', requestBody.username);
        goToStartingPage();
      })
      .catch(error => { console.log(error.response.data); setErrorMessage(error.response.data.message); });
  }




  return (

    <div >
      <header className="header">

        <Link to={'/'} className="logo"> AskMeAnything </Link>
      </header >

      <FormContainer className="style_font">
        <p className="style_font">Fill in your username and password to sign in.</p>
        {errorMessage && <ErrorMessage message={errorMessage} />}

        <div>
          <FormField
            id="outlined-name"
            label="Username"
            margin="dense"
            variant="outlined"
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

        <hr />
        <div>
          <Button
            style={{ marginBottom: '10px' }}
            fullWidth
            variant="contained"
            color="primary"

            onClick={signInHandler}
          >
            SIGN IN
            </Button>

          {/* <Link className='btn' to={'/signup'}>
            Don't have an account? Sign up now!
            </Link> */}
          <Button fullWidth onClick={goToSignUp}>
            Don't have an account? Sign up now!
          </Button>
        </div>
      </FormContainer>

    </div>

  );
}

export default SignInPage;
