import React, { Fragment } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import MainPage from './pages/mainpage/MainPage';

function App() {
    return (
      <Fragment>
        <Route exact path="/" component={MainPage} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
      </Fragment>

    );
}

export default App;
