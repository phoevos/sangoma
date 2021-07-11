import React from 'react';
import '../../tags/TagsInput.scss'

const QuestionsPerKeywordTable = props => {
    return (
        <div>
            <h3 style={{'textAlign': 'center'}}>Keywords</h3>
            <ul id="tags">
                    {props.keywords.map(i => (
                        <li key={i.keyword} className="tag" onClick={() => props.fetch(i.keyword)}>
                            <span className='tag-title'>{i.keyword}</span>
                            <span className='tag-close-icon'>{i.freq}</span>
                        </li>
                    ))}
                </ul>
        </div>
    )
}
export default QuestionsPerKeywordTable