import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionList from './questionlist/QuestionList';
import './MainPage.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const MainPage = () => {

    const [questions, dispatchQuestions] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    const fetchdata = () => {
        axios.get(`${BASE_URL}/questions`)
            .then(response => {
                console.log(response.data);
                dispatchQuestions(response.data);
            })
            .catch(error => {
            });
    }

    useEffect(() => {
        const MainPageAccessToken = localStorage.getItem('accessToken');
        fetchdata();

    }, []);

    const gotoPageHandler = (id,isquestion) => {

        // if you click on question title go to single question page
        if (isquestion === true){
            return history.push(`/questions/${id}`);
        }
        // if you click on username go to single user page
        else{
            return history.push(`/users/${id}`);
        }
    }

    const LogHandler = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('loggedUsername');
        }
        else return history.push('/signin');
    
    }
    return (
            <div>
            <h2 className='main-title-margin'>Recent Questions and Answers </h2>
            <nav>
                <div className='main-questions'>
                    <QuestionList gotoPageHandler={gotoPageHandler} items={questions} />
                </div>
            </nav>
            </div>
    );
};


export default MainPage;

