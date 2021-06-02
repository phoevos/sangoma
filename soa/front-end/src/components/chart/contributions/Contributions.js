import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import '../../../pages/dashboard/Dashboard.css'
import '../../../pages/mainpage/MainPage.css'
import './Contributions.css'

const Contributions = props => {
    function* range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }
    const yearState = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: props.year + ': Average Rainfall per Month',
                backgroundColor: 'rgba(100, 62, 82, 0.897)',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56, 59, 72, 85, 62, 32, 15, 98, 43]
            }
        ]
    }
    const monthState = {
        labels: [...range(1, 32)],
        datasets: [
            {
                label: props.month + ': Average Rainfall per Day',
                backgroundColor: 'rgba(100, 62, 82, 0.897)',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [59, 80, 34, 46, 76, 81, 56, 65, 59, 70, 31, 52, 91, 56, 69, 59, 24, 25, 46, 53, 43, 57, 75, 59, 90, 21, 12, 71, 76, 69, 59,]
            }
        ]
    }
    return (
        <div className='contributions'>
            {/* <DropdownButton id="dropdown-variants-Secondary" title="Year">
                {props.questions.map(i => (
                    <Dropdown.Item onClick={props.yearHandler}>{i.year}</Dropdown.Item>
                ))}
            </DropdownButton> */}
            <div className='keyword-chart'>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => props.toggleList()} >{props.year}</button>
                        <div className="dropdown-content">
                            {props.questions.map((i) => (
                                <div key={i.year} onClick={()=>props.changeYearHandler(i.year)}>{i.year}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <Bar
                    data={yearState}
                    options={{
                        title:{
                            display: true,
                            text: props.year + ': Average Rainfall per Month',
                            fontSize: 20
                        },
                        legend:{
                            display: true,
                            position: 'right'
                        }
                }}/>
            </div>

            <div className='keyword-table'>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => props.toggleList()} >{props.month}</button>
                        <div className="dropdown-content">
                            {props.questions.map((i) => (
                                <div key={i.month} onClick={()=>props.changeMonthHandler(i.month)}>{i.month}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <Bar
                    data={monthState}
                    options={{
                        title:{
                            display: true,
                            text: props.month + ': Average Rainfall per Day',
                            fontSize: 20
                        },
                        legend:{
                            display: true,
                            position: 'right'
                        }
                    }}/>
            </div>
        </div>
    )
}
export default Contributions