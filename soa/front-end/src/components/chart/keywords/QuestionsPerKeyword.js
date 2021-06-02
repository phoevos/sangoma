import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const QuestionsPerKeyword = (props) => {
    let coloR = []

    let dynamicColors = function() {
        let r = Math.floor(Math.random() * 150)
        let g = Math.floor(Math.random() * 150)
        let b = Math.floor(Math.random() * 175)
        return "rgb(" + r + "," + g + "," + b + ")"
    }

    props.keywords.forEach(i => {
        coloR.push(dynamicColors())
    })

    const data = {
        labels: props.keywords.map(i => i.keyword),//.slice(0, 10),
        datasets: [
            {
                label: 'Questions Per Keyword',
                data: props.keywords.map(i => i.freq),//.slice(0, 10),
                backgroundColor: coloR,
                borderWidth: 1,
            }
        ]
    }

    const config = {
        options: {
          responsive: true,
          plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Questions Per Keyword'
                }
            },
            maintainAspectRatio: false
        },
    }
    return (
        <div>
            <Doughnut data={data} options={config.options}></Doughnut>
        </div>
    )
}
export default QuestionsPerKeyword