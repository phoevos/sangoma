
// let params = {
//     params: {
//         username: localStorage.getItem('loggedUsername')
//     }
// }
// if (tag) params.params.matchingKeywords = [tag]

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
import Contributions from '../../components/chart/contributions/Contributions'
import SideBar from '../../components/sidebar/SideBar'
import config from '../../config/config.json'
import { Modal } from '../../components/hoc/modal/Modal';

const diag_url = config.Services.DiagramService;
const qa_url = config.Services.QAService;
const ESB_URL = config.ESB_URL;

const Dashboard = () => {
    const [questions, dispatchQuestions] = useState([]);
    const [answers, dispatchAnswers] = useState([]);
    const [keywords, dispatchKeywords] = useState([]);
    const [openList, toggleList] = useState(false);
    const [year, setYear] = useState((new Date()).getFullYear());
    const [annualContributions, setAnnualContributions] = useState([]);
    const [month, setMonth] = useState((new Date()).getMonth() + 1);
    // const [month, setMonth] = useState((new Date()).toLocaleString('default', { month: 'long' }));
    const [monthlyContributions, setMonthlyContributions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [answerIsFetched, setAnswerIsFetched] = useState(false);
    const [keywordsFetched, setKeywordsFetched] = useState(false);
    const [currentQuestionPage, setCurrentQuestionPage] = useState(1);
    const [currentAnswerPage, setCurrentAnswerPage] = useState(1);
    const [questionsPerPage] = useState(6);
    const [answersPerPage] = useState(6);
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(prev => !prev);
    };
    const fetchQuestions = (tag, matchingkeywords, titlePart, startDate, endDate) => {

        let body
        const config = {
            headers: {
                'url': `${qa_url}/questions/filtered`,
                'content-type': 'application/json'
            }
        }
        if (tag)
            body = {
                matchingKeywords: [tag],
                username: localStorage.getItem('loggedUsername')
            }

        else
            body = {
                username: localStorage.getItem('loggedUsername'),
                ...(matchingkeywords && { matchingKeywords: Array.from(matchingkeywords) }),
                titlePart: titlePart,
                ...(endDate && { endDate: new Date(endDate) }),
                ...(startDate && { startDate: new Date(startDate) })
            }



        axios.post(ESB_URL, body, config)
            .then(response => {
                dispatchQuestions(response.data);
                setIsFetched(true);
            })
            .catch(error => {
                // dispatchQuestions([])
                console.log(error);
            });
    }

    const fetchAnswers = () => {
        const params = {
            headers: {
                'url': `${qa_url}/answers/filtered`
            }
        }
        const body = {
            username: localStorage.getItem('loggedUsername')
        }
        axios.post(ESB_URL, body, params)
            .then(response => {
                dispatchAnswers(response.data);
                setAnswerIsFetched(true);
            })
            .catch(error => {
            });
    }

    const fetchKeywords = () => {
        const params = {
            headers: {
                'url': `${diag_url}/filtered_keywords`
            }
        }
        const body = {
            username: localStorage.getItem('loggedUsername')
        }
        axios.post(ESB_URL, body, params)
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
        changeYearHandler(year);
        changeMonthHandler(month);
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
                'Content-Type': 'application/json',
                'url': `${qa_url}/questions/${id}`
            }
        }
        axios.delete(ESB_URL, config)
            .then(response => {
                console.log(response.data);
                dispatchQuestions(questions.filter(q => q.id !== id))
            })
            .catch(error => {
                if (error.response.status === 401) {
                    // That's a temporary work-around, redirecting to signin should be done more gracefully.
                    openModal()
                } else {
                    console.log(error)
                }
            });
    }

    const deleteAnswerHandler = (id) => {
        const config = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json',
                'url': `${qa_url}/answers/${id}`
            }
        }
        axios.delete(ESB_URL, config)
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

    const toggleListHandler = () => {
        if (openList) {
            toggleList(true)
        } else {
            toggleList(false)
        }
    }

    const changeYearHandler = (i) => {
        const params = {
            headers: {
                'url': `${diag_url}/contributions/year`
            }
        }
        const body = {
            username: localStorage.getItem('loggedUsername'),
            month: i,
            year: year
        }
        axios.post(ESB_URL, body, params)
            .then(response => {
                setAnnualContributions(response.data)
                setYear(i)
                toggleList(false)
            })
            .catch(error => {
            });
    }

    const changeMonthHandler = (i) => {
        const params = {
            headers: {
                'url': `${diag_url}/contributions/month`
            }
        }

        const body = {
            username: localStorage.getItem('loggedUsername'),
            month: i,
            year: year
        }

        axios.post(ESB_URL, body, params)
            .then(response => {
                setMonthlyContributions(response.data)
                setMonth(i)
                toggleList(false)
            })
            .catch(error => {
            });
    }




    //////////////////////////////////////  Side Bar ////////////////////////////////////////////

    const [matchingkeywords, setMatchingKeywords] = useState(new Set());
    const [titlePart, setTitlePart] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    // console.log("This is all")
    // console.log(titlePart)
    // console.log(startDate)
    // console.log(endDate)
    // console.log(matchingkeywords)

    const titleChangeHandler = (event) => {
        setTitlePart(event.target.value);
    }
    const startDateChangeHandler = (event) => {
        setStartDate(event.target.value);
    }
    const endDateChangeHandler = (event) => {
        setEndDate(event.target.value);
    }
    const clearDateHandler = () => {
        setStartDate("");
        setEndDate("");
    }

    const toggleCheckbox = keyword => {
        let newshit = new Set(matchingkeywords);
        if (matchingkeywords.has(keyword)) {
            newshit.delete(keyword);
            setMatchingKeywords(newshit);
        } else {
            newshit.add(keyword);
            setMatchingKeywords(newshit);
        }
    }
    const clearKeywordsHandler = () => {
        setMatchingKeywords(new Set());
    }
    let message = "You are trying to delete a question without authorization."

    return (
        <div>
        <div>
            <h2 className='main-title-margin'>My AskMeAnything</h2>
            <br></br>
            <Tabs defaultActiveKey="myquestions" id="uncontrolled-tab-example">
                <Tab className="tab" eventKey="myquestions" title="My Questions">
                    <div style={{ "margin-top": "50px" }}>
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
                        <SideBar matchingkeywords={matchingkeywords} keywords={keywords} toggleCheckbox={toggleCheckbox}
                            clearKeywordsHandler={clearKeywordsHandler} titlePart={titlePart} titleChangeHandler={titleChangeHandler}
                            startDateChangeHandler={startDateChangeHandler} startDate={startDate} endDateChangeHandler={endDateChangeHandler}
                            endDate={endDate} clearDateHandler={clearDateHandler} fetchdata={fetchQuestions}
                        />
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
                    <Contributions
                        year={year} month={month}
                        annualContributions={annualContributions} monthlyContributions={monthlyContributions}
                        toggleList={toggleListHandler}
                        changeYearHandler={changeYearHandler} changeMonthHandler={changeMonthHandler} >
                    </Contributions>
                </Tab>
            </Tabs>
        </div>
        <Modal showModal={showModal} setShowModal={setShowModal} message={message} history={history} />
        </div>
    )
}
export default Dashboard