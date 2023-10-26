import React from 'react'

const Button = ({value, type, exeFunc, disabled}) => {
  return (
    <button disabled={disabled} className='btn' type={type} onClick={exeFunc}>{value}</button>
  )
}

export default Button
