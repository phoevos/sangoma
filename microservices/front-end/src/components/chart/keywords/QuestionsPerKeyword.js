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

    // I have only filtered the keywords for the graph 
    // so that the user can see what the "Other" keywords are in the  keyword table.
    // If you want to hide for both , move the code to a higher order component (Contribution).
    let firstelements = 10 // display only the 5 most frequent keywords
    let sum = props.keywords.slice(-props.keywords.length+firstelements).reduce((total, currentValue) => {
        return total + Number(currentValue.freq);
    }, 0);
    let filtkeywords = props.keywords.slice(0, firstelements)
    filtkeywords.push({keyword: "Other", freq: sum})

    const data = {
        labels: filtkeywords.map(i => i.keyword),//.slice(0, 10),
        datasets: [
            {
                label: 'Questions Per Keyword',
                data: filtkeywords.map(i => i.freq),//.slice(0, 10),
                backgroundColor: coloR,
                borderWidth: 1,
            }
        ]
    }

    const config = {
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Questions Per Keyword'
                }
            },
            maintainAspectRatio: false,
            aspectRatio: 1
        },
    }
    return (
        <div>
            <Doughnut data={data} options={config.options}></Doughnut>
        </div>
    )
}
export default QuestionsPerKeyword