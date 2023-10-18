import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import Input from '../../Components/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Button';
import { setUsers } from '../../ReduxToolkit/Slices/userSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Config/firebase';
import { toast } from 'react-toastify';

const SignIn = ({setHaveAccount}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleLogIn() {
        try{
            //Log in user
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            console.log(user)
            console.log(userCredentials)
            dispatch(setUsers({name: user.displayName, email, password, id:user.uid}));
            toast.success("successfully logged in!");
            setEmail('');
            setPassword('');
            setTimeout(() => {
                navigate('/profile')
            }, 700);
        }catch(error){
            const errorMessage = error.message;
            toast.error(errorMessage)
        }
    }
  return (
    <>
          <Input setState={setEmail} state={email} type="text" placeholder="Enter Your Email"/>
          <Input setState={setPassword} state={password} type="password" placeholder="Enter Your Password"/>
          <Button type="submit" value='Log In' exeFunc={handleLogIn}/>
          <p>Don't have an account? <Link onClick={()=>setHaveAccount(false)} href="/signup">Sign Up</Link></p>
          </>
  )
}

export default SignIn;
