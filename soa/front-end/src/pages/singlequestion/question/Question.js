import React from 'react';
import './Question.css'
import DateComponent from '../../../components/date/DateComponent'
import 'font-awesome/css/font-awesome.min.css';
import { Button } from '@material-ui/core';

const Question = (props) => {



    return (

            <div className='single-container'>
                <div className="single-question-wrap1">
                    <DateComponent dateTime={props.question.dateTime} />
                    <div className='single-question-item__description'>
                        <div>{props.question.title}</div>
                    </div>
                    <div className='single-question-item-username'>
                    Question Submitted <br></br> by user {" "}
                    <text className='single-question-item-username-link' onClick={() => { }}>
                        {props.question.username.split('@')[0]}
                    </text>
                </div>
                </div>

                <p className="single-question-text"> {props.question.text}</p>
                {/* <button className='sin-ques-reply-but'>
                    <div>
                        Answer {"  "}
                        <div className='fa fa-reply' />
                    </div>
                </button> */}
                <Button
                    style={{ marginBottom: '0px' }}
                    variant="contained"
                    color="primary"
                    onClick={props.addAnswerHandler}
                    size="small"
                    endIcon={<div className='fa fa-reply' />}
                >
                        Answer {"  "}
                </Button>
            </div>

    );
}
export default Question;



