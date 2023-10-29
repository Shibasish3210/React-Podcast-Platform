import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar'
import SignIn from './SignIn';
import SignUp from './SignUp';
import { auth, db, storage } from '../../Config/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setUsers } from '../../ReduxToolkit/Slices/userSlice';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';


const Auth = () => {
  const [haveAccout, setHaveAccount] = useState(false);
  const [dp, setDp] = useState();
  const [loading, setLoading] = useState(false);
  const userDetails = useSelector(state=> state.users.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    if(auth?.currentUser?.uid){
      toast.error('Please Log Out');
      navigate('/profile');
    }
  },[navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      if(userDetails && !haveAccout && userDetails.email && userDetails.password){
        const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
        const user = userCredential.user;
        
        // Create a reference to displayImage
        const displayImageRef = ref(storage, `users-dp/${auth.currentUser.uid}`);
        //uploading the display image
        await uploadBytes(displayImageRef, dp);
        
        //getting the display image downloadable link
        const downloadDP = await getDownloadURL(displayImageRef)
        
        await updateProfile(auth.currentUser, { displayName: userDetails.name, photoURL: downloadDP}).catch(
          (err) => console.log(err)
        );
        dispatch(setUsers({
          name: userDetails.name,
          email: userDetails.email,
          dp: downloadDP,
          id: user.uid
      }));
        toast.success('successfully signed up');
        await setDoc(doc(db, 'users', user.uid),{
            name: userDetails.name,
            email: userDetails.email,
            dp: downloadDP,
            uid: user.uid
        })
        navigate('/profile');
      }
    }catch(error){
      const errorMessage = error.message;
      toast.error(errorMessage)
    }
    setLoading(false);
}

  return (
    <>
        <Navbar/>
        <div className="form-wrapper">
        <h1>{haveAccout ? 'Log In' : 'Sign Up'}</h1>
        <form className='form' action="/" onSubmit={handleSubmit}>
          {haveAccout ? <SignIn setHaveAccount={setHaveAccount}/> : <SignUp loading={loading} setDp={setDp} setHaveAccount={setHaveAccount}/>}
        </form>
        </div>
    </>
    


  );
}

export default Auth;
