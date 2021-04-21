import React, { Fragment } from 'react';
import { Route } from "react-router-dom";
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import MainPage from './pages/mainpage/MainPage';
import NewQuestion from './pages/newquestion/NewQuestion';
import SingleQuestion from './pages/singlequestion/SingleQuestionPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Fragment>
			<Route exact path="/" component={MainPage} />
			<Route exact path="/newquestion" component={NewQuestion} />
			<Route path="/signin/" component={SignInPage} />
			<Route path="/signup/" component={SignUpPage} />
			<Route path="/questions/" component={SingleQuestion} />
		</Fragment>

	);
}

export default App;
