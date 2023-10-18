import React from 'react'

const Button = ({value, type, exeFunc}) => {
  return (
    <button className='btn' type={type} onClick={exeFunc}>{value}</button>
  )
}

export default Button
