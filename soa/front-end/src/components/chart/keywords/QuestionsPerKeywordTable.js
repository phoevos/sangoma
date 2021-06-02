import React from 'react';
import '../../tags/TagsInput.scss'
// import { Badge, Button } from 'react-bootstrap';

const QuestionsPerKeywordTable = props => {
    return (
        // <div>
        //     {props.keywords.map(i => <div className="keyword-table-badge">
        //                                 <Button variant="dark">{i.keyword}
        //                                     <br></br>
        //                                     <Badge variant="info">{i.freq}</Badge>
        //                                 </Button>
        //                             </div>)
        //     }
        // </div>
        <ul id="tags">
                {props.keywords.map(i => (
                    <li key={i.keyword} className="tag" onClick={() => props.fetch(i.keyword)}>
                        <span className='tag-title'>{i.keyword}</span>
                        <span className='tag-close-icon'>{i.freq}</span>
                    </li>
                ))}
            </ul>
    )
}
export default QuestionsPerKeywordTable