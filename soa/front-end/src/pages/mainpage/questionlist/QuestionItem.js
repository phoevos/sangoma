import React from 'react';

import QuestionDate from './QuestionDate';
import './QuestionItem.css';

const QuestionItem = (props) => {

	const hideString = (string) => {
		if (string.length > 60) {
			return `${string.substr(0, 60)}...`
		}
		return string
	}

	return (
		<li>
			<div className='question-item'>
				<QuestionDate dateTime={props.dateTime} />
				<div className='question-item__description'>
					<h1 onClick={() => { console.log(props.id); props.gotoPageHandler(props.id, true); }}>{hideString(props.title)}</h1>
				</div>
				<div className='question-item-username'>Question Submitted <br></br> by user <text className='question-item-username-link' onClick={() => props.gotoPageHandler(props.username, false)}>{props.username.split('@')[0]}</text></div>
				<div className='gg-pen'></div>
				<div className='gg-trash' onClick={() => props.deleteQuestionHandler(props.id)}></div>
			</div>
		</li>
	);
};

export default QuestionItem;
