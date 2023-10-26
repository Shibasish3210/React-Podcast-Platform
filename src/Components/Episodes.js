import React from 'react'
import { FaPlayCircle } from "react-icons/fa";
import Button from './Button';

const Episodes = ({title, desc, audio, onExe}) => {
  return (
    <div className='episodes'>
      <div className="desc">
        <p>{title}</p>
        <p>{desc}</p>
      </div>
      <Button value={<FaPlayCircle/>} exeFunc={()=>onExe(audio)}/>
    </div>
  )
}

export default Episodes
