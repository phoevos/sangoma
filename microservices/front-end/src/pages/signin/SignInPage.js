import React, { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import axios from 'axios';
import ErrorMessage from '../../components/hoc/error/ErrorMessage';
import { Navbar } from 'react-bootstrap';
import './SignInPage.css';
import config from '../../config/config.json'

const auth_url = config.Services.AuthenticatorService;
const ms = config.MS;

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
		dispatchCredentials({ username: '', password: '' });
		return history.push('/');
	};
	const goToSignUp = () => {
		dispatchCredentials({ username: '', password: '' });
		console.log(credentialsState);
		setErrorMessage('');
		console.log(errorMessage);
		return history.push('/signup');
	};

	const signInHandler = () => {

		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		}
		//Create Request Body
		const requestBody = {
			username: credentialsState.username,
			password: credentialsState.password
		};
		//Send post request

		axios.post(ms.AUTH + `${auth_url}/signin`, requestBody, config)
			.then(response => {
				let signInAccessToken = response.data.accessToken;
				localStorage.setItem('accessToken', signInAccessToken);
				localStorage.setItem('loggedUsername', requestBody.username);
				goToStartingPage();
			})
			.catch(error => { console.log(error.response.data); setErrorMessage(error.response.data.message); });
	}

	return (

		<div >
			<div className='fixed-top'>
				<Navbar bg="dark" variant="dark" size="lg" >
					<Navbar.Brand href="/">AskMeAnything</Navbar.Brand>
				</Navbar>
			</div>

			<div className='signInContainer'>
				<p className="style_font">Fill in your username and password to sign in.</p>
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
			</div>

		</div>

	);
}

export default SignInPage;
