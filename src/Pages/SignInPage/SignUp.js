import React, { useState } from 'react'
import Input from '../../Components/Input';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../ReduxToolkit/Slices/userSlice';
import CustomFileInput from '../../Components/CustomFileInput';
import { toast } from 'react-toastify';
import Loader from '../../Components/Loader';


const SignUp = ({setHaveAccount,setDp,loading}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState();
  const [cPassword, setCPassword] = useState('');
  

  const dispatch = useDispatch();

async function handleSignUp() {
    
  if(!name || !email || !profilePicture || !password || !cPassword ){
    toast.error('Please fill all the fields');
    return;
  }
    if(password !== cPassword){
      toast.error('Both Password & Confirm Password Should Match');
      return;
    }

    setDp(profilePicture);
    dispatch(setUsers({name, email, password}));
    setProfilePicture();
    setName('');
    setEmail('');
    setPassword('');
    setCPassword('');
}

  return (
    <>
            <Input setState={setName} state={name} type="text" placeholder='Enter Your Full Name...' />
            <Input setState={setEmail} state={email} type="text" placeholder="Enter Your Email Address..."/>
            <CustomFileInput id='profilePic' setState={setProfilePicture} accept={'image/*'} value="Select Your Profile Picture..."/>
            <Input setState={setPassword} state={password} type="password" placeholder="Enter Your Password..."/>
            <Input setState={setCPassword} state={cPassword} type="password" placeholder="Please Confirm Your Password..."/>
            <Button type="submit" disabled={loading} value={loading ? <Loader width={60} height={60}/> : 'Sign Up'} exeFunc={handleSignUp}/>
            <p>Already have an account? <Link onClick={()=>setHaveAccount(true)} href="/signin">Sign In</Link></p>
          </>
  )
}

export default SignUp;
