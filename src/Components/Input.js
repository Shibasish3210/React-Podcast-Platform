import React from 'react'

const Input = ({required, placeholder, type, state, setState}) => {
  return (
    <input className='customInput' type={type} placeholder={placeholder} required={required} value={state} onChange={e=>setState(e.target.value)}/>
  )
}

export default Input
