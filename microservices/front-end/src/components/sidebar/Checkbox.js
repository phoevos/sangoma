import React from 'react';

const Checkbox = (props) => {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                checked={props.matchingkeywords.has(props.keyword)}
                style = {{"cursor": "pointer"}}
                onChange={() => props.handleCheckbox(props.keyword)}
            />
        </div>
    );
}
export default Checkbox;

