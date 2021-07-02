import React from "react"
import "./TagsInput.scss"
import { TextField, FormControl } from '@material-ui/core';

const TagsInput = props => {
    return(
        <FormControl fullWidth>
            <TextField
                label="Tags"
                placeholder="Press enter to add tags"
                margin="normal"
                variant="outlined"
                onKeyUp={event => props.addTags(event)}
            />
            <ul id="tags">
                {props.tags.map((tag, index) => (
                    <li key={index} className="tag">
                        <span className='tag-title'>{tag}</span>
                        <span className='tag-close-icon' onClick={() => props.removeTags(index)}> x </span>
                    </li>
                ))}
            </ul>
        </FormControl>
    )
}
export default TagsInput