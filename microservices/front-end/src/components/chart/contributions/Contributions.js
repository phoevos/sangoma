import React from 'react';
import { Bar } from 'react-chartjs-2';
import '../../../pages/dashboard/Dashboard.css'
import '../../../pages/mainpage/MainPage.css'
import './Contributions.css'

// Years with available contributions could be fetched from the DB (i.e. if we had any contributions to show at least.)
const years = [ 2021, 2020, 2019 ]
// Month names are only used for mapping
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const Contributions = props => {
    
    const yearState = {
        labels: props.annualContributions.map(i => months[i.month - 1]),
        datasets: [
            {
                label: props.year + ': Questions per Month',
                backgroundColor: 'darkred',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 5,
                data: props.annualContributions.map(i => i.questions)
            },
            {
                label: props.year + ': Answers per Month',
                backgroundColor: 'darkslateblue',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 5,
                data: props.annualContributions.map(i => i.answers)
            }
        ]
    }
    const monthState = {
        labels: props.monthlyContributions.map(i => i.day),
        datasets: [
            {
                label: months[props.month -1] + ': Questions per Day',
                backgroundColor: 'darkred',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 5,
                data: props.monthlyContributions.map(i => i.questions)
            },
            {
                label: months[props.month -1] + ': Answers per Day',
                backgroundColor: 'darkslateblue',
                hoverBackgroundColor: 'rgba(67, 62, 82, 0.897)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                borderRadius: 5,
                data: props.monthlyContributions.map(i => i.answers)
            }
        ]
    }
    return (
        <div className='contributions'>
            <div className='keyword-chart'>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => props.toggleList()} >{props.year}</button>
                        <div className="dropdown-content">
                            {years.map((i) => (
                                <div key={i} onClick={()=>props.changeYearHandler(i)}>{i}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <Bar
                    data={yearState}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: props.year + ': Monthly Contributions',
                                fontSize: 20
                            },
                            legend: {
                                display: true,
                                position: 'top'
                            }
                        }
                }}/>
            </div>

            <div className='keyword-table'>
                <div>
                    <div className="dropdown">
                        <button className="dropbtn" onClick={() => props.toggleList()} >{months[props.month - 1]}</button>
                        <div className="dropdown-content">
                            {props.annualContributions.map((i) => (
                                <div key={i.month} onClick={()=>props.changeMonthHandler(i.month)}>{months[i.month - 1]}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <Bar
                    data={monthState}
                    options={{
                        plugins: {
                            title:{
                                display: true,
                                text: months[props.month - 1] + ': Daily Contributions',
                                fontSize: 20
                            },
                            legend:{
                                display: true,
                                position: 'top'
                            }
                        }
                    }}/>
            </div>
        </div>
    )
}
export default Contributions