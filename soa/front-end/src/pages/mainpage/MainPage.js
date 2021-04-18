import React, { useEffect, useState } from 'react';
import classes from './MainPage.module.css';
import { NavLink } from 'react-router-dom';
import { Fragment } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useHistory } from "react-router-dom";
// import Button from 'react-bootstrap/Button';
// import Navbar from 'react-bootstrap/Navbar';
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Nav from 'react-bootstrap/Nav';


const MainPage = () => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const MainPageAccessToken = localStorage.getItem('accessToken');

    if (MainPageAccessToken) {
      setIsLoggedIn(true);
    }
  }, []);


  const history = useHistory();

  const LogHandler = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.removeItem('accessToken');
    }
    else return history.push('/signin');

  }
  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.logo}>AskMeAnything</div>
        <nav className={classes.nav}>

            <Button
              style={{ marginBottom: '-8px' }}
              fullWidth
              variant="contained"
              color="primary"
              onClick={LogHandler}
            >
            { !isLoggedIn && <div > SIGN IN/SIGN UP</div>}
            { isLoggedIn && <div > SIGN OUT</div>}
            </Button>

      </nav >
      </header >

      <header className={classes.header2}>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink to='/' activeClassName={classes.active}>
              about
              </NavLink>
            </li>
            <li>
              <NavLink to='/' activeClassName={classes.active}>
              contact us
              </NavLink>
            </li>

            <li className={classes.active}>
              <NavLink to='/' activeClassName={classes.active}>
              project documentation
            </NavLink>
            </li>

            <li className={classes.active}>
              <NavLink to='/' activeClassName={classes.active}>
              link on github
            </NavLink>
            </li >

          </ul >
        </nav >
      </header >
    </Fragment >

  );
};


export default MainPage;
