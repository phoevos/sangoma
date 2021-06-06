import React from 'react';

import './DateComponent.css';

const DateComponent = (props) => {

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
	const month = date.getMonth()+1;
	const day = date.getDate();
	const year = date.getFullYear();
	const time = convert_datetime(date);

	return (
		<div className='item-date'>
			<div className='item-date__month'>{day}/{month}/{year}</div>
			<div className='item-date__day'> {time}</div>
		</div>
	);
};

export default DateComponent;