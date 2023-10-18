import React, { useState } from 'react'
import Navbar from '../../Components/Navbar'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { auth, db } from '../../Config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUsers } from '../../ReduxToolkit/Slices/userSlice';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';

const Auth = () => {
  const [haveAccout, setHaveAccount] = useState(false);
  const userDetails = useSelector(state=> state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(userDetails && !haveAccout && userDetails.email && userDetails.password){
        const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
        await updateProfile(auth.currentUser, { displayName: userDetails.name }).catch(
          (err) => console.log(err)
        );
        const user = userCredential.user;
        dispatch(setUsers({
          name: userDetails.name,
          email: userDetails.email,
          id: user.uid
      }));
        toast.success('successfully signed up');
        await setDoc(doc(db, 'users', user.uid),{
            name: userDetails.name,
            email: userDetails.email,
            uid: user.uid
        })
        navigate('/profile');
      }
    }catch(error){
      // const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage)
    }
}

  return (
    <>
        <Navbar/>
        <div className="form-wrapper">
        <h1>{haveAccout ? 'Log In' : 'Sign Up'}</h1>
        <form className='form' action="/" onSubmit={handleSubmit}>
          {haveAccout ? <SignIn setHaveAccount={setHaveAccount}/> : <SignUp setHaveAccount={setHaveAccount}/>}
        </form>
        </div>
    </>
    


  );
}

export default Auth;
