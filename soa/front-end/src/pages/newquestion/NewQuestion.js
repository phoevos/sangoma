
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { TextField, FormControl, Button } from '@material-ui/core';
import axios from 'axios';
import ErrorMessage from '../../components/hoc/error/ErrorMessage';
import {Nav} from 'react-bootstrap';
import './NewQuestion.css';
import TagsInput from '../../components/tags/TagsInput';
import { Modal } from '../../components/hoc/modal/Modal';
import config from '../../config/config.json';

const qa_url = config.Services.QAService;
const NewQuestion = () => {

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [titleState, dispatchTitle] = useState('');
    const [textState, dispatchText] = useState('');
    const [tags, setTags] = useState([]);

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value])
            event.target.value = ""
        }
    }


    const openModal = () => {
        setShowModal(prev => !prev);
      };
      
    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
    }

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
                'Content-Type': 'application/json'
            }
        }
        console.log(new Date().toUTCString())
        const requestBody = {
            title: titleState,
            text: textState,
            keywords: tags.map(keyword => ({keyword: keyword})),
            username: localStorage.getItem('loggedUsername'),
            dateTime: new Date().toUTCString()
        };
        console.log(requestBody)
        axios.post(`${qa_url}/questions`, requestBody, config)
            .then(response => {
                console.log(response.data)
                goToStartingPage();
            })
            .catch(error => {
                if (error.response.data.statusCode === 401) {
                    // That's a temporary work-around, redirecting to signin should be done more gracefully.
                    // history.push('/signin');
                    openModal();
                } else {
                    console.log(error.response.data); 
                    setErrorMessage(error.response.data.message); 
                } 
            });
    }

    let message = "You are trying to submit a question without authentication."

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
                    
                    <TagsInput addTags={addTags} removeTags={removeTags} tags={tags}/>

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
                <Modal showModal={showModal} setShowModal={setShowModal} history={history} message ={message}/>

        </div>

    );
}


export default NewQuestion;


