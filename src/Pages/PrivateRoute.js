import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../Config/firebase';
import Navbar from '../Components/Navbar';
import { setUsers } from '../ReduxToolkit/Slices/userSlice';
import { useDispatch } from 'react-redux';

const PrivateRoute = () => {
    const [user, loading, error] = useAuthState(auth);
    const dispatch = useDispatch();
    if(loading){
        console.log(loading);
        return(
            <>
            <Navbar></Navbar>
            <h1>Profile</h1>
            <h1 style={{marginTop: '5rem'}}>Loading...</h1>
            </>
            )
    }else if(error) {
        console.log(error)
        return <Navigate to='/' replace/>
    }else{
        dispatch(setUsers({name: user.displayName, email: user.email, id: user.uid}));
        return <Outlet/>
    }
  
}

export default PrivateRoute
