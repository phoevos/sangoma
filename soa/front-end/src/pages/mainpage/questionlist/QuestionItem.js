import React from 'react';

import DateComponent from '../../../components/date/DateComponent';
import './QuestionItem.css';
// import '../../../components/tags/TagsInput.scss'

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
				<DateComponent dateTime={props.dateTime} />
				<div className='question-item__description'>
					<div onClick={() => { console.log(props.id); props.gotoPageHandler(props.id, true); }}>{hideString(props.title)}</div>
				</div>
				<ul className='tags'>
					{props.tags.map((tag, index) => (
						<li key={index} className='tag'>
							<span className='tag-title' onClick={() => props.fetch(tag.keyword)}>{tag.keyword}</span>
						</li>
					))}
				</ul>
				<div className='question-item-username'>Question Submitted <br></br> by user <text className='question-item-username-link' onClick={() => props.gotoPageHandler(props.username, false)}>{props.username.split('@')[0]}</text></div>
				<div className='gg-pen'></div>
				<div className='gg-trash' onClick={() => props.deleteQuestionHandler(props.id)}></div>
			</div>
		</li>
	);
};

export default QuestionItem;
