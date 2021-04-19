import React, { useEffect, useState, Fragment } from 'react';
import { Button } from '@material-ui/core';
import { useHistory, Link, NavLink } from "react-router-dom";
import classes from './MainPage.module.css';




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
      localStorage.removeItem('username');
    }
    else return history.push('/signin');

  }
  return (
    <Fragment className={classes.display}>

      <header className={classes.header}>
        <div className={classes.logo}>AskMeAnything</div>
        <nav className={classes.nav}>
          <ul>
            {isLoggedIn && <li className={classes.active}>
              <NavLink to='/newquestion' >
                Add a question
            </NavLink>
            </li >}
            <li>
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
            </li >

          </ul >
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
