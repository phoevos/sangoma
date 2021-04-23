import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, Col, NavDropdown} from 'react-bootstrap';
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
                <Navbar bg="dark" variant="dark" size="lg" >
                    <Navbar.Brand href="/">AskMeAnything</Navbar.Brand>
                    <Nav className="mr-auto" style={{marginBottom: '-4px'}}>
                        {isLoggedIn &&
                            <Nav.Link href='/newquestion'>
                                Add a question
                            </Nav.Link>}
                    </Nav>
                    <Form inline>
                        <Form.Row>
                            {/* <Nav.Link href='/myprofile' className="">
                                {localStorage.getItem('loggedUsername').split('@')[0]}
                            </Nav.Link>  */}
                            {isLoggedIn && <NavDropdown title={localStorage.getItem('loggedUsername').split('@')[0]} id="nav-dropdown">
                                <NavDropdown.Item eventKey="4.1">Shaka</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.2">Dingane</NavDropdown.Item>
                                <NavDropdown.Item eventKey="4.3">Mhlangana</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item eventKey="4.4" href="https://www.youtube.com/watch?v=11eis4XVfVE">Enter the cult...</NavDropdown.Item>
                            </NavDropdown>}
                            <Col>
                                <Button
                                    style={{ marginBottom: '0px' }}
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={LogHandler}
                                >
                                    {!isLoggedIn && <div > SIGN IN/SIGN UP</div>}
                                    {isLoggedIn && <div > SIGN OUT</div>}
                                </Button>
                            </Col>
                        </Form.Row>
                    </Form>
                </Navbar>
            </div>
            <div>
                <Route exact path="/newquestion" component={NewQuestion} />
                <Route path="/questions/" component={SingleQuestion} />
                <Route exact path="/"   component={MainPage}/>
            </div>
            <div className="fixed-bottom">
                <Navbar bg="dark" variant="dark" size="lg" >
                    <Nav className="mr-auto">
                        <Nav.Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">about</Nav.Link>
                        <Nav.Link href="mailto:elephntclt@gmail.com">contact us</Nav.Link>
                        <Nav.Link href="https://github.com/phoevos/sangoma/blob/main/askmeanything2021.vpp">documentation</Nav.Link>
                        <Nav.Link href="https://github.com/phoevos/sangoma">github</Nav.Link>

                    </Nav>
                </Navbar>
            </div>

        </Fragment>
    );
};


export default Layout;