
import React, { useState } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import axios from 'axios';
import ErrorMessage from '../../../components/hoc/error/ErrorMessage';
import {Nav} from 'react-bootstrap';
import './NewAnswer.css';
import { Modal } from '../../../components/hoc/modal/Modal';
import config from '../../../config/config.js'

const qa_url = config.Services.QAService;
const ms = config.MS;

const NewAnswer = (props) => {

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [textState, dispatchText] = useState('');

    const textChangeHandler = (event) => {
        dispatchText(event.target.value);

    };
    const openModal = () => {
        setShowModal(prev => !prev);
    };
    const submitAnswerHandler = () => {

        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json'
            }
        }

        const requestBody = {
            questionId: props.location.pathname.split("/")[2],
            text: textState,
            username: localStorage.getItem('loggedUsername'),
            dateTime: new Date().toUTCString()
        };

        axios.post(ms.SINGLE_POST + `${qa_url}/answers`, requestBody, config)
            .then(response => {
                console.log(response.data)
                window.location.reload()
            })
            .catch(error => {
                console.log(error.response.data) 
                if (error.response.data.statusCode === 401) {
                    openModal();
                } 
                else {
                    setErrorMessage(error.response.data.message); 
                } 
            });
    }
    let message = "You are trying to create an answer without authorization."

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

                            onClick={() =>{ submitAnswerHandler();
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
                <Modal showModal={showModal} setShowModal={setShowModal} message ={message} history={props.history}/>
        </div>

    );
}


export default NewAnswer;


