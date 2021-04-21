import React from 'react';

import QuestionItem from './QuestionItem';
import './QuestionList.css';

const QuestionList = (props) => {
	if (props.items.length === 0) {
		return <h2 className='question-list__fallback'>Found no questions.</h2>;
	}

	return (
		<ul className='question-list'>
			{props.items.map((question) => (
				<QuestionItem gotoPageHandler={props.gotoPageHandler}
					key={question.id}
					id={question.id}
					title={question.title}
					username={question.username}
					dateTime={question.dateTime}
				/>
			))}
		</ul>
	);
};

export default QuestionList;
