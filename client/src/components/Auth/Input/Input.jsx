import React from "react"
import "./Input.css"

function Input(props) {
  return (
    <input
      className='input'
      onChange={(event) => {
        props.setValue(event.target.value)
      }}
      value={props.value}
      type={props.type}
      placeholder={props.placeholder}
    />
  )
}

export default Input
