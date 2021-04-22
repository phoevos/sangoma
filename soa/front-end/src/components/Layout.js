import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form} from 'react-bootstrap';
import { Button } from '@material-ui/core';
import MainPage from '../pages/mainpage/MainPage';
import NewQuestion from '../pages/newquestion/NewQuestion';
import SingleQuestion from '../pages/singlequestion/SingleQuestionPage';
import { Route } from "react-router-dom";

const Layout = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const MainPageAccessToken = localStorage.getItem('accessToken');

        if (MainPageAccessToken) {
            setIsLoggedIn(true);
        }

    }, []);

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
			<Route exact path="/newquestion" component={NewQuestion} />
			<Route path="/questions/" component={SingleQuestion} />
            <Route exact path="/"   component={MainPage}/>
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


export default Layout;