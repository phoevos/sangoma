import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionList from './questionlist/QuestionList';
import './MainPage.css';
import axios from 'axios';
import Loader from '../../components/hoc/loader/Loader';
import Pagination from '../../components/pagination/Pagination'
import { Modal } from '../../components/hoc/modal/Modal';
import SideBar from '../../components/sidebar/SideBar'
const BASE_URL = 'http://localhost:3000';

const MainPage = () => {

    const [showModal, setShowModal] = useState(false);
    const [questions, dispatchQuestions] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [questionsPerPage] = useState(6);
    const history = useHistory();
    const openModal = () => {
        setShowModal(prev => !prev);
      };

    const fetchdata = (tag,matchingkeywords,titlePart,startDate,endDate) => {

        let params
        if(tag)

            params = {
                params: {
                matchingKeywords : [tag]
                }
            }
        
        else 
            params = {
                params: {
                    ...(matchingkeywords && {matchingKeywords : Array.from(matchingkeywords)}),
                    titlePart: titlePart,
                    ...(endDate && {endDate: new Date(endDate)}),
                    ...(startDate && {startDate : new Date(startDate)})
                }
            }
            
        axios.get(`${BASE_URL}/questions`, params)
            .then(response => {
                dispatchQuestions(response.data);
                setIsFetched(true);
            })
            .catch(error => {
                console.log(error);
            });
    }
    const fetchKeywords = () => {

        axios.get(`${BASE_URL}/keywords`)
            .then(response => {
                setKeywords(response.data);
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
        fetchKeywords();
    },[]);

    // Tabs should to be added here:
    //     * The default one will be our home page (all questions)
    //     * Questions per day / month tab
    //     * Questions per keyword tab

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
                    openModal()
                } else {
                    console.log(error.response.data);
                    // setErrorMessage(error.response.data.message); 
                }
            });
    }

    //////////////////////////////////////  Side Bar ////////////////////////////////////////////

    const [matchingkeywords, setMatchingKeywords] = useState(new Set());
    const [titlePart, setTitlePart] = useState("");
    const [keywords, setKeywords] = useState([]);
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
    const clearDateHandler = () =>{
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
    const clearKeywordsHandler = () =>{
        setMatchingKeywords(new Set());
    }

    let message = "You are trying to delete a question without authentication."
    return (
        <div>
        <div>
            <h2 className='main-title-margin'>Recent Questions and Answers </h2>
            <div classname = "main-wrapper">
            <nav>
                <div className='main-questions'>
                    {isFetched && <QuestionList gotoPageHandler={gotoPageHandler} fetch={fetchdata} deleteHandler={deleteQuestionHandler} items={currentQuestions} />}
                    {!isFetched && <Loader></Loader>}
                    <Pagination
                        postsPerPage={questionsPerPage}
                        totalPosts={questions.length}
                        paginate={paginateHandler}
                    />
                </div>
            
            </nav>
            <SideBar matchingkeywords={matchingkeywords}  keywords={keywords} toggleCheckbox={toggleCheckbox} 
                clearKeywordsHandler ={clearKeywordsHandler} titlePart={titlePart} titleChangeHandler={titleChangeHandler} 
                startDateChangeHandler={startDateChangeHandler} startDate={startDate}  endDateChangeHandler={endDateChangeHandler} 
                endDate={endDate} clearDateHandler={clearDateHandler} fetchdata = {fetchdata}
            />
            </div>


        </div>
        
        <Modal showModal={showModal} setShowModal={setShowModal} message ={message} history={history}/>        
        </div>
    );
};


export default MainPage;

