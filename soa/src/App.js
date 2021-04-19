import React, { Fragment } from 'react';
import { Route } from "react-router-dom";
import './App.css';
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import MainPage from './pages/mainpage/MainPage';
import NewQuestion from './pages/newquestion/NewQuestions2'
function App() {
    return (
      <Fragment>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/newquestion" component={NewQuestion} />
        <Route path="/signin/" component={SignInPage} />
        <Route path="/signup/" component={SignUpPage} />
      </Fragment>

    );
}

export default App;
