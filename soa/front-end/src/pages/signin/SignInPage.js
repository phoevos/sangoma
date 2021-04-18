import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import './SignInPage.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const qs = require('querystring');


const BASE_URL = 'http://localhost:3000';


const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  height: 250px;  
  max-height: 100%;
  background-color: #e6fcfc;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -125px;
  margin-left: -240px;
}
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignInPage = (props) => {


  const [credentialsState, dispatchCredentials] = useState({ username: '', password: '' });

  const usernameChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, username: event.target.value });

  };

  const passwordChangeHandler = (event) => {
    dispatchCredentials({ ...credentialsState, password: event.target.value });

  };

  const history = useHistory();

  const goToStartingPage = () => {
    return history.push('/');
  };
  const goToSignUp = () => {
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
        console.log(signInAccessToken)
        goToStartingPage();
      })
      .catch(error => console.log(error.response.data));


  }


  return (

    <div >
    <header className="header"> 

    <Link to={'/'}  className="logo"> AskMeAnything </Link>
    </header >
      <FormContainer className="style_font">
        {/* <Heading>Welcome!</Heading> */}
        <p className="style_font">Fill in your username and password to sign in.</p>

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
