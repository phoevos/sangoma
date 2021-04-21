import React from 'react';

import './QuestionDate.css';

const QuestionDate = (props) => {

	function convert_datetime(date_ob) {

		// current hours
		let hours = ("0" + date_ob.getHours()).slice(-2);
		// current minutes
		let minutes = ("0" + date_ob.getMinutes()).slice(-2);
		// current seconds
		let seconds = ("0" + date_ob.getSeconds()).slice(-2);
		return hours + ":" + minutes + ":" + seconds;
	}
	const date = new Date(props.dateTime);
	const month = date.getMonth();
	const day = date.getDay();
	const year = date.getFullYear();
	const time = convert_datetime(date);

	return (
		<div className='question-date'>
			<div className='question-date__month'>{day}/{month}/{year}</div>
			<div className='question-date__day'> {time}</div>
		</div>
	);
};

export default QuestionDate;
