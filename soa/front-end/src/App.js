import React from 'react';
import { Route,Switch } from "react-router-dom";
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import Layout from './components//hoc/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Switch>
			<Route path="/signin/" component={SignInPage} />
			<Route path="/signup/" component={SignUpPage} />
			<Route path="/" component={Layout} />
		</Switch>

	);
}

export default App;
