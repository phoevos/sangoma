import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form} from 'react-bootstrap';
import { Button } from '@material-ui/core';
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

        if (MainPageAccessToken) {
            setIsLoggedIn(true);
        }
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
        <Fragment>
            <div>
                <Navbar bg="primary" variant="dark" size="lg" >
                    <Navbar.Brand href="/">AskMeAnything</Navbar.Brand>
                    <Nav className="mr-auto">
                        {isLoggedIn &&

                            <Nav.Link href='/newquestion' >
                                Add a question
                </Nav.Link>}
                    </Nav>
                    <Form inline>
                        <Button
                            style={{ marginBottom: '-10px' }}
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={LogHandler}
                        >
                            {!isLoggedIn && <div > SIGN IN/SIGN UP</div>}
                            {isLoggedIn && <div > SIGN OUT</div>}
                        </Button>
                    </Form>
                </Navbar>
            </div>
            <h2 className='main-title-margin'>Recent Questions and Answers </h2>
            <nav>
                <div className='main-questions'>
                    <QuestionList gotoPageHandler={gotoPageHandler} items={questions} />
                </div>
            </nav>
            <div className="fixed-bottom">
                <Navbar bg="primary" variant="dark" size="lg" >
                    <Nav className="mr-auto">
                        <Nav.Link href="/">about</Nav.Link>
                        <Nav.Link href="/">contact us</Nav.Link>
                        <Nav.Link href="/">project documentation</Nav.Link>
                        <Nav.Link href="/">link on github</Nav.Link>

                    </Nav>
                </Navbar>
            </div>

        </Fragment>
    );
};


export default MainPage;

