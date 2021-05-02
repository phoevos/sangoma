import React from 'react';

import AnswerItem from './AnswerItem';
import './AnswerList.css';

const AnswerList = (props) => {
	if (props.items.length === 0) {
		return <h2 className='answer-list__fallback'>Found no answers.</h2>;
	}

	return (
		<ul className='answer-list'>
			{props.items.map((answer) => (
				<AnswerItem gotoPageHandler={props.gotoPageHandler}
					key={answer.id}
					id={answer.id}
					title={answer.text}
					username={answer.username}
					dateTime={answer.dateTime}
				/>
			))}
		</ul>
	);
};

export default AnswerList;
