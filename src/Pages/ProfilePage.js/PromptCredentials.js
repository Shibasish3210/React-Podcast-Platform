import React from 'react'
import Input from '../../Components/Input'
import Button from '../../Components/Button'

const PromptCredentials = ({email, setEmail, password, setPassword, setIsModalOpen, setIsEditingEmail, actionType, exeFunc}) => {

  const handleModalClosing = () => {
    setIsModalOpen(false);
    setIsEditingEmail(false);
  }


  return (
    <div className='modal-cont'>
      <div className='modal'>
       <Input setState={setEmail} state={email} type="text" placeholder="Enter Your Email"/>
            <Input setState={setPassword} state={password} type="password" placeholder="Enter Your Password"/>
            <Button value={actionType} exeFunc={exeFunc}/>
            <Button value='Close This Window' exeFunc={handleModalClosing}/>
       </div>
    </div>
  )
}

export default PromptCredentials
