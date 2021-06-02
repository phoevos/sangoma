import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useHistory } from 'react-router'
import Loader from '../../components/hoc/loader/Loader'
import Pagination from '../../components/pagination/Pagination'
import QuestionList from '../mainpage/questionlist/QuestionList'
import AnswerList from '../singlequestion/answerlist/AnswerList'
import './Dashboard.css'
import '../mainpage/MainPage.css'
import QuestionsPerKeyword from '../../components/chart/keywords/QuestionsPerKeyword'
import QuestionsPerKeywordTable from '../../components/chart/keywords/QuestionsPerKeywordTable'
const BASE_URL = 'http://localhost:3000';

const Dashboard = () => {
    const [questions, dispatchQuestions] = useState([]);
    const [answers, dispatchAnswers] = useState([]);
    const [keywords, dispatchKeywords] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [answerIsFetched, setAnswerIsFetched] = useState(false);
    const [keywordsFetched, setKeywordsFetched] = useState(false);
    const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
    const [currentAnswerPage, setCurrentAnswerPage] = useState(1);
    const [questionsPerPage] = useState(6);
    const [answersPerPage] = useState(6);
    const history = useHistory();

    const fetchQuestions = (tag) => {
        let params = {
            params: {
                username: localStorage.getItem('loggedUsername')
            }
        }
        if (tag) params.params.matchingKeywords = [tag]
        
        axios.get(`${BASE_URL}/questions`, params)
            .then(response => {
                dispatchQuestions(response.data);
                setIsFetched(true);
            })
            .catch(error => {
            });
    }

    const fetchAnswers = () => {
        const params = {
            params: {
                username: localStorage.getItem('loggedUsername')
            }
        }
        axios.get(`${BASE_URL}/answers`, params)
            .then(response => {
                dispatchAnswers(response.data);
                setAnswerIsFetched(true);
            })
            .catch(error => {
            });
    }

    const fetchKeywords = () => {
        const params = {
            params: {
                username: localStorage.getItem('loggedUsername')
            }
        }
        axios.get(`${BASE_URL}/keywords`, params)
            .then(response => {
                dispatchKeywords(response.data);
                setKeywordsFetched(true);
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
        fetchQuestions();
        fetchAnswers();
        fetchKeywords();
    }, []);

    // Get current posts
    const indexOfLastQuestion = currentQuestionPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const paginateQuestionsHandler = pageNumber => setCurrentQuestionPage(pageNumber);

    const indexOfLastAnswer = currentAnswerPage * answersPerPage;
    const indexOfFirstAnswer = indexOfLastAnswer - answersPerPage;
    const currentAnswers = answers.slice(indexOfFirstAnswer, indexOfLastAnswer);
    const paginateAnswersHandler = pageNumber => setCurrentAnswerPage(pageNumber);

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

    const deleteAnswerHandler = (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/x-www-form-urlencoded'

            }
        }
        axios.delete(`${BASE_URL}/answers/${id}`, config)
            .then(response => {
                console.log(response.data);
                dispatchAnswers(answers.filter(a => a.id !== id))
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
            <h2 className='main-title-margin'>My AskMeAnything</h2>
            <br></br>
            <Tabs defaultActiveKey="myquestions" id="uncontrolled-tab-example">
                <Tab classname="tab" eventKey="myquestions" title="My Questions">
                    <div>
                        <nav>
                            <div className='main-questions'>
                                {isFetched && <QuestionList gotoPageHandler={gotoPageHandler} fetch={fetchQuestions} deleteHandler={deleteQuestionHandler} items={currentQuestions} />}
                                {!isFetched && <Loader></Loader>}
                                <Pagination
                                    postsPerPage={questionsPerPage}
                                    totalPosts={questions.length}
                                    paginate={paginateQuestionsHandler}
                                />
                            </div>
                        </nav>
                    </div>
                </Tab>
                <Tab eventKey="myanswers" title="My Answers">
                    <div>
                        <nav>
                            <div className='main-answers'>
                                {isFetched && <AnswerList gotoPageHandler={gotoPageHandler} fetch={fetchAnswers} deleteHandler={deleteAnswerHandler} items={currentAnswers} />}
                                {!answerIsFetched && <Loader></Loader>}
                                <Pagination
                                    postsPerPage={answersPerPage}
                                    totalPosts={answers.length}
                                    paginate={paginateAnswersHandler}
                                />
                            </div>
                        </nav>
                    </div>
                </Tab>
                <Tab eventKey="keywords" title="Questions/Keyword">
                    <div className='keyword-chart'>
                        <QuestionsPerKeyword keywords={keywords}></QuestionsPerKeyword>
                    </div>
                    <div className='keyword-table'>
                        <QuestionsPerKeywordTable keywords={keywords} fetch={fetchQuestions}></QuestionsPerKeywordTable>
                    </div>
                </Tab>
                <Tab eventKey="contributions" title="My Contributions">
                </Tab>
            </Tabs>
        </div>
    )
}
export default Dashboard