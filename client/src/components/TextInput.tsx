import React, { ChangeEventHandler, useState } from 'react'

interface Props {
  type: string, 
  name: string, 
  id: string, 
  label: string, 
  value: string, 
  onChange: ChangeEventHandler<HTMLInputElement>, 
  required: boolean,
  onBlur?: any,
  error?: boolean,
  message?: string
}



function TextInput(props : Props) {

  
  return (
    <div>
      <input
        className='input-text'
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.label}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        onBlur={props.onBlur}
        />
      <label className='input-error'>{props.error ? props.message : ""}</label>
    </div>


  )
}

export default TextInput