import React, { useState } from 'react'

const CustomFileInput = ({id, value, accept, setState}) => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setState(e.target.files[0]);
    setSelected(e.target.files[0].name);
  }

  return (
    <>
        <label className={`customInput ${selected ? 'activeInput' : 'labelInput'}`} htmlFor={id}>{selected? `This ${selected} file has been selected` : value}</label>
        <input id={id} type="file" accept={accept} required 
        style={{display:'none'}} onChange={e=>handleChange(e)}/>
    </>
  )
}

export default CustomFileInput
