
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';
import ErrorMessage from '../../components/ErrorMessage';
import { Navbar, Nav, Form } from 'react-bootstrap';
import './NewQuestion.css';
const qs = require('querystring');
const BASE_URL = 'http://localhost:3000';

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

    const submitQuestionHandler = () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }

        const requestBody = {
            title: titleState,
            text: textState,
            username: localStorage.getItem('loggedUsername'),
            dateTime: new Date().toUTCString()
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
                <div className='newquestions__container'>
                    <h1 className='newquestions__font'>Ask a new question</h1>
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

                    <Nav>
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={submitQuestionHandler}
                        >
                            SUBMIT QUESTION
                        </Button>
                        <div className="divider" />
                        <Button
                            style={{ marginTop: '10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={goToStartingPage}
                        >
                            CANCEL
                        </Button>

                    </Nav>
                </div>

        </div>

    );
}


export default NewQuestion;


