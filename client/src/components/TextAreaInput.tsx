import React, { ChangeEventHandler } from 'react'
interface Props {
    name: string, 
    id: string, 
    label: string, 
    value: string, 
    onChange: ChangeEventHandler<HTMLTextAreaElement>, 
    required: boolean,
    onBlur?: any,
    maxLength?: number,
    error?: boolean,
    message?: string
  }
  
function TextAreaInput(props: Props) {
    return (
        <div>
    <textarea 
        className='input-text' 
        name="content" 
        id="content" 
        placeholder='Enter post content'
        required={props.required}
        value={props.value} 
        onChange={props.onChange}
        maxLength={props.maxLength}
        onBlur={props.onBlur}
         />
        <label className='input-error'>{props.error ? props.message : ""}</label>
        </div>
      
    )
}

export default TextAreaInput