import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import axios from 'axios';

const qs = require('querystring');
const BASE_URL = 'http://localhost:3000';
//import ErrorMessage from '../../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  height: 300px;  
  max-height: 100%;
  background-color: #e6fcfc;
  padding: 30px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -150px;
  margin-left: -240px;
}
`;

const FormField = styled(TextField)`
  width: 100%;
`;

const SignUpPage = (props) => {


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
  const goToSignIn = () => {
    return history.push('/signin');
  };


  function signUpHandler() {

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
        console.log(signUpAccessToken)
        localStorage.setItem('accessToken', signUpAccessToken);
        goToStartingPage();
      })
      .catch(error => console.log(error.response.data));


  }

  return (

    <div >
      <header className="header">
        <Link to={'/'} className="logo"> AskMeAnything </Link>
      </header >
      <FormContainer className="style_font">
        <Heading>Welcome!</Heading>
        <p className="style_font">Please enter your credentials.</p>

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
            style={{ marginBottom: '30px' }}
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
