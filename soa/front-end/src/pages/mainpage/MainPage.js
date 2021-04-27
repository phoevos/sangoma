import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionList from './questionlist/QuestionList';
import './MainPage.css';
import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const MainPage = () => {

    const [questions, dispatchQuestions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const history = useHistory();


    const fetchdata = () => {
        axios.get(`${BASE_URL}/questions`)
            .then(response => {
                dispatchQuestions(response.data);
                setIsFetched(true);
            })
            .catch(error => {
            });
    }

    useEffect(() => {
        fetchdata();

    }, []);

    const gotoPageHandler = (id, isquestion) => {

        // if you click on question title go to single question page
        if (isquestion === true) {
            return history.push(`/questions/${id}`);
        }
        // if you click on username go to single user page
        else {
            return history.push(`/users/${id}`);
        }
    }

    const deleteQuestionHandler = (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }
        axios.delete(`${BASE_URL}/questions/${id}`, config)
            .then(response => {
                console.log(response.data);
                dispatchQuestions(questions.filter(q => q.id !== id))
                // window.location.reload();
            })
            .catch(error => {
                if (error.response.data.statusCode === 401) {
                    // That's a temporary work-around, redirecting to signin should be done more gracefully.
                    history.push('/signin');
                } else {
                    console.log(error.response.data);
                    // setErrorMessage(error.response.data.message); 
                }
            });
    }

    return (
        <div>
            <h2 className='main-title-margin'>Recent Questions and Answers </h2>
            {isFetched && <nav>
                <div className='main-questions'>
                    <QuestionList gotoPageHandler={gotoPageHandler} deleteQuestionHandler={deleteQuestionHandler} items={questions} />
                </div>
            </nav>}
        </div>
    );
};


export default MainPage;

