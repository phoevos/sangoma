import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionList from './questionlist/QuestionList';
import './MainPage.css';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import Pagination from '../../components/pagination/Pagination'
const BASE_URL = 'http://localhost:3000';

const MainPage = () => {

    const [questions, dispatchQuestions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(6);
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
    useEffect(() => {
        fetchdata();

    }, []);



    // Get current posts
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const paginateHandler = pageNumber => setCurrentPage(pageNumber);

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
            <nav>
                <div className='main-questions'>
                    {isFetched && <QuestionList gotoPageHandler={gotoPageHandler} deleteQuestionHandler={deleteQuestionHandler} items={currentQuestions} />}
                    {!isFetched && <Loader></Loader>}
                    <Pagination
                        postsPerPage={questionsPerPage}
                        totalPosts={questions.length}
                        paginate={paginateHandler}
                    />
                </div>
            </nav>


        </div>
    );
};


export default MainPage;

