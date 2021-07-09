import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionList from './questionlist/QuestionList';
import './MainPage.css';
import axios from 'axios';
import Loader from '../../components/hoc/loader/Loader';
import Pagination from '../../components/pagination/Pagination'
import SideBar from '../../components/sidebar/SideBar'
import config from '../../config/config.js'

const qa_url = config.Services.QAService;
const ms = config.MS;

const MainPage = () => {

    const [questions, dispatchQuestions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(6);
    const history = useHistory();


    const fetchdata = (tag, matchingkeywords, titlePart, startDate, endDate) => {

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }
        if (tag)
            config.params = {
                matchingKeywords: [tag]
            }

        else
            config.params = {
                ...(matchingkeywords && { matchingKeywords: Array.from(matchingkeywords) }),
                titlePart: titlePart,
                ...(endDate && { endDate: new Date(endDate) }),
                ...(startDate && { startDate: new Date(startDate) })
            }
        
        axios.get(ms.DISPLAY_QUESTIONS + `${qa_url}/questions/filtered`, config)
            .then(response => {
                dispatchQuestions(response.data);
                setIsFetched(true);
            })
            .catch(error => {
                // dispatchQuestions([])
                console.log(error);
            });
    }
    const fetchKeywords = () => {

        const params = {
            headers: {
                'content-type': 'application/json'
            }
        }
        
        axios.get(ms.DISPLAY_KEYWORDS + `${qa_url}/keywords/filtered`, params)
            .then(response => {
                setKeywords(response.data);
            })
            .catch(error => {
                // setKeywords([])
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
        fetchKeywords();
    }, []);

    // Tabs should to be added here:
    //     * The default one will be our home page (all questions)
    //     * Questions per day / month tab
    //     * Questions per keyword tab

    // Get current posts
    const indexOfLastQuestion = currentPage * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
    const paginateHandler = pageNumber => setCurrentPage(pageNumber);


    //////////////////////////////////////  Side Bar ////////////////////////////////////////////

    const [matchingkeywords, setMatchingKeywords] = useState(new Set());
    const [titlePart, setTitlePart] = useState("");
    const [keywords, setKeywords] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

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

    return (
        <div>
            <div>
                <h2 className='main-title-margin'>Recent Questions and Answers </h2>
                <div classname="main-wrapper">
                    <nav>
                        <div className='main-questions'>
                            {isFetched && <QuestionList gotoPageHandler={gotoPageHandler} fetch={fetchdata} items={currentQuestions} />}
                            {!isFetched && <Loader></Loader>}
                            <Pagination
                                postsPerPage={questionsPerPage}
                                totalPosts={questions.length}
                                paginate={paginateHandler}
                            />
                        </div>

                    </nav>
                    <SideBar matchingkeywords={matchingkeywords} keywords={keywords} toggleCheckbox={toggleCheckbox}
                        clearKeywordsHandler={clearKeywordsHandler} titlePart={titlePart} titleChangeHandler={titleChangeHandler}
                        startDateChangeHandler={startDateChangeHandler} startDate={startDate} endDateChangeHandler={endDateChangeHandler}
                        endDate={endDate} clearDateHandler={clearDateHandler} fetchdata={fetchdata}
                    />
                </div>


            </div>

            
        </div>
    );
};


export default MainPage;

