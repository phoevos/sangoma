
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import './NewQuestions2.css';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';


const qs = require('querystring');
const BASE_URL = 'http://localhost:3000';

// const FormWrapper = styled.div`
//   max-width: 480px;
//   width: 100%;
//   display: flex;
//   position: absolute;
//   left: 50%;
//   top: 50%;
//   margin-top: -200px;
//   margin-left: -240px;
// `;
const FormWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const NewQuestion = () => {


    const [errorMessage, setErrorMessage] = useState('');
    const [titleState, dispatchTitle] = useState('');
    const [textState, dispatchText] = useState('');

    const titleChangeHandler = (event) => {
        dispatchTitle(event.target.value);

    };

    const textChangeHandler = (event) => {
        dispatchText(event.target.value);

    };
    const history = useHistory();

    const goToStartingPage = () => {
        return history.push('/');
    };

    function handleSubmitQuestion() {

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }

        const requestBody = {
            title: titleState,
            text: textState,
            username: localStorage.getItem('username'),
            dateTime: new Date()
        };

        axios.post(`${BASE_URL}/questions`, qs.stringify(requestBody), config)
            .then(response => {
                console.log(response.data)
                goToStartingPage();
            })
            .catch(error => { console.log(error.response.data); setErrorMessage(error.response.data.message); });
    }

    return (
        <div>
            <header className="header">

                <Link to={'/'} className="logo"> AskMeAnything </Link>
                <nav className="nav">
                    <ul>
                        <li className='active'>
                            {localStorage.getItem('username')}
                        </li >
                    </ul>
                </nav>

            </header >
            <FormWrapper>
                <FormContainer>
                    <h1>Ask a new question</h1>
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <FormControl fullWidth>
                        <TextField
                            label="Question Title"
                            placeholder="Question Title"
                            margin="normal"
                            variant="outlined"
                            onChange={titleChangeHandler}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label="Question Text"
                            placeholder="Question Text"
                            multiline
                            rows="8"
                            margin="normal"
                            variant="outlined"
                            onChange={textChangeHandler}
                        />
                    </FormControl>

                    <nav className="nav">
                        <ul className="ul">
                            <Button
                                style={{ marginTop: '10px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmitQuestion}
                            >
                                SUBMIT QUESTION
                        </Button>
                            <div class="divider" />
                            <Button
                                style={{ marginTop: '10px' }}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={goToStartingPage}
                            >
                                CANCEL
                        </Button>

                        </ul>
                    </nav>
                </FormContainer>
            </FormWrapper>

        </div>

    );
}


export default NewQuestion;


