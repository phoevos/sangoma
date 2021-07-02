import React from 'react';

import DateComponent from '../../../components/date/DateComponent';
import './AnswerItem.css';

const AnswerItem = (props) => {
	return (
		<li>
			<div className='answer-item'>
				<DateComponent dateTime={props.dateTime} />
				<div className='answer-item__description'>
					{props.title}
				</div>
				{props.question &&
				<div className='answer-op'>
					<div className='gg-mail-reply'></div>
					<bdi onClick={() => props.gotoPageHandler(props.question.id, true)}>
						{props.question.title}
					</bdi>
				</div>}
				<div className='answer-item-username'>
					Answer Submitted
					<br></br>
					by user
					<bdi className='answer-item-username-link' onClick={() => props.gotoPageHandler(props.username)}>
						{' ' + props.username.split('@')[0]} {/* Η μεγαλύτερη παπάτζα έβερ. */}
					</bdi>
				</div>
			</div>
		</li>
	);
};

export default AnswerItem;
