import React from 'react'

const Input = ({required, placeholder, type, state, setState,disabled}) => {
  return (
    <input className={`customInput ${disabled ? 'specialInput' : ''}`} disabled={disabled} type={type} placeholder={placeholder} required={required} value={state} onChange={e=>setState(e.target.value)}/>
  )
}

export default Input
