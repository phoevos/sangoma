import React, { useEffect, useState, Fragment } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import './SingleQuestionPage.css'
import { Navbar } from 'react-bootstrap';

const BASE_URL = 'http://localhost:3000';

const SingleQuestionPage = () => {
    const location = useLocation();
    const [question, dispatchQuestion] = useState({});

    const fetchdata = () => {
        axios.get(`${BASE_URL}${location.pathname}`)
            .then(response => {
                dispatchQuestion(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }

    useEffect(() => {
        fetchdata();

    }, []);

    return (
        <div >
        <div >
            <Navbar bg="primary" variant="dark" size="lg" >
                <Navbar.Brand href="/">AskMeAnything</Navbar.Brand>
            </Navbar>
        </div>
        <div className ='single-container2'>
            <h1 className='single-question-title'> {question.title}</h1>

            <div className ='single-container'>
            <p> Text : {question.text}</p>
            <p> Username : {question.username}</p>
            <p> Date : {question.dateTime}</p>
        </div>
        </div>
        </div>
    );
}
export default SingleQuestionPage;

