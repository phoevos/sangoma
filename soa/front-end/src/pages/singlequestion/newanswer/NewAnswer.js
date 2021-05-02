
import React, { useState } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import axios from 'axios';
import ErrorMessage from '../../../components/ErrorMessage';
import {Nav} from 'react-bootstrap';
import './NewAnswer.css';
const qs = require('querystring');
const BASE_URL = 'http://localhost:3000';

const NewAnswer = (props) => {


    const [errorMessage, setErrorMessage] = useState('');
    const [textState, dispatchText] = useState('');

    const textChangeHandler = (event) => {
        dispatchText(event.target.value);

    };

    const submitQuestionHandler = () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }

        const requestBody = {
            questionId: props.location.pathname.split("/")[2],
            text: textState,
            username: localStorage.getItem('loggedUsername'),
            dateTime: new Date().toUTCString()
        };

        axios.post(`${BASE_URL}/answers`, qs.stringify(requestBody), config)
            .then(response => {
                console.log(response.data)
                window.location.reload(false);
            })
            .catch(error => {
                if (error.response.data.statusCode === 401) {
                    // That's a temporary work-around, redirecting to signin should be done more gracefully.
                    props.history.push('/signin');
                } 
                else {
                    console.log(error.response.data); 
                    setErrorMessage(error.response.data.message); 
                } 
            });
    }

    return (
        <div>
                <div className='newanswer__container'>
                    {errorMessage && <ErrorMessage message={errorMessage} />}
                    <FormControl fullWidth>
                        <TextField
                            label="Answer"
                            placeholder="Answer"
                            multiline
                            margin="normal"
                            variant="outlined"
                            onChange={textChangeHandler}
                        />
                    </FormControl>

                    <Nav>
                        <Button
                            style={{ marginTop: '10px' }}
                            variant="contained"
                            color="primary"
                            size = "small"

                            onClick={() =>{ submitQuestionHandler();
                            }}
                        >
                            Submit answer
                        </Button>
                        <div className='divider'></div>
                        <Button
                            style={{ marginTop: '10px'}}
                            variant="contained"
                            color="primary"
                            onClick={props.addAnswerHandler}
                            size = "small"

                        >
                            CANCEL
                        </Button>

                    </Nav>
                </div>

        </div>

    );
}


export default NewAnswer;


