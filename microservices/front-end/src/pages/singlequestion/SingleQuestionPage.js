import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './SingleQuestionPage.css'
import 'font-awesome/css/font-awesome.min.css';
import Question from './question/Question';
import Loader from '../../components/hoc/loader/Loader';
import NewAnswer from './newanswer/NewAnswer'
import AnswerList from './answerlist/AnswerList'
import Pagination from '../../components/pagination/Pagination'
import config from '../../config/config.json'

const qa_url = config.Services.QAService;
const ms= config.MS;

const SingleQuestionPage = () => {

    const [question, dispatchQuestion] = useState({ answers: [] });
    const [isFetched, setIsFetched] = useState(false);
    const [addAnswer, setAddAnswer] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(3);
    const location = useLocation();
    const history = useHistory();

    const goToStartingPage = () => {
        return history.push('/');
    };

    const fetchdata = (tag) => {
        let path = location.pathname
        const params = {}
        axios.get(ms.SINGLE_POST + `${qa_url}${path}`, params)
            .then(response => {
                dispatchQuestion(response.data);
                setIsFetched(true);
            })
            .catch(error => {
                console.log(error.response.data);
            });
    } 

    const gotoPageHandler = (id) => {
        return history.push(`/users/${id}`);
    }
    useEffect(() => {
        fetchdata();
    }, []);

    const addAnswerHandler = () => {
        setAddAnswer(!addAnswer)
    }

    //Get current posts
    const indexOfLastAnswer = currentPage * questionsPerPage;
    const indexOfFirstAnswer = indexOfLastAnswer - questionsPerPage;
    const currentAnswers = question.answers.slice(indexOfFirstAnswer, indexOfLastAnswer);
    const paginateHandler = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            {isFetched &&
                <div>
                    <div className='single-container2'>
                        <Question question={question} addAnswerHandler={addAnswerHandler}>
                        </Question>
                        {addAnswer && <NewAnswer location={location} history={history} goToStartingPage={goToStartingPage} addAnswerHandler={addAnswerHandler}>
                        </NewAnswer>}
                        <AnswerList gotoPageHandler={gotoPageHandler} items={currentAnswers} />
                        <Pagination
                            postsPerPage={questionsPerPage}
                            totalPosts={question.answers.length}
                            paginate={paginateHandler}
                        />
                    </div>
                </div>}
            {!isFetched && <Loader></Loader>}
        </div>
    );
}
export default SingleQuestionPage;

